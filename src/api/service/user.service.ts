import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { User } from "../models/user.model";
import { RabbitmqProducer } from "../../config/rabbitmq/service/rabbitmq-producer";
import Redis from "ioredis";
import { InjectRedis } from "@nestjs-modules/ioredis";
import { ConfigService } from "@nestjs/config";
import { UtilService } from "../../util/util.service";
import { ModelMapper } from "../../util/modelmapper/modelmapper.service";
import {
  BecomeMerchantRequestDTO,
  JwtPayload,
  ProfilePictureUpdateDTO,
  RegisterTelegramDTO,
  RequestIdentityDTO,
  UpdateDTO,
  UserResponse,
} from "../dto";
import { DatabaseError, Op } from "sequelize";
import { MessageSenderService } from "../../message-sender/message-sender.service";
import { GiftCardRate } from "../models/gift-card-rate.model";
import { BecomeAMerchantRequestStatus, Role } from "../../enums/enum";
import { BecomeMerchantRequests } from "../models/become-a-merchant-request.model";

@Injectable()
export class UserService {
  constructor(
    private readonly rabbitmq: RabbitmqProducer,
    @InjectRedis() private readonly redis: Redis,
    private readonly configService: ConfigService,
    private readonly utilService: UtilService,
    @Inject("USER_REPOSITORY") private userRepository: typeof User,
    @Inject("BECOME_MERCHANT_REQUEST_REPOSITORY")
    private becomeMerchantRequest: typeof BecomeMerchantRequests,
    private readonly messageSender: MessageSenderService,
  ) {}

