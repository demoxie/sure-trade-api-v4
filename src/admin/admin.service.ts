import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GiftCardTransaction } from "../models/gift-card-transaction.model";
import { Op } from "sequelize";
import { User } from "../models/user.model";
import { BecomeMerchantRequests } from "../models/become-a-merchant-request.model";
import { MessageSenderService } from "../message-sender/message-sender.service";
import * as bcrypt from "bcrypt";
import { JwtPayload, SignupDTO } from "../dto";
import {
  BecomeAMerchantRequestStatus,
  Role,
  StakedAssetStatus,
} from "../enums/enum";
import { StakedAsset } from "../models/staked-asset.model";
import { UserService } from "../user/service/user.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Tier } from "../models/tier.model";

@Injectable()
export class AdminService {
  constructor(
    private readonly emailSender: MessageSenderService,
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  getAllTransactions = async (
    pageNumber: number,
    limit: number,
    sortBy: string,
    sortDirection: string,
  ) => {
    const allAreEmpty = !pageNumber && !limit && !sortBy && !sortDirection;
    if (allAreEmpty) {
      return await GiftCardTransaction.findAll({
        include: { all: true },
        raw: true,
      })
        .then((res) => {
          console.table(res);
          return res;
        })
        .catch((err) => {
          throw new HttpException(
            err.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });
    }

    const offset = (pageNumber - 1) * limit;
    return await GiftCardTransaction.findAll({
      include: { all: true },
      limit: limit,
      offset: offset,
      order: [[sortBy, sortDirection]],
    })
      .then((res) => res)
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  };

  getTransactionsByParams = async (params) => {
    const transactions = await GiftCardTransaction.findAll({
      where: [Op.or, params],
    })
      .then((transactions) => transactions)
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      });
    if (transactions.length === 0) {
      throw new HttpException("Transaction not found", HttpStatus.NOT_FOUND);
    }
    return transactions;
  };

  getTransactionById = async (id: number) => {
    const transaction = await GiftCardTransaction.findOne({
      where: {
        id: id,
      },
    });
    if (!transaction) {
      throw new HttpException("Transaction not found", HttpStatus.NOT_FOUND);
    }
    return transaction;
  };

  getAllAdmins = async () =>
    await User.findAll({
      where: {
        [Op.or]: [
          {
            role: "ADMIN",
          },
          {
            role: "SUPER_ADMIN",
          },
        ],
      },
    });

  getAdminById = async (id: number) => {
    const admin = await User.findOne({
      where: {
        id: id,
        [Op.or]: [
          {
            role: "ADMIN",
          },
          {
            role: "SUPER_ADMIN",
          },
        ],
      },
    });
    if (!admin) {
      throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
    }
    return admin;
  };

  createAdmin = async (admin: SignupDTO) => {
    const existingAdmin = await User.findOne({
      where: {
        email: admin.email,
      },
    });
    if (existingAdmin) {
      throw new HttpException("Admin already exists", HttpStatus.CONFLICT);
    }
    admin.password = bcrypt.hashSync(admin.password, 10);
    await User.create(admin);
  };

  updateAdminById = async (id, admin: SignupDTO) => {
    await User.update(admin, {
      where: {
        id: id,
        [Op.or]: [
          {
            role: "ADMIN",
          },
          {
            role: "SUPER_ADMIN",
          },
        ],
      },
    });

    return await User.findByPk(id);
  };
  assignRole = async (id: number, role: Role) => {
    const updatedAdmin = await User.update(
      {
        role: role,
      },
      {
        where: {
          id: id,
        },
      },
    );
    if (!updatedAdmin) {
      throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
    }
    return updatedAdmin;
  };

  suspendUser = async (id: number) => {
    const updatedUser = await User.update(
      {
        isSuspended: true,
        isVerified: false,
        token: null,
      },
      {
        where: {
          id: id,
        },
      },
    );
    if (!updatedUser) {
      throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
    }
    return updatedUser;
  };

  deleteAdminById = async (id: number) => {
    const deletedAdmin = await User.destroy({
      where: {
        id: id,
        [Op.or]: [
          {
            role: "ADMIN",
          },
          {
            role: "SUPER_ADMIN",
          },
        ],
      },
    });
    if (!deletedAdmin) {
      throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
    }
    return deletedAdmin;
  };

