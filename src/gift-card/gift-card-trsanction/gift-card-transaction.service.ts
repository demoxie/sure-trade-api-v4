import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { GiftCardRate } from "../../api/models/gift-card-rate.model";
import { GiftCardTransaction } from "../../api/models/gift-card-transaction.model";
import {
  AcceptRejectTransactionDTO,
  GiftCardTransactionDTO,
  JwtPayload,
  PageRequest,
} from "../../api/dto";
import { Role, TransactionStatus, TransactionType } from "../../enums/enum";
import { DatabaseError, Op } from "sequelize";
import { ConfigService } from "@nestjs/config";
import { UtilService } from "../../util/util.service";
import { User } from "../../api/models/user.model";
import { GiftCard } from "../../api/models/gift-card.model";
import { MessageSenderService } from "../../message-sender/message-sender.service";

@Injectable()
export class GiftCardTransactionService {
  constructor(
    @Inject("GIFT_CARD_RATE_REPOSITORY")
    private giftCardRate: typeof GiftCardRate,
    @Inject("GIFT_CARD_TRANSACTION_REPOSITORY")
    private giftCardTransaction: typeof GiftCardTransaction,
    @Inject("GIFT_CARD_REPOSITORY")
    private giftCard: typeof GiftCard,
    @Inject("USER_REPOSITORY")
    private userRepository: typeof User,
    private readonly configService: ConfigService,
    private readonly utilService: UtilService,
    private readonly messageSender: MessageSenderService,
  ) {}

