import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import {
  JwtPayload,
  LoginDto,
  OtpVerificationResponse,
  PasswordResetDTO,
  RequestIdentityDTO,
  SignupDTO,
  SignUpPayload,
  TransactionPinDTO,
  UserResponse,
  VerifyOtpDTO,
} from "../../api/dto";
import { User } from "../../api/models/user.model";
import * as bcrypt from "bcrypt";
import { Tier } from "../../api/models/tier.model";
import { Role } from "../../enums/enum";
import { RabbitmqProducer } from "../../config/rabbitmq/service/rabbitmq-producer";
import { InjectRedis } from "@nestjs-modules/ioredis";
import Redis from "ioredis";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../../api/service/user.service";
import { MessageSenderService } from "../../message-sender/message-sender.service";
import { UtilService } from "../../util/util.service";
import { ModelMapper } from "../../util/modelmapper/modelmapper.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly rabbitmq: RabbitmqProducer,
    @InjectRedis() private readonly redis: Redis,
    private readonly configService: ConfigService,
    private readonly utilService: UtilService,
    private readonly messageSender: MessageSenderService,
    private readonly userService: UserService,
    @Inject("USER_REPOSITORY") private userRepository: typeof User,
  ) {}

  public login = async (dto: LoginDto) => {
    const existingUser: User = await User.findOne({
      where: {
        email: dto.email,
      },
    }).catch((err) => {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    });
    if (!existingUser) {
      throw new UnauthorizedException("User doesn't exist");
    }

    if (!existingUser.isVerified) {
      const otp = this.utilService.generateOtp().toString();
      existingUser.otp = otp;
      await existingUser.save();
      await this.redis.set(otp, existingUser.email, "EX", 900000);
      await this.messageSender.sendAccountVerificationMessage(
        otp,
        existingUser,
      );
      throw new UnauthorizedException("User is not verified");
    }

    if (existingUser.isSuspended) {
      throw new UnauthorizedException("User is suspended");
    }

    // if (
    //   existingUser.role === Role.ADMIN ||
    //   existingUser.role == Role.SUPER_ADMIN
    // ) {
    //   throw new UnauthorizedException("Only users or merchants can login here");
    // }
    const passwordIsValid: boolean = bcrypt.compareSync(
      dto.password,
      existingUser.password,
    );
    if (!passwordIsValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload: JwtPayload = {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };

    const token = await this.utilService.generateToken(payload);
    existingUser.isActive = true;
    existingUser.token = token;
    await this.messageSender.sendLoginNoticeMessage(
      dto.requestIdentity,
      existingUser,
    );

    return await existingUser
      .save()
      .then((res) => res.toJSON())
      .catch((err) => {
        console.log(err);
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      });
  };

  public createUser = async (user: SignupDTO) => {
    const existingUser = await this.userRepository
      .findOne({
        where: {
          email: user.email,
        },
      })
      .then((res) => {
        console.log("Success ", res);
        return res;
      })
      .catch((err) => {
        console.log("Error occurred at:::", err);
      });
    if (existingUser) {
      throw new HttpException("User already exists", 409);
    }
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const otp = this.utilService.generateOtp().toString();
    console.info("OTP: " + otp);
    await this.redis
      .set(otp, user.email, "EX", 900000, (res, s) => {
        console.log("Res ", res);
        console.log("Is ok ", s);
      })
      .catch((err) => {
        console.log("Error occurred ", err);
      });

    const userTier = await Tier.findOne({ where: { id: 5 } })
      .then((tiers) => {
        return tiers;
      })
      .catch((error) => {
        throw new HttpException(error, 500);
      });

    const payload: SignUpPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: hashedPassword,
      phoneNumber: user.phoneNumber,
      role: Role.USER,
      tierId: userTier.id,
      otp: otp,
      isVerified: false,
      isActive: false,
      isSuspended: false,
      createdAt: new Date(),
    };

    const newUser: User = await this.userRepository
      .create<User>(payload)
      .then((user) => {
        return user.toJSON();
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    await this.messageSender.sendAccountVerificationMessage(otp, newUser);
    return newUser;
  };

  public verifyOtp = async (dto: VerifyOtpDTO) => {
    const otp = dto.otp;
    const userEmail = await this.redis.get(otp);
    console.log("User email: " + userEmail);
    if (userEmail) {
      const user: User = await this.userService.getUserByEmail(userEmail);
      if (user) {
        if (user.otp === otp) {
          user.isVerified = true;
          user.otp = "";
          const mapper = new ModelMapper<User, SignupDTO>();
          const userToUpdate = mapper.map(user);
          const updatedUser = await this.userService.updateUser(
            user.id,
            userToUpdate,
          );
          if (updatedUser) {
            const token = await this.utilService.generateToken({
              email: updatedUser.email,
              role: updatedUser.role,
              id: updatedUser.id,
            });
            await this.redis.set(token, user.email);
            await this.redis.del(otp);
            user.otp = null;
            await user.save();
            const otpVerificationResponse: OtpVerificationResponse = {
              token: token,
            };
            return otpVerificationResponse;
          }
        } else {
          throw new UnauthorizedException("Invalid otp");
        }
      } else {
        throw new UnauthorizedException("User not found");
      }
    } else {
      throw new UnauthorizedException("Invalid otp");
    }
  };

  resetPassword = async (otp: string, body: PasswordResetDTO) => {
    const savedOtp = await this.redis.get(otp);
    if (!savedOtp) {
      throw new HttpException("OTP Expired or Invalid", HttpStatus.BAD_REQUEST);
    }
    const existingUser = await this.userService.getUserByEmail(savedOtp);
    if (!existingUser) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    const isValid = body.password === body.confirmPassword;
    if (!isValid) {
      throw new HttpException(
        "Passwords does not match",
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.redis.del(otp);
    existingUser.otp = "";
    existingUser.password = bcrypt.hashSync(body.password, 10);
    const mapper = new ModelMapper<User, UserResponse>();
    return mapper.map((await existingUser.save()).toJSON());
  };

  async setupTransactionPin(
    body: TransactionPinDTO,
    jwtUser: JwtPayload,
    requestIdentity: RequestIdentityDTO,
  ) {
    const existingUser = await this.userRepository.findByPk(jwtUser.id);
    if (!existingUser) {
      throw new HttpException("Account doesn't exist", HttpStatus.NOT_FOUND);
    }

    if (body.transactionPin !== body.confirmTransactionPin) {
      throw new HttpException(
        "Transaction pins do not match ",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    existingUser.transactionPin = bcrypt.hashSync(body.transactionPin, 10);
    await this.messageSender.sendTransactionPinSetupMessage(
      body.transactionPin,
      existingUser,
      requestIdentity,
    );
    const mapper = new ModelMapper<User, UserResponse>();
    return mapper.map((await existingUser.save()).toJSON());
  }

  confirmTransactionPin = async (pin: string, jwtUser: JwtPayload) => {
    const existingUser = await this.userRepository.findByPk(jwtUser.id);
    if (!existingUser) {
      throw new HttpException("Account doesn't exist", HttpStatus.NOT_FOUND);
    }

    const isValid = bcrypt.compareSync(pin, existingUser.transactionPin);
    if (!isValid) {
      throw new HttpException(
        "Incorrect transaction pin",
        HttpStatus.BAD_REQUEST,
      );
    }
    const mapper = new ModelMapper<User, UserResponse>();
    return mapper.map((await existingUser.save()).toJSON());
  };
}