  public getUserByEmail = async (userEmail: string) => {
    return await User.findOne({
      where: {
        email: userEmail,
      },
      include: { all: true },
    })
      .then((res) => res)
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      });
  };

  async updateUser(id: number, user: UpdateDTO) {
    return await this.userRepository
      .update(user, {
        where: {
          id: id,
        },
      })
      .then(async () => {
        return await this.userRepository
          .findByPk(id)
          .then((res) => {
            const mapper = new ModelMapper<User, UserResponse>();
            return mapper.map(res.toJSON());
          })
          .catch((err) => {
            throw new HttpException(
              err.message,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          });
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public getLoggedInUserProfile = async (email: string) => {
    return await this.getUserByEmail(email);
  };

  public getAllUsers = async () => {
    return await this.userRepository
      .findAll({ include: { all: true } })
      .then((res) => {
        const mapper = new ModelMapper<User, UserResponse>();
        if (res.length > 0) {
          return res.map((u) => {
            const dest = mapper.map(u.toJSON());
            console.table(dest);
            return dest;
          });
        }
        return res;
      });
  };

  public getUserById = async (id: number) => {
    return await this.userRepository
      .findByPk(id, { include: { all: true } })
      .then((res) => {
        const mapper = new ModelMapper<User, UserResponse>();
        return mapper.map(res.toJSON());
      })
      .catch((err) => {
        throw new DatabaseError(err.message);
      });
  };

  forgotPassword = async (
    email: string,
    requestIdentity: RequestIdentityDTO,
  ) => {
    const existingUser = await this.getUserByEmail(email);
    if (!existingUser) {
      throw new HttpException("Account doesn't exist", HttpStatus.NOT_FOUND);
    }
    const otp = this.utilService.generateOtp().toString();
    existingUser.otp = otp;
    await this.redis.set(otp, email, "EX", 900000);
    await existingUser.save();
    await this.messageSender.sendForgotPasswordMessage(
      otp,
      existingUser.toJSON(),
      requestIdentity,
    );
    const mapper = new ModelMapper<User, UserResponse>();
    return mapper.map(existingUser.toJSON());
  };

  getMerchants = async () =>
    await this.userRepository
      .findAll({ include: { all: true } })
      .then((merchants) => {
        if (merchants.length > 0) {
          merchants.map((merchant) => {
            const mapper = new ModelMapper<User, UserResponse>();
            return mapper.map(merchant.toJSON());
          });
        }
        return merchants;
      })
      .catch((err) => {
        throw new HttpException(
          "Database error has occurred " + err.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

  getMerchantsByRate = async (
    cardName: string,
    currency: string,
    transactionType: string,
    giftCardCurrency: string,
  ) =>
    await this.userRepository
      .findAll({
        include: [
          {
            model: GiftCardRate,
            where: {
              [Op.or]: [
                {
                  cardName: cardName,
                  currency: currency,
                  transactionType: transactionType,
                  giftCardCurrency: giftCardCurrency,
                },
              ],
            },
          },
        ],
        where: {
          role: Role.MERCHANT,
        },
      })
      .then((merchants) => {
        if (merchants.length > 0) {
          merchants.map((merchant) => {
            const mapper = new ModelMapper<User, UserResponse>();
            return mapper.map(merchant.toJSON());
          });
        }
        return merchants;
      })
      .catch((err) => {
        throw new HttpException(
          "Database error has occurred " + err.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

  getActiveMerchants = async () =>
    await this.userRepository
      .findAll({
        where: {
          isActive: true,
        },
        include: { all: true },
      })
      .then((merchants) => {
        if (merchants.length > 0) {
          merchants.map((merchant) => {
            const mapper = new ModelMapper<User, UserResponse>();
            return mapper.map(merchant.toJSON());
          });
        }
        return merchants;
      })
      .catch((err) => {
        throw new HttpException(
          "Database error has occurred " + err.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

  deleteUser = async (id: number) => {
    await this.userRepository.destroy({
      where: {
        id: id,
      },
    });
    return "Account deleted successfully";
  };

  logout = async (jwtUser: JwtPayload) => {
    const existingUser = await this.userRepository.findByPk(jwtUser.id);
    if (await this.redis.get(existingUser.token))
      await this.redis.del(existingUser.token);
    existingUser.token = null;
    await existingUser.save();
    return "Logout successful";
  };

  async uploadProfileImage(jwtUser: JwtPayload, body: ProfilePictureUpdateDTO) {
    const existingUser = await this.userRepository.findByPk(jwtUser.id);
    existingUser.profilePicture = body.profileImage;
    const mapper = new ModelMapper<User, UserResponse>();
    return mapper.map((await existingUser.save()).toJSON());
  }

  async requestToBecomeMerchant(
    jwtUser: JwtPayload,
    body: BecomeMerchantRequestDTO,
  ) {
    const user = await User.findByPk(jwtUser.id).catch((err) => {
      throw new HttpException(
        "Database error has occurred " + err.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
    let searchParams = {};
    if (body.email) {
      searchParams = { ...searchParams, email: body.email };
    }
    if (body.userWalletAddress) {
      searchParams = {
        ...searchParams,
        userWalletAddress: body.userWalletAddress,
      };
    }
    if (body.phoneNumber) {
      searchParams = { ...searchParams, phoneNumber: body.phoneNumber };
    }
    if (body.transactionHashId) {
      searchParams = {
        ...searchParams,
        transactionHashId: body.transactionHashId,
      };
    }
    if (user && user.role === Role.USER) {
      searchParams = { ...searchParams, userId: user.id };
    }
    const existingRequest = await BecomeMerchantRequests.findOne({
      where: [Op.or, searchParams],
    }).catch((err) => {
      throw new HttpException(
        "Database error has occurred " + err.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
    if (existingRequest) {
      throw new HttpException("Request already exists", HttpStatus.CONFLICT);
    }
    body.status = BecomeAMerchantRequestStatus.PROCESSING;
    body.userId = user.id;

    const existingUser = await User.findByPk(user.id).catch((err) => {
      throw new HttpException(
        "Database error has occurred " + err.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
    const admin = await this.getActiveAdmin();

    if (existingUser.firstName) {
      body.firstName = existingUser.firstName;
    }
    if (existingUser.lastName) {
      body.lastName = existingUser.lastName;
    }
    if (existingUser.email) {
      body.email = existingUser.email;
    }

    if (existingUser.phoneNumber) {
      body.phoneNumber = existingUser.phoneNumber;
    }

    if (existingUser.username) {
      body.username = existingUser.username;
    }

    if (existingUser.country) {
      body.country = existingUser.country;
    }

    const request = await BecomeMerchantRequests.create(body)
      .then((res) => res.toJSON())
      .catch((err) => {
        throw new HttpException(
          "Database error has occurred " + err.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    await this.messageSender.sendBecomeMerchantRequestMessage(
      existingUser,
      request,
      admin,
    );
    return request;
  }

  public getActiveAdmin = async () => {
    return await User.findOne({
      where: {
        isActive: true,
        [Op.or]: [{ role: Role.ADMIN }, { role: Role.SUPER_ADMIN }],
      },
    })
      .then((admin) => admin.toJSON())
      .catch((err) => {
        throw new HttpException(
          "Database error has occurred " + err.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  };

  getAdminAddressToPay = async () => {
    const superAdmin = await this.userRepository.findOne({
      where: {
        role: Role.SUPER_ADMIN,
      },
    });
    return superAdmin ? superAdmin.walletAddress : "";
  };

  registerTelegram(body: RegisterTelegramDTO) {
    // const username = body.username;
    return "success";
  }
}