  async getAllTransactions() {
    return await this.giftCardTransaction
      .findAll({ include: { all: true } })
      .then((transactions) =>
        transactions.map((transaction) => transaction.toJSON()),
      )
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  addTransaction = async (jwtUser: JwtPayload, dto: GiftCardTransactionDTO) => {
    const user: User = await this.userRepository
      .findByPk(jwtUser.id)
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    // if (dto.transactionType === TransactionType.BUY) {
    //   return await this.buyGiftCard(user, dto);
    // }

    return await this.sellGiftCard(user, dto);
  };

  sellGiftCard = async (user: User, transaction: GiftCardTransactionDTO) => {
    const giftCard = await this.giftCard.findByPk(transaction.giftCardId);
    if (!giftCard) {
      throw new HttpException(
        "Gift Card with ID:::" + transaction.giftCardId + " not found",
        HttpStatus.NOT_FOUND,
      );
    }
    let queryParams: {
      transactionType?: TransactionType;
      giftCardRateId?: number;
      giftCardId?: number;
      userId?: number;
      merchantId?: number;
    } = {};
    if (user.role === Role.MERCHANT) {
      transaction.merchantId = user.id;
      queryParams = {
        merchantId: user.id,
      };
    } else {
      console.log("IS USER ------------------------------------------>");
      queryParams = {
        userId: user.id,
      };
    }

    transaction.userId = user.id;
    queryParams.transactionType = transaction.transactionType;
    queryParams.giftCardRateId = transaction.giftCardRateId;
    queryParams.giftCardId = transaction.giftCardId;

    const existingTransaction = await GiftCardTransaction.findOne({
      where: {
        [Op.and]: queryParams,
      },
    })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    if (existingTransaction) {
      throw new HttpException(
        "Transaction already exists",
        HttpStatus.CONFLICT,
      );
    }

    transaction.status = TransactionStatus.NEW;
    transaction.referenceNo =
      await this.utilService.generateGiftCardTxReferenceNo();
    transaction.fee =
      this.configService.get("GIFT_CARD_TRANSACTION_FEES") * transaction.amount;
    transaction.createdAt = new Date();
    const newTransaction = new GiftCardTransaction(transaction);
    let trans = await newTransaction
      .save()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(new DatabaseError(err));
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    let savedTransaction = await this.giftCardTransaction
      .findByPk(trans.toJSON().id, { include: { all: true } })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    savedTransaction = savedTransaction.toJSON();
    trans = savedTransaction;
    await this.messageSender.sendGiftCardTransactionMessage(savedTransaction);
    return { transaction: trans };
  };

  // buyGiftCard = async (user, transaction) => {
  //   let isUser = true;
  //   if (user.role === "MERCHANT") {
  //     transaction.merchantId = user.id;
  //     isUser = false;
  //   } else {
  //     transaction.userId = user.id;
  //     isUser = false;
  //   }
  //
  //   transaction.status = "NEW";
  //   transaction.referenceNo =
  //     await this.codeGenerator.generateGiftCardTxReferenceNo(10);
  //   transaction.fee =
  //     process.env.GIFT_CARD_TRANSACTION_FEES * transaction.amount;
  //   transaction.createdAt = new Date();
  //   const newTransaction = new GiftCardTransaction(transaction);
  //   let trans = await newTransaction
  //     .save()
  //     .then((result) => {
  //       return result;
  //     })
  //     .catch((err) => {
  //       logger.error(new SqlValidationError(err));
  //       throw new SqlValidationError(err);
  //     });
  //   trans = trans.toJSON();
  //   const merchant = await this.userRepository.findByPk(transaction.merchantId);
  //
  //   await this.emailSender.sendBuyEmailToMerchant(merchant, newTransaction);
  //   const messageToMerchant = {
  //     title: "New Gift Card Transaction",
  //     body: `${user.username} wants to buy gift card, please login to check the transaction request`,
  //     data: {
  //       type: "GiftCardTransaction",
  //       transactionId: trans.id,
  //     },
  //   };
  //
  //   await this.notificationService.pushTransactionNotification(
  //     merchant.id,
  //     messageToMerchant,
  //   );
  //   TELEGRAM_TEMPLATE.chatId = merchant.telegramChatId;
  //   TELEGRAM_TEMPLATE.message = `\n\n\nHi ${merchant.username},\n${user.username} wants to buy gift card, please login to check the transaction request.\n\nPlease login to sure trade app app and check.`;
  //   await publish(
  //     QUEUES.telegram,
  //     ROUTING_KEYS.telegram,
  //     EXCHANGES.telegram,
  //     TELEGRAM_TEMPLATE,
  //   );
  //   await this.emailSender.sendFeedBackEmail(user);
  //   const feedbackMessage = {
  //     title: "New Gift Card Transaction",
  //     body: `Your gift card transaction request has been posted successfully`,
  //     data: {
  //       type: "GiftCardTransaction",
  //       transactionId: trans.id,
  //     },
  //   };
  //   console.log("Sending notification to user with ID:::", user.id);
  //   await this.notificationService.pushTransactionNotification(
  //     user.id,
  //     feedbackMessage,
  //   );
  //
  //   const transactionResponse = {
  //     ...trans,
  //     giftCardRate:
  //       trans.giftCardRateId &&
  //       (await this.giftCardRateRepository.findByPk(trans.giftCardRateId)),
  //     user: trans.userId && (await this.userRepository.findByPk(trans.userId)),
  //     BankDetails:
  //       trans.bankDetailsId &&
  //       (await this.bankDetailsRepository.findByPk(trans.bankDetailsId)),
  //     wallet:
  //       trans.walletAddressId &&
  //       (await this.walletRepository.findByPk(trans.walletAddressId)),
  //     payment:
  //       trans.paymentId &&
  //       (await this.paymentRepository.findByPk(trans.paymentId)),
  //   };
  //   const user1 = await this.userService.getUserById(trans.userId);
  //   return {
  //     transaction: transactionResponse,
  //     user: user1,
  //   };
  // };

  getTransactionById = async (id: number) => {
    const transaction = await GiftCardTransaction.findByPk(id, {
      include: { all: true },
    }).catch((err) => {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    if (!transaction) {
      throw new HttpException("Transaction not found", HttpStatus.NOT_FOUND);
    }
    return transaction.toJSON();
  };

  // getTransactionsByStatus = async (status: TransactionStatus, use r: JwtPayload, pageRequest) => {
  //   const offset = (pageRequest.page - 1) * pageRequest.limit;
  //   let transactions = [];
  //   const paginationInfo = {
  //     totalItems: 0,
  //     totalPages: 0,
  //     currentPage: pageRequest.page,
  //     pageSize: pageRequest.limit,
  //     isLastPage: true,
  //   };
  //     transactions = await GiftCardTransaction
  //       .findAll({
  //         where: {
  //           [Op.and]: [
  //             { status: status },
  //             { userId: user.id },
  //             { merchantId: user.id },
  //             {
  //               [Op.or]: [
  //                 { id: { [Op.ne]: null } }
  //               ]
  //             }
  //           ],
  //         },
  //         include: {all: true},
  //       })
  //       .then((result) => {
  //         const count = result.length;
  //         const totalPages = Math.ceil(count / pageRequest.limit);
  //         paginationInfo.isLastPage = pageRequest.page === totalPages;
  //         paginationInfo.totalItems = count;
  //         paginationInfo.totalPages = totalPages;
  //         return result;
  //       })
  //       .catch((err) => {
  //         throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //       });
  //     return transactions;
  //   }
  //
  //   if (!transactions || transactions.length === 0) {
  //     throw new TransactionNotFound("Transaction not found");
  //   }
  //   const response = [];
  //   for (let i = 0; i < transactions.length; i++) {
  //     const element = transactions[i];
  //     const transactionResponse = {
  //       ...element.toJSON(),
  //       giftCard:
  //         element.giftCardId &&
  //         (await this.giftCardRepository.findByPk(element.giftCardId)),
  //       giftCardRate:
  //         element.giftCardRateId &&
  //         (await this.giftCardRateRepository.findByPk(element.giftCardRateId)),
  //       user:
  //         element.userId &&
  //         (await this.userRepository.findByPk(element.userId)),
  //       merchant:
  //         element.merchantId &&
  //         (await this.userRepository.findByPk(element.merchantId)),
  //       BankDetails:
  //         element.bankDetailsId &&
  //         (await this.bankDetailsRepository.findByPk(element.bankDetailsId)),
  //       wallet:
  //         element.walletAddressId &&
  //         (await this.walletRepository.findByPk(element.walletAddressId)),
  //       payment:
  //         element.paymentId &&
  //         (await this.paymentRepository.findByPk(element.paymentId)),
  //     };
  //     response.push(transactionResponse);
  //   }
  //
  //   return {
  //     transactions: response.sort((a, b) => {
  //       return new Date(b.createdAt) - new Date(a.createdAt);
  //     }),
  //     pagination: paginationInfo,
  //   };
  // };
  //
  // getAllTransactions = async () => {
  //   const transactions = await this.giftCardTransactionModel.findAll();
  //   const sortedTransactionsByDate = transactions.sort((a, b) => {
  //     return new Date(b.createdAt) - new Date(a.createdAt);
  //   });
  //   return {
  //     ...sortedTransactionsByDate,
  //     giftCard:
  //       transactions.giftCardId &&
  //       (await this.giftCardRepository.findByPk(transactions.giftCardId)),
  //     giftCardRate:
  //       transactions.giftCardRateId &&
  //       (await this.giftCardRateRepository.findByPk(
  //         transactions.giftCardRateId,
  //       )),
  //     user:
  //       transactions.userId &&
  //       (await this.userRepository.findByPk(transactions.userId)),
  //     merchant:
  //       transactions.merchantId &&
  //       (await this.userRepository.findByPk(transactions.merchantId)),
  //     BankDetails:
  //       transactions.bankDetailsId &&
  //       (await this.bankDetailsRepository.findByPk(transactions.bankDetailsId)),
  //     wallet:
  //       transactions.walletAddressId &&
  //       (await this.walletRepository.findByPk(transactions.walletAddressId)),
  //     payment:
  //       transactions.paymentId &&
  //       (await this.paymentRepository.findByPk(transactions.paymentId)),
  //   };
  // };
  //
  // updateTransaction = async (id, payload) => {
  //   const existingTransaction =
  //     await this.giftCardTransactionModel.findByPk(id);
  //   if (!existingTransaction)
  //     throw new TransactionNotFound("Transaction not found");
  //   await this.giftCardTransactionModel.update(payload, {
  //     where: {
  //       id: id,
  //     },
  //   });
  //   const transaction = await this.giftCardTransactionModel.findByPk(id);
  //   return {
  //     ...transaction.toJSON(),
  //     giftCard:
  //       transaction.giftCardId &&
  //       (await this.giftCardRepository.findByPk(transaction.giftCardId)),
  //     giftCardRate:
  //       transaction.giftCardRateId &&
  //       (await this.giftCardRateRepository.findByPk(
  //         transaction.giftCardRateId,
  //       )),
  //     user:
  //       transaction.userId &&
  //       (await this.userRepository.findByPk(transaction.userId)),
  //     merchant:
  //       transaction.merchantId &&
  //       (await this.userRepository.findByPk(transaction.merchantId)),
  //     BankDetails:
  //       transaction.bankDetailsId &&
  //       (await this.bankDetailsRepository.findByPk(transaction.bankDetailsId)),
  //     wallet:
  //       transaction.walletAddressId &&
  //       (await this.walletRepository.findByPk(transaction.walletAddressId)),
  //     payment:
  //       transaction.paymentId &&
  //       (await this.paymentRepository.findByPk(transaction.paymentId)),
  //   };
  // };
  //
  // deleteTransaction = async (id) => {
  //   const existingTransaction =
  //     await this.giftCardTransactionModel.findByPk(id);
  //   if (!existingTransaction)
  //     throw new TransactionNotFound("Transaction not found");
  //   await this.giftCardTransactionModel.destroy({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   return {
  //     ...existingTransaction.toJSON(),
  //     giftCard:
  //       existingTransaction.giftCardId &&
  //       (await this.giftCardRepository.findByPk(
  //         existingTransaction.giftCardId,
  //       )),
  //     giftCardRate:
  //       existingTransaction.giftCardRateId &&
  //       (await this.giftCardRateRepository.findByPk(
  //         existingTransaction.giftCardRateId,
  //       )),
  //     user:
  //       existingTransaction.userId &&
  //       (await this.userRepository.findByPk(existingTransaction.userId)),
  //     merchant:
  //       existingTransaction.merchantId &&
  //       (await this.userRepository.findByPk(existingTransaction.merchantId)),
  //     BankDetails:
  //       existingTransaction.bankDetailsId &&
  //       (await this.bankDetailsRepository.findByPk(
  //         existingTransaction.bankDetailsId,
  //       )),
  //     wallet:
  //       existingTransaction.walletAddressId &&
  //       (await this.walletRepository.findByPk(
  //         existingTransaction.walletAddressId,
  //       )),
  //     payment:
  //       existingTransaction.paymentId &&
  //       (await this.paymentRepository.findByPk(existingTransaction.paymentId)),
  //   };
  // };
  //
  // getTransactionsByGiftCardId = async (id) => {
  //   const existingTransaction = await this.giftCardTransactionModel.findAll({
  //     where: {
  //       giftCardId: id,
  //     },
  //   });
  //   if (!existingTransaction) {
  //     throw new TransactionNotFound("Transaction not found");
  //   }
  //   return {
  //     ...existingTransaction,
  //     giftCard:
  //       existingTransaction.giftCardId &&
  //       (await this.giftCardRepository.findByPk(
  //         traexistingTransactionns.giftCardId,
  //       )),
  //     giftCardRate:
  //       existingTransaction.giftCardRateId &&
  //       (await this.giftCardRateRepository.findByPk(
  //         existingTransaction.giftCardRateId,
  //       )),
  //     user:
  //       existingTransaction.userId &&
  //       (await this.userRepository.findByPk(existingTransaction.userId)),
  //     merchant:
  //       existingTransaction.merchantId &&
  //       (await this.userRepository.findByPk(existingTransaction.merchantId)),
  //     BankDetails:
  //       existingTransaction.bankDetailsId &&
  //       (await this.bankDetailsRepository.findByPk(
  //         existingTransaction.bankDetailsId,
  //       )),
  //     wallet:
  //       existingTransaction.walletAddressId &&
  //       (await this.walletRepository.findByPk(
  //         existingTransaction.walletAddressId,
  //       )),
  //     payment:
  //       existingTransaction.paymentId &&
  //       (await this.paymentRepository.findByPk(existingTransaction.paymentId)),
  //   };
  // };
  //

  // getTransactionsByUserIdAndStatus = async (id, status) => {
  //   const existingTransaction = await this.giftCardTransactionModel.findAll({
  //     where: {
  //       userId: id,
  //       status: status,
  //     },
  //   });
  //   if (!existingTransaction || existingTransaction.length === 0) {
  //     throw new TransactionNotFound("Transaction not found");
  //   }
  //   const response = [];
  //   for (let i = 0; i < existingTransaction.length; i++) {
  //     const element = existingTransaction[i];
  //     const result = {
  //       ...element.toJSON(),
  //       giftCard:
  //         element.giftCardId &&
  //         (await this.giftCardRepository.findByPk(element.giftCardId)),
  //       giftCardRate:
  //         element.giftCardRateId &&
  //         (await this.giftCardRateRepository.findByPk(element.giftCardRateId)),
  //       user:
  //         element.userId &&
  //         (await this.userRepository.findByPk(element.userId)),
  //       merchant:
  //         element.merchantId &&
  //         (await this.userRepository.findByPk(element.merchantId)),
  //       BankDetails:
  //         element.bankDetailsId &&
  //         (await this.bankDetailsRepository.findByPk(element.bankDetailsId)),
  //       wallet:
  //         element.walletAddressId &&
  //         (await this.walletRepository.findByPk(element.walletAddressId)),
  //       payment:
  //         element.paymentId &&
  //         (await this.paymentRepository.findByPk(element.paymentId)),
  //     };
  //     response.push(result);
  //   }
  //   return response.sort((a, b) => {
  //     return new Date(b.createdAt) - new Date(a.createdAt);
  //   });
  // };
  // getTransactionsByMerchantId = async (id) => {
  //   const existingTransaction = await this.giftCardTransactionModel.findAll({
  //     where: {
  //       merchantId: id,
  //     },
  //   });
  //   if (!existingTransaction) {
  //     throw new TransactionNotFound("Transaction not found");
  //   }
  //
  //   const response = [];
  //   for (let i = 0; i < existingTransaction.length; i++) {
  //     const element = existingTransaction[i];
  //     const result = {
  //       ...element.toJSON(),
  //       giftCard:
  //         element.giftCardId &&
  //         (await this.giftCardRepository.findByPk(element.giftCardId)),
  //       giftCardRate:
  //         element.giftCardRateId &&
  //         (await this.giftCardRateRepository.findByPk(element.giftCardRateId)),
  //       user:
  //         element.userId &&
  //         (await this.userRepository.findByPk(element.userId)),
  //       merchant:
  //         element.merchantId &&
  //         (await this.userRepository.findByPk(element.merchantId)),
  //       BankDetails:
  //         element.bankDetailsId &&
  //         (await this.bankDetailsRepository.findByPk(element.bankDetailsId)),
  //       wallet:
  //         element.walletAddressId &&
  //         (await this.walletRepository.findByPk(element.walletAddressId)),
  //       payment:
  //         element.paymentId &&
  //         (await this.paymentRepository.findByPk(element.paymentId)),
  //     };
  //     response.push(result);
  //   }
  //   return response.sort((a, b) => {
  //     return new Date(a.createdAt) - new Date(b.createdAt);
  //   });
  // };
  //
  // getTransactionsByUserIdAndMerchantId = async (userId, merchantId) => {
  //   const existingTransaction = await this.giftCardTransactionModel.findAll({
  //     where: {
  //       userId: userId,
  //       merchantId: merchantId,
  //     },
  //   });
  //   if (!existingTransaction || existingTransaction.length === 0) {
  //     throw new TransactionNotFound("Transaction not found");
  //   }
  //   const response = [];
  //   for (let i = 0; i < existingTransaction.length; i++) {
  //     const element = existingTransaction[i];
  //     const result = {
  //       ...element.toJSON(),
  //       giftCard:
  //         element.giftCardId &&
  //         (await this.giftCardRepository.findByPk(element.giftCardId)),
  //       giftCardRate:
  //         element.giftCardRateId &&
  //         (await this.giftCardRateRepository.findByPk(element.giftCardRateId)),
  //       user:
  //         element.userId &&
  //         (await this.userRepository.findByPk(element.userId)),
  //       merchant:
  //         element.merchantId &&
  //         (await this.userRepository.findByPk(element.merchantId)),
  //       BankDetails:
  //         element.bankDetailsId &&
  //         (await this.bankDetailsRepository.findByPk(element.bankDetailsId)),
  //       wallet:
  //         element.walletAddressId &&
  //         (await this.walletRepository.findByPk(element.walletAddressId)),
  //       payment:
  //         element.paymentId &&
  //         (await this.paymentRepository.findByPk(element.paymentId)),
  //     };
  //     response.push(result);
  //   }
  //   return response.sort((a, b) => {
  //     return new Date(b.createdAt) - new Date(a.createdAt);
  //   });
  // };
  //
  getAllMyTransactionsWithOthers = async (
    user: JwtPayload,
    pageRequest: PageRequest,
  ) => {
    let queryParams = {};
    if (user.role === Role.MERCHANT) {
      queryParams = {
        merchantId: user.id,
      };
    } else {
      queryParams = {
        userId: user.id,
      };
    }
    const offset = (pageRequest.page - 1) * pageRequest.limit;
    const paginationInfo = {
      totalItems: 0,
      totalPages: 0,
      currentPage: pageRequest.page,
      pageSize: pageRequest.limit,
      isLastPage: true,
    };
    const myTransactions = await GiftCardTransaction.findAll({
      where: queryParams,
      include: { all: true },
      limit: pageRequest.limit,
      offset: offset,
      order: [[pageRequest.sortBy, pageRequest.sortDirection]],
    })
      .then(async (result) => {
        const count = await GiftCardTransaction.count();

        const totalPages = Math.ceil(count / pageRequest.limit);
        paginationInfo.isLastPage = pageRequest.limit >= result.length;
        paginationInfo.totalItems = count;
        paginationInfo.totalPages = totalPages;
        return result.map((transaction) => transaction.toJSON());
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return {
      transactions: myTransactions,
      pagination: paginationInfo,
    };
  };

  getAllMyTransactionsAsLoggedInUser = async (
    user: JwtPayload,
    pageRequest: PageRequest,
  ) => {
    let queryParams = {};
    if (user.role === "MERCHANT") {
      queryParams = {
        merchantId: user.id,
      };
    } else {
      queryParams = {
        userId: user.id,
      };
    }
    const offset = (pageRequest.page - 1) * pageRequest.limit;
    const paginationInfo = {
      totalItems: 0,
      totalPages: 0,
      currentPage: pageRequest.page,
      pageSize: pageRequest.limit,
      isLastPage: true,
    };
    const myTransactions = await GiftCardTransaction.findAll({
      where: queryParams,
      include: { all: true },
      limit: pageRequest.limit,
      offset: offset,
      order: [[pageRequest.sortBy, pageRequest.sortDirection]],
    })
      .then(async (result) => {
        const count = await GiftCardTransaction.count();
        const totalPages = Math.ceil(count / pageRequest.limit);
        paginationInfo.isLastPage = pageRequest.limit >= result.length;
        paginationInfo.totalItems = count;
        paginationInfo.totalPages = totalPages;
        return result.map((transaction) => transaction.toJSON());
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return {
      transactions: myTransactions,
      pagination: paginationInfo,
      profile: user,
    };
  };

  getTransactionsByStatus = async (
    status: TransactionStatus,
    user: JwtPayload,
    pageRequest: PageRequest,
  ) => {
    const offset = (pageRequest.page - 1) * pageRequest.limit;
    const paginationInfo = {
      totalItems: 0,
      totalPages: 0,
      currentPage: pageRequest.page,
      pageSize: pageRequest.limit,
      isLastPage: true,
    };
    const myTransactions = await GiftCardTransaction.findAll({
      where: {
        [Op.and]: [
          status !== TransactionStatus.ALL && { status: status },
          { userId: user.id },
          { merchantId: user.id },
          {
            [Op.or]: [{ id: { [Op.ne]: null } }],
          },
        ],
      },
      limit: pageRequest.limit,
      offset: offset,
      order: [[pageRequest.sortBy, pageRequest.sortDirection]],
      include: { all: true },
    })
      .then(async (result) => {
        const count = await GiftCardTransaction.count();

        const totalPages = Math.ceil(count / pageRequest.limit);
        paginationInfo.isLastPage = pageRequest.limit >= result.length;
        paginationInfo.totalItems = count;
        paginationInfo.totalPages = totalPages;
        return result.map((transaction) => transaction.toJSON());
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return {
      transactions: myTransactions,
      pagination: paginationInfo,
      profile: user,
    };
  };

  getAllMyPendingTransactions = async (
    user: JwtPayload,
    pageRequest: PageRequest,
  ) => {
    let queryParams = {};
    if (user.role === Role.MERCHANT) {
      queryParams = {
        merchantId: user.id,
        status: TransactionStatus.PROCESSING,
      };
    } else {
      queryParams = {
        userId: user.id,
        status: TransactionStatus.PROCESSING,
      };
    }
    const offset = (pageRequest.page - 1) * pageRequest.limit;
    const paginationInfo = {
      totalItems: 0,
      totalPages: 0,
      currentPage: pageRequest.page,
      pageSize: pageRequest.limit,
      isLastPage: true,
    };
    const myTransactions = await GiftCardTransaction.findAll({
      where: queryParams,
      include: { all: true },
      limit: pageRequest.limit,
      offset: offset,
      order: [[pageRequest.sortBy, pageRequest.sortDirection]],
    })
      .then(async (result) => {
        const count = await GiftCardTransaction.count();

        const totalPages = Math.ceil(count / pageRequest.limit);
        paginationInfo.isLastPage = pageRequest.limit >= result.length;
        paginationInfo.totalItems = count;
        paginationInfo.totalPages = totalPages;
        return result.map((transaction) => transaction.toJSON());
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return {
      transactions: myTransactions,
      pagination: paginationInfo,
      profile: user,
    };
  };

  getAllMyDeclinedTransactions = async (
    user: JwtPayload,
    pageRequest: PageRequest,
  ) => {
    let queryParams = {};
    if (user.role === Role.MERCHANT) {
      queryParams = {
        merchantId: user.id,
        status: TransactionStatus.DECLINED,
      };
    } else {
      queryParams = {
        userId: user.id,
        status: TransactionStatus.DECLINED,
      };
    }
    const offset = (pageRequest.page - 1) * pageRequest.limit;
    const paginationInfo = {
      totalItems: 0,
      totalPages: 0,
      currentPage: pageRequest.page,
      pageSize: pageRequest.limit,
      isLastPage: true,
    };
    const myTransactions = await GiftCardTransaction.findAll({
      where: queryParams,
      include: { all: true },
      limit: pageRequest.limit,
      offset: offset,
      order: [[pageRequest.sortBy, pageRequest.sortDirection]],
    })
      .then(async (result) => {
        const count = await GiftCardTransaction.count();

        const totalPages = Math.ceil(count / pageRequest.limit);
        paginationInfo.isLastPage = pageRequest.limit >= result.length;
        paginationInfo.totalItems = count;
        paginationInfo.totalPages = totalPages;
        return result.map((transaction) => transaction.toJSON());
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return {
      transactions: myTransactions,
      pagination: paginationInfo,
      profile: user,
    };
  };

  acceptOrRejectTransactionById = async (
    transactionId: number,
    user: JwtPayload,
    payload: AcceptRejectTransactionDTO,
  ) => {
    const existingTransaction = await GiftCardTransaction.findByPk(
      transactionId,
      { include: { all: true } },
    );
    if (!existingTransaction) {
      throw new HttpException("Transaction not found", HttpStatus.NOT_FOUND);
    }
    const isUser = user.role === Role.USER;
    if (existingTransaction.status === TransactionStatus.CANCELLED) {
      throw new HttpException(
        "Transaction already cancelled",
        HttpStatus.NOT_FOUND,
      );
    }
    if (existingTransaction.status === TransactionStatus.COMPLETED) {
      throw new HttpException(
        "Transaction already completed",
        HttpStatus.CONFLICT,
      );
    }
    if (existingTransaction.status === TransactionStatus.PROCESSING) {
      throw new HttpException(
        "Transaction already accepted",
        HttpStatus.CONFLICT,
      );
    }
    if (existingTransaction.status === TransactionStatus.DECLINED) {
      throw new HttpException(
        "Transaction already declined",
        HttpStatus.CONFLICT,
      );
    }
    // const merchant = existingTransaction["merchant"];
    // let userFromTransaction = existingTransaction["user"];
    // userFromTransaction = userFromTransaction.toJSON();

    // if (existingTransaction.status === "PROCESSING") {
    if (payload.status === TransactionStatus.ACCEPTED) {
      existingTransaction.status = TransactionStatus.PROCESSING;
      await existingTransaction.save();
      await this.messageSender.sendAcceptedTransactionMessage(
        existingTransaction,
      );
      return "Transaction accepted successfully";
    } else {
      existingTransaction.status = TransactionStatus.DECLINED;
      await existingTransaction.save();
      if (isUser) {
        //To-do
      } else {
        //To-Do
      }

      await GiftCardTransaction.destroy({
        where: {
          id: transactionId,
        },
      });
      return "Transaction declined successfully";
    }
  };
}
