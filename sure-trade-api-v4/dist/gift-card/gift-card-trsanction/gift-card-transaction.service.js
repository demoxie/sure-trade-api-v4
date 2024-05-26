"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftCardTransactionService = void 0;
const common_1 = require("@nestjs/common");
const gift_card_transaction_model_1 = require("../../models/gift-card-transaction.model");
const enum_1 = require("../../enums/enum");
const sequelize_1 = require("sequelize");
const config_1 = require("@nestjs/config");
const util_service_1 = require("../../util/util.service");
const message_sender_service_1 = require("../../message-sender/message-sender.service");
let GiftCardTransactionService = class GiftCardTransactionService {
    constructor(giftCardRate, giftCardTransaction, giftCard, userRepository, configService, utilService, messageSender) {
        this.giftCardRate = giftCardRate;
        this.giftCardTransaction = giftCardTransaction;
        this.giftCard = giftCard;
        this.userRepository = userRepository;
        this.configService = configService;
        this.utilService = utilService;
        this.messageSender = messageSender;
        this.addTransaction = async (jwtUser, dto) => {
            const user = await this.userRepository
                .findByPk(jwtUser.id)
                .catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
            return await this.sellGiftCard(user, dto);
        };
        this.sellGiftCard = async (user, transaction) => {
            const giftCard = await this.giftCard.findByPk(transaction.giftCardId);
            if (!giftCard) {
                throw new common_1.HttpException("Gift Card with ID:::" + transaction.giftCardId + " not found", common_1.HttpStatus.NOT_FOUND);
            }
            let queryParams = {};
            if (user.role === enum_1.Role.MERCHANT) {
                transaction.merchantId = user.id;
                queryParams = {
                    merchantId: user.id,
                };
            }
            else {
                console.log("IS USER ------------------------------------------>");
                queryParams = {
                    userId: user.id,
                };
            }
            transaction.userId = user.id;
            queryParams.transactionType = transaction.transactionType;
            queryParams.giftCardRateId = transaction.giftCardRateId;
            queryParams.giftCardId = transaction.giftCardId;
            const existingTransaction = await gift_card_transaction_model_1.GiftCardTransaction.findOne({
                where: {
                    [sequelize_1.Op.and]: queryParams,
                },
            })
                .then((res) => {
                console.log(res);
                return res;
            })
                .catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
            if (existingTransaction) {
                throw new common_1.HttpException("Transaction already exists", common_1.HttpStatus.CONFLICT);
            }
            transaction.status = enum_1.TransactionStatus.NEW;
            transaction.referenceNo =
                await this.utilService.generateGiftCardTxReferenceNo();
            transaction.fee =
                this.configService.get("GIFT_CARD_TRANSACTION_FEES") * transaction.amount;
            transaction.createdAt = new Date();
            const newTransaction = new gift_card_transaction_model_1.GiftCardTransaction(transaction);
            let trans = await newTransaction
                .save()
                .then((result) => {
                return result;
            })
                .catch((err) => {
                console.log(new sequelize_1.DatabaseError(err));
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
            let savedTransaction = await this.giftCardTransaction
                .findByPk(trans.toJSON().id, { include: { all: true } })
                .catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
            savedTransaction = savedTransaction.toJSON();
            trans = savedTransaction;
            await this.messageSender.sendGiftCardTransactionMessage(savedTransaction);
            return { transaction: trans };
        };
        this.getTransactionById = async (id) => {
            const transaction = await gift_card_transaction_model_1.GiftCardTransaction.findByPk(id, {
                include: { all: true },
            }).catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
            if (!transaction) {
                throw new common_1.HttpException("Transaction not found", common_1.HttpStatus.NOT_FOUND);
            }
            return transaction.toJSON();
        };
        this.getAllMyTransactionsWithOthers = async (user, pageRequest) => {
            let queryParams = {};
            if (user.role === enum_1.Role.MERCHANT) {
                queryParams = {
                    merchantId: user.id,
                };
            }
            else {
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
            const myTransactions = await gift_card_transaction_model_1.GiftCardTransaction.findAll({
                where: queryParams,
                include: { all: true },
                limit: pageRequest.limit,
                offset: offset,
                order: [[pageRequest.sortBy, pageRequest.sortDirection]],
            })
                .then(async (result) => {
                const count = await gift_card_transaction_model_1.GiftCardTransaction.count();
                const totalPages = Math.ceil(count / pageRequest.limit);
                paginationInfo.isLastPage = pageRequest.limit >= result.length;
                paginationInfo.totalItems = count;
                paginationInfo.totalPages = totalPages;
                return result.map((transaction) => transaction.toJSON());
            })
                .catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
            return {
                transactions: myTransactions,
                pagination: paginationInfo,
            };
        };
        this.getAllMyTransactionsAsLoggedInUser = async (user, pageRequest) => {
            let queryParams = {};
            if (user.role === "MERCHANT") {
                queryParams = {
                    merchantId: user.id,
                };
            }
            else {
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
            const myTransactions = await gift_card_transaction_model_1.GiftCardTransaction.findAll({
                where: queryParams,
                include: { all: true },
                limit: pageRequest.limit,
                offset: offset,
                order: [[pageRequest.sortBy, pageRequest.sortDirection]],
            })
                .then(async (result) => {
                const count = await gift_card_transaction_model_1.GiftCardTransaction.count();
                const totalPages = Math.ceil(count / pageRequest.limit);
                paginationInfo.isLastPage = pageRequest.limit >= result.length;
                paginationInfo.totalItems = count;
                paginationInfo.totalPages = totalPages;
                return result.map((transaction) => transaction.toJSON());
            })
                .catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
            return {
                transactions: myTransactions,
                pagination: paginationInfo,
                profile: user,
            };
        };
        this.getTransactionsByStatus = async (status, user, pageRequest) => {
            const offset = (pageRequest.page - 1) * pageRequest.limit;
            const paginationInfo = {
                totalItems: 0,
                totalPages: 0,
                currentPage: pageRequest.page,
                pageSize: pageRequest.limit,
                isLastPage: true,
            };
            const myTransactions = await gift_card_transaction_model_1.GiftCardTransaction.findAll({
                where: {
                    [sequelize_1.Op.and]: [
                        status !== enum_1.TransactionStatus.ALL && { status: status },
                        { userId: user.id },
                        { merchantId: user.id },
                        {
                            [sequelize_1.Op.or]: [{ id: { [sequelize_1.Op.ne]: null } }],
                        },
                    ],
                },
                limit: pageRequest.limit,
                offset: offset,
                order: [[pageRequest.sortBy, pageRequest.sortDirection]],
                include: { all: true },
            })
                .then(async (result) => {
                const count = await gift_card_transaction_model_1.GiftCardTransaction.count();
                const totalPages = Math.ceil(count / pageRequest.limit);
                paginationInfo.isLastPage = pageRequest.limit >= result.length;
                paginationInfo.totalItems = count;
                paginationInfo.totalPages = totalPages;
                return result.map((transaction) => transaction.toJSON());
            })
                .catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
            return {
                transactions: myTransactions,
                pagination: paginationInfo,
                profile: user,
            };
        };
        this.getAllMyPendingTransactions = async (user, pageRequest) => {
            let queryParams = {};
            if (user.role === enum_1.Role.MERCHANT) {
                queryParams = {
                    merchantId: user.id,
                    status: enum_1.TransactionStatus.PROCESSING,
                };
            }
            else {
                queryParams = {
                    userId: user.id,
                    status: enum_1.TransactionStatus.PROCESSING,
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
            const myTransactions = await gift_card_transaction_model_1.GiftCardTransaction.findAll({
                where: queryParams,
                include: { all: true },
                limit: pageRequest.limit,
                offset: offset,
                order: [[pageRequest.sortBy, pageRequest.sortDirection]],
            })
                .then(async (result) => {
                const count = await gift_card_transaction_model_1.GiftCardTransaction.count();
                const totalPages = Math.ceil(count / pageRequest.limit);
                paginationInfo.isLastPage = pageRequest.limit >= result.length;
                paginationInfo.totalItems = count;
                paginationInfo.totalPages = totalPages;
                return result.map((transaction) => transaction.toJSON());
            })
                .catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
            return {
                transactions: myTransactions,
                pagination: paginationInfo,
                profile: user,
            };
        };
        this.getAllMyDeclinedTransactions = async (user, pageRequest) => {
            let queryParams = {};
            if (user.role === enum_1.Role.MERCHANT) {
                queryParams = {
                    merchantId: user.id,
                    status: enum_1.TransactionStatus.DECLINED,
                };
            }
            else {
                queryParams = {
                    userId: user.id,
                    status: enum_1.TransactionStatus.DECLINED,
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
            const myTransactions = await gift_card_transaction_model_1.GiftCardTransaction.findAll({
                where: queryParams,
                include: { all: true },
                limit: pageRequest.limit,
                offset: offset,
                order: [[pageRequest.sortBy, pageRequest.sortDirection]],
            })
                .then(async (result) => {
                const count = await gift_card_transaction_model_1.GiftCardTransaction.count();
                const totalPages = Math.ceil(count / pageRequest.limit);
                paginationInfo.isLastPage = pageRequest.limit >= result.length;
                paginationInfo.totalItems = count;
                paginationInfo.totalPages = totalPages;
                return result.map((transaction) => transaction.toJSON());
            })
                .catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
            return {
                transactions: myTransactions,
                pagination: paginationInfo,
                profile: user,
            };
        };
        this.acceptOrRejectTransactionById = async (transactionId, user, payload) => {
            const existingTransaction = await gift_card_transaction_model_1.GiftCardTransaction.findByPk(transactionId, { include: { all: true } });
            if (!existingTransaction) {
                throw new common_1.HttpException("Transaction not found", common_1.HttpStatus.NOT_FOUND);
            }
            const isUser = user.role === enum_1.Role.USER;
            if (existingTransaction.status === enum_1.TransactionStatus.CANCELLED) {
                throw new common_1.HttpException("Transaction already cancelled", common_1.HttpStatus.NOT_FOUND);
            }
            if (existingTransaction.status === enum_1.TransactionStatus.COMPLETED) {
                throw new common_1.HttpException("Transaction already completed", common_1.HttpStatus.CONFLICT);
            }
            if (existingTransaction.status === enum_1.TransactionStatus.PROCESSING) {
                throw new common_1.HttpException("Transaction already accepted", common_1.HttpStatus.CONFLICT);
            }
            if (existingTransaction.status === enum_1.TransactionStatus.DECLINED) {
                throw new common_1.HttpException("Transaction already declined", common_1.HttpStatus.CONFLICT);
            }
            if (payload.status === enum_1.TransactionStatus.ACCEPTED) {
                existingTransaction.status = enum_1.TransactionStatus.PROCESSING;
                await existingTransaction.save();
                await this.messageSender.sendAcceptedTransactionMessage(existingTransaction);
                return "Transaction accepted successfully";
            }
            else {
                existingTransaction.status = enum_1.TransactionStatus.DECLINED;
                await existingTransaction.save();
                if (isUser) {
                }
                else {
                }
                await gift_card_transaction_model_1.GiftCardTransaction.destroy({
                    where: {
                        id: transactionId,
                    },
                });
                return "Transaction declined successfully";
            }
        };
    }
    async getAllTransactions() {
        return await this.giftCardTransaction
            .findAll({ include: { all: true } })
            .then((transactions) => transactions.map((transaction) => transaction.toJSON()))
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
};
exports.GiftCardTransactionService = GiftCardTransactionService;
exports.GiftCardTransactionService = GiftCardTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("GIFT_CARD_RATE_REPOSITORY")),
    __param(1, (0, common_1.Inject)("GIFT_CARD_TRANSACTION_REPOSITORY")),
    __param(2, (0, common_1.Inject)("GIFT_CARD_REPOSITORY")),
    __param(3, (0, common_1.Inject)("USER_REPOSITORY")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, config_1.ConfigService,
        util_service_1.UtilService,
        message_sender_service_1.MessageSenderService])
], GiftCardTransactionService);
//# sourceMappingURL=gift-card-transaction.service.js.map