  login = async (email: string, password: string) => {
    const admin = await User.findOne({
      where: {
        email: email,
        [Op.or]: [
          {
            role: "ADMIN",
          },
          {
            role: "SUPER_ADMIN",
          },
        ],
      },
    });
    if (!admin) {
      throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
    }
    if (!bcrypt.compareSync(password, admin.password)) {
      throw new HttpException(
        "Password did not match mismatch",
        HttpStatus.BAD_REQUEST,
      );
    }
    admin.token = await this.jwt.signAsync(
      {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
      {
        expiresIn: "24h",
        secret: this.configService.get("JWT_SECRET"),
      },
    );
    return await admin.save();
  };

  logout = async (token: string) => {
    const admin = await User.findOne({
      where: {
        token: token,
        [Op.or]: [
          {
            role: "ADMIN",
          },
          {
            role: "SUPER_ADMIN",
          },
        ],
      },
    });
    if (!admin) {
      throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
    }
    await this.jwt.verifyAsync(token, {
      secret: this.configService.get("JWT_SECRET"),
    });
    admin.token = null;
    return await admin.save();
  };

  logoutAll = async () => {
    const admins = await User.findAll({
      where: {
        [Op.or]: [
          {
            role: "ADMIN",
          },
          {
            role: "SUPER_ADMIN",
          },
        ],
      },
    });
    for (const admin of admins) {
      admin.token = null;
      await admin.save();
    }
  };

  forgotPassword = async (email: string) => {
    const admin = await User.findOne({
      where: {
        email: email,
        [Op.or]: [
          {
            role: "ADMIN",
          },
          {
            role: "SUPER_ADMIN",
          },
        ],
      },
    });
    if (!admin) {
      throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
    }
    admin.token = await this.jwt.signAsync(
      {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
      {
        expiresIn: "24h",
        secret: this.configService.get("JWT_SECRET"),
      },
    );
    // await this.emailSender.sendEmail(to, subject, html, html);
    await admin.save();
    return "Reset link sent successfully";
  };

  // resetPassword = async (
  //   token: string,
  //   passwordResetRequest: PasswordResetDTO,
  // ) => {
  //   const admin = await User.findOne({
  //     where: {
  //       token: token,
  //       [Op.or]: [
  //         {
  //           role: "ADMIN",
  //         },
  //         {
  //           role: "SUPER_ADMIN",
  //         },
  //       ],
  //     },
  //   });
  //   if (!admin) {
  //     throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
  //   }
  //   await this.jwt.verify(token, {
  //     secret: this.configService.get("JWT_SECRET"),
  //   });
  //   if (
  //     passwordResetRequest.newPassword !== passwordResetRequest.confirmPassword
  //   ) {
  //     throw new HttpException(
  //       "Password did not match mismatch",
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   admin.password = bcrypt.hashSync(passwordResetRequest.newPassword, 10);
  //   admin.token = null;
  //   const to = admin.email;
  //   const subject = "Password Reset";
  //   await admin.save();
  //
  //   await this.emailSender.sendPasswordResetEmail(to, subject, html);
  //   return "Password reset successfully";
  // };

  // changePassword = async (
  //   id: number,
  //   passwordChangeRequest: PasswordResetDTO,
  // ) => {
  //   const admin = await User.findOne({
  //     where: {
  //       id: id,
  //       [Op.or]: [
  //         {
  //           role: "ADMIN",
  //         },
  //         {
  //           role: "SUPER_ADMIN",
  //         },
  //       ],
  //     },
  //   });
  //   if (!admin) {
  //     throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
  //   }
  //   if (
  //     !bcrypt.compareSync(passwordChangeRequest.oldPassword, admin.password)
  //   ) {
  //     throw new HttpException(
  //       "Old password did not match",
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   if (
  //     passwordChangeRequest.newPassword !==
  //     passwordChangeRequest.confirmPassword
  //   ) {
  //     throw new HttpException(
  //       "Password did not match mismatch",
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   admin.password = bcrypt.hashSync(passwordChangeRequest.newPassword, 10);
  //   return await admin.save();
  // };

  getAllMerchants = async () =>
    await User.findAll({
      where: {
        role: "MERCHANT",
      },
    });

  getAllActiveMerchants = async () =>
    await User.findAll({
      where: {
        role: "MERCHANT",
        isActive: true,
      },
    });

  // getLoggedInUser = async (token: string) => {
  //   const admin = await User.findOne({
  //     where: {
  //       token: token,
  //       [Op.or]: [
  //         {
  //           role: "ADMIN",
  //         },
  //         {
  //           role: "SUPER_ADMIN",
  //         },
  //       ],
  //     },
  //   });
  //   if (!admin) {
  //     throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
  //   }
  //   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  //     if (err) {
  //       throw new HttpException(
  //         "Password did not match mismatch",
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //   });
  //   return admin;
  // };
  //
  // getAllUsers = async () => {
  //   return await User.findAll({
  //     where: {
  //       role: "USER",
  //       isSuspended: false,
  //     },
  //   });
  // };
  //
  // getRequestToBecomeMerchant = async () =>
  //   await BecomeMerchantRequests.findAll();
  //
  // getRequestToBecomeMerchantById = async (id: number) => {
  //   const existingRequest = await BecomeMerchantRequests.findOne({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   if (!existingRequest) {
  //     throw new RequestNotFound("Request not found");
  //   }
  //   return existingRequest;
  // };

  async approveRequestToBecomeMerchant(id: number, jwtUser: JwtPayload) {
    const request = await BecomeMerchantRequests.findOne({
      where: {
        id: id,
        status: BecomeAMerchantRequestStatus.PROCESSING,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    if (!request) {
      throw new HttpException("Request not found", HttpStatus.NOT_FOUND);
    }
    request.status = BecomeAMerchantRequestStatus.APPROVED;

    const existingUser = await User.findOne({
      where: {
        id: request.userId,
        role: Role.USER,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    let userId = null;

    if (existingUser) {
      userId = existingUser.id;
      existingUser.role = Role.MERCHANT;
    } else {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    let merchantTierId = null;
    const tier: Tier = await this.getTierByAmount(request.amount);
    if (tier) {
      merchantTierId = tier.id;
    }

    const existingStakeAsset = await StakedAsset.findOne({
      where: {
        userId: userId,
        status: StakedAssetStatus.NEW,
        currency: request.currency,
        transactionHashId: request.transactionHashId,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    existingUser.tierId = tier.id;

    if (existingStakeAsset) {
      await existingUser
        .save()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          throw new HttpException(
            err.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });
      await request
        .save()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          throw new HttpException(
            err.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });
    }

    const newStakeAsset = new StakedAsset({
      userId: userId,
      tierId: merchantTierId,
      adminId: jwtUser.id,
      transactionHashId: request.transactionHashId,
      userWalletAddress: request.userWalletAddress,
      adminWalletAddress: await this.userService.getAdminAddressToPay(),
      currency: request.currency,
      amount: request.amount,
      balance: request.amount,
      status: StakedAssetStatus.NEW,
      previousBalance: request.amount,
    });

    await existingUser
      .save()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    await request
      .save()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    await this.emailSender.sendApprovedBecomeMerchantRequestMessage(
      existingUser,
    );
    return await newStakeAsset
      .save()
      .then((res) => {
        return res.toJSON();
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  // async getRequestToBecomeMerchantByParams(
  //   userWalletAddress: string,
  //   email: string,
  //   userId: number,
  // ) {
  //   const searchParams = {};
  //   if (userWalletAddress) {
  //     searchParams.userWalletAddress = userWalletAddress;
  //   }
  //   if (email) {
  //     searchParams.email = email;
  //   }
  //   if (userId) {
  //     searchParams.userId = userId;
  //   }
  //   const existingRequest = await BecomeMerchantRequests.findOne({
  //     where: {
  //       ...searchParams,
  //     },
  //   });
  //   if (!existingRequest) {
  //     throw new RequestNotFound("Request not found");
  //   }
  //   return existingRequest;
  // }

  // async updateUserByUserId(userId: number, body) {
  //   const existingUser = await User.findByPk(userId);
  //   if (!existingUser) {
  //     throw new UserNotFoundException("User not found");
  //   }
  //   return await User.update(
  //     {
  //       ...body,
  //     },
  //     {
  //       where: {
  //         id: userId,
  //       },
  //     },
  //   );
  // }

  // async verifyByOtp(otp: string) {
  //   const existingOtp = await this.otpRepository.findOne({
  //     where: {
  //       otp: otp,
  //     },
  //   });
  //   if (!existingOtp) {
  //     throw new OtpExpiredException("Otp not found");
  //   }
  //   if (existingOtp.isVerified) {
  //     throw new OtpExpiredException("Otp already verified");
  //   }
  //   const OTP = await REDIS_CLIENT.get(existingOtp.email, (err, data) => {
  //     if (err) {
  //       throw new OtpExpiredException("Otp expired");
  //     }
  //     if (data !== otp) {
  //       throw new OtpExpiredException("Otp expired");
  //     }
  //   });
  //
  //   await REDIS_CLIENT.del(existingOtp.email);
  //   existingOtp.otp = null;
  //   existingOtp.isVerified = true;
  //   await existingOtp.save();
  //   return existingOtp;
  // }

  async getUserByUserId(userId: number) {
    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return existingUser.toJSON();
  }

  getTierByAmount = async (amount: number): Promise<Tier> => {
    const tiers = await Tier.findAll().catch((err) => {
      console.log("Error occurred...", err.message);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    for (const tier of tiers) {
      const range = tier.stakedAmountRange.split(" - ");
      const minAmount = parseFloat(range[0].replace("$", "").trim());
      const maxAmount = parseFloat(range[1].replace("$", "").trim());

      if (amount >= minAmount && amount <= maxAmount) {
        return tier;
      }
    }
    return null;
  };

  formatRangeToMinAndMax = (range) => {
    if (range && range.includes("-")) {
      const stakedAmountRange = range.split("-");
      const minRawForm = stakedAmountRange[0];
      const minStringAmount = minRawForm
        .replace("$", "")
        .replace(" ", "")
        .trim();
      const minAmount = parseFloat(minStringAmount);
      const maxRawForm = stakedAmountRange[1];
      const maxStringAmount = maxRawForm
        .replace("$", "")
        .replace(" ", "")
        .trim();
      const maxAmount = parseFloat(maxStringAmount);
      return {
        minAmount,
        maxAmount,
      };
    }
  };

  // deleteUserById = async (id: number) => {
  //   const deletedUser = await User.destroy({
  //     where: {
  //       id: id,
  //       role: "USER",
  //     },
  //   });
  //   if (!deletedUser) {
  //     throw new UserNotFoundException("User not found");
  //   }
  //   return deletedUser;
  // };

  suspendAdminById = async (id: number) => {
    const updatedAdmin = await User.update(
      {
        isSuspended: true,
        isVerified: false,
        token: null,
      },
      {
        where: {
          id: id,
          [Op.or]: [
            {
              role: "ADMIN",
            },
            {
              role: "SUPER_ADMIN",
            },
          ],
        },
      },
    );
    if (!updatedAdmin) {
      throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
    }
    return updatedAdmin;
  };

  // suspendAdmin = async (id: number) => {
  //   const updatedAdmin = await User.update(
  //     {
  //       isSuspended: true,
  //       isVerified: false,
  //       token: null,
  //     },
  //     {
  //       where: {
  //         id: id,
  //         role: "ADMIN",
  //       },
  //     },
  //   );
  //   if (!updatedAdmin) {
  //     throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
  //   }
  //   return updatedAdmin;
  // };
  //
  // liftUserSuspension = async (id: number) => {
  //   const updatedUser = await User.update(
  //     {
  //       isSuspended: false,
  //       isVerified: true,
  //     },
  //     {
  //       where: {
  //         id: id,
  //         role: "USER",
  //       },
  //     },
  //   );
  //   if (!updatedUser) {
  //     throw new UserNotFoundException("User not found");
  //   }
  //   return updatedUser;
  // };
  //
  // liftAdminSuspension = async (id: number) => {
  //   const updatedAdmin = await User.update(
  //     {
  //       isSuspended: false,
  //       isVerified: true,
  //     },
  //     {
  //       where: {
  //         id: id,
  //         [Op.or]: [
  //           {
  //             role: "ADMIN",
  //           },
  //           {
  //             role: "SUPER_ADMIN",
  //           },
  //         ],
  //       },
  //     },
  //   );
  //   if (!updatedAdmin) {
  //     throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
  //   }
  //   return updatedAdmin;
  // };
  //
  // verifyPayments = async (payload) => {
  //   const w3Instance = new Web3(
  //     new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_URL),
  //   );
  //   const tx = await w3Instance.eth.getTransaction(
  //     payload.transactionHashId,
  //     (err, res) => {
  //       if (err) {
  //         console.log("ERR", err.message);
  //         return Promise.reject(new InvalidTransactionException(err.message));
  //       }
  //       return res;
  //     },
  //   );
  //   console.log("TX", tx);
  //   return tx;
  // };
}
