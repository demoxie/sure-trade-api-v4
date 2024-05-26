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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const gift_card_transaction_model_1 = require("../models/gift-card-transaction.model");
const sequelize_1 = require("sequelize");
const user_model_1 = require("../models/user.model");
const become_a_merchant_request_model_1 = require("../models/become-a-merchant-request.model");
const message_sender_service_1 = require("../message-sender/message-sender.service");
const bcrypt = require("bcrypt");
const enum_1 = require("../enums/enum");
const staked_asset_model_1 = require("../models/staked-asset.model");
const user_service_1 = require("../user/service/user.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const tier_model_1 = require("../models/tier.model");
let AdminService = class AdminService {
    constructor(emailSender, userService, jwt, configService) {
        this.emailSender = emailSender;
        this.userService = userService;
        this.jwt = jwt;
        this.configService = configService;
        this.getAllTransactions = async (pageNumber, limit, sortBy, sortDirection) => {
            const allAreEmpty = !pageNumber && !limit && !sortBy && !sortDirection;
            if (allAreEmpty) {
                return await gift_card_transaction_model_1.GiftCardTransaction.findAll({
                    include: { all: true },
                    raw: true,
                })
                    .then((res) => {
                    console.table(res);
                    return res;
                })
                    .catch((err) => {
                    throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                });
            }
            const offset = (pageNumber - 1) * limit;
            return await gift_card_transaction_model_1.GiftCardTransaction.findAll({
                include: { all: true },
                limit: limit,
                offset: offset,
                order: [[sortBy, sortDirection]],
            })
                .then((res) => res)
                .catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
        };
        this.getTransactionsByParams = async (params) => {
            const transactions = await gift_card_transaction_model_1.GiftCardTransaction.findAll({
                where: [sequelize_1.Op.or, params],
            })
                .then((transactions) => transactions)
                .catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.NOT_FOUND);
            });
            if (transactions.length === 0) {
                throw new common_1.HttpException("Transaction not found", common_1.HttpStatus.NOT_FOUND);
            }
            return transactions;
        };
        this.getTransactionById = async (id) => {
            const transaction = await gift_card_transaction_model_1.GiftCardTransaction.findOne({
                where: {
                    id: id,
                },
            });
            if (!transaction) {
                throw new common_1.HttpException("Transaction not found", common_1.HttpStatus.NOT_FOUND);
            }
            return transaction;
        };
        this.getAllAdmins = async () => await user_model_1.User.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        role: "ADMIN",
                    },
                    {
                        role: "SUPER_ADMIN",
                    },
                ],
            },
        });
        this.getAdminById = async (id) => {
            const admin = await user_model_1.User.findOne({
                where: {
                    id: id,
                    [sequelize_1.Op.or]: [
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
                throw new common_1.HttpException("Admin not found", common_1.HttpStatus.NOT_FOUND);
            }
            return admin;
        };
        this.createAdmin = async (admin) => {
            const existingAdmin = await user_model_1.User.findOne({
                where: {
                    email: admin.email,
                },
            });
            if (existingAdmin) {
                throw new common_1.HttpException("Admin already exists", common_1.HttpStatus.CONFLICT);
            }
            admin.password = bcrypt.hashSync(admin.password, 10);
            await user_model_1.User.create(admin);
        };
        this.updateAdminById = async (id, admin) => {
            await user_model_1.User.update(admin, {
                where: {
                    id: id,
                    [sequelize_1.Op.or]: [
                        {
                            role: "ADMIN",
                        },
                        {
                            role: "SUPER_ADMIN",
                        },
                    ],
                },
            });
            return await user_model_1.User.findByPk(id);
        };
        this.assignRole = async (id, role) => {
            const updatedAdmin = await user_model_1.User.update({
                role: role,
            }, {
                where: {
                    id: id,
                },
            });
            if (!updatedAdmin) {
                throw new common_1.HttpException("Admin not found", common_1.HttpStatus.NOT_FOUND);
            }
            return updatedAdmin;
        };
        this.suspendUser = async (id) => {
            const updatedUser = await user_model_1.User.update({
                isSuspended: true,
                isVerified: false,
                token: null,
            }, {
                where: {
                    id: id,
                },
            });
            if (!updatedUser) {
                throw new common_1.HttpException("Admin not found", common_1.HttpStatus.NOT_FOUND);
            }
            return updatedUser;
        };
        this.deleteAdminById = async (id) => {
            const deletedAdmin = await user_model_1.User.destroy({
                where: {
                    id: id,
                    [sequelize_1.Op.or]: [
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
                throw new common_1.HttpException("Admin not found", common_1.HttpStatus.NOT_FOUND);
            }
            return deletedAdmin;
        };
        this.login = async (email, password) => {
            const admin = await user_model_1.User.findOne({
                where: {
                    email: email,
                    [sequelize_1.Op.or]: [
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
                throw new common_1.HttpException("Admin not found", common_1.HttpStatus.NOT_FOUND);
            }
            if (!bcrypt.compareSync(password, admin.password)) {
                throw new common_1.HttpException("Password did not match mismatch", common_1.HttpStatus.BAD_REQUEST);
            }
            admin.token = await this.jwt.signAsync({
                id: admin.id,
                email: admin.email,
                role: admin.role,
            }, {
                expiresIn: "24h",
                secret: this.configService.get("JWT_SECRET"),
            });
            return await admin.save();
        };
        this.logout = async (token) => {
            const admin = await user_model_1.User.findOne({
                where: {
                    token: token,
                    [sequelize_1.Op.or]: [
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
                throw new common_1.HttpException("Admin not found", common_1.HttpStatus.NOT_FOUND);
            }
            await this.jwt.verifyAsync(token, {
                secret: this.configService.get("JWT_SECRET"),
            });
            admin.token = null;
            return await admin.save();
        };
        this.logoutAll = async () => {
            const admins = await user_model_1.User.findAll({
                where: {
                    [sequelize_1.Op.or]: [
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
        this.forgotPassword = async (email) => {
            const admin = await user_model_1.User.findOne({
                where: {
                    email: email,
                    [sequelize_1.Op.or]: [
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
                throw new common_1.HttpException("Admin not found", common_1.HttpStatus.NOT_FOUND);
            }
            admin.token = await this.jwt.signAsync({
                id: admin.id,
                email: admin.email,
                role: admin.role,
            }, {
                expiresIn: "24h",
                secret: this.configService.get("JWT_SECRET"),
            });
            await admin.save();
            return "Reset link sent successfully";
        };
        this.getAllMerchants = async () => await user_model_1.User.findAll({
            where: {
                role: "MERCHANT",
            },
        });
        this.getAllActiveMerchants = async () => await user_model_1.User.findAll({
            where: {
                role: "MERCHANT",
                isActive: true,
            },
        });
        this.getTierByAmount = async (amount) => {
            const tiers = await tier_model_1.Tier.findAll().catch((err) => {
                console.log("Error occurred...", err.message);
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
        this.formatRangeToMinAndMax = (range) => {
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
        this.suspendAdminById = async (id) => {
            const updatedAdmin = await user_model_1.User.update({
                isSuspended: true,
                isVerified: false,
                token: null,
            }, {
                where: {
                    id: id,
                    [sequelize_1.Op.or]: [
                        {
                            role: "ADMIN",
                        },
                        {
                            role: "SUPER_ADMIN",
                        },
                    ],
                },
            });
            if (!updatedAdmin) {
                throw new common_1.HttpException("Admin not found", common_1.HttpStatus.NOT_FOUND);
            }
            return updatedAdmin;
        };
    }
    async approveRequestToBecomeMerchant(id, jwtUser) {
        const request = await become_a_merchant_request_model_1.BecomeMerchantRequests.findOne({
            where: {
                id: id,
                status: enum_1.BecomeAMerchantRequestStatus.PROCESSING,
            },
        })
            .then((res) => {
            return res;
        })
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        if (!request) {
            throw new common_1.HttpException("Request not found", common_1.HttpStatus.NOT_FOUND);
        }
        request.status = enum_1.BecomeAMerchantRequestStatus.APPROVED;
        const existingUser = await user_model_1.User.findOne({
            where: {
                id: request.userId,
                role: enum_1.Role.USER,
            },
        })
            .then((res) => {
            return res;
        })
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        let userId = null;
        if (existingUser) {
            userId = existingUser.id;
            existingUser.role = enum_1.Role.MERCHANT;
        }
        else {
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        }
        let merchantTierId = null;
        const tier = await this.getTierByAmount(request.amount);
        if (tier) {
            merchantTierId = tier.id;
        }
        const existingStakeAsset = await staked_asset_model_1.StakedAsset.findOne({
            where: {
                userId: userId,
                status: enum_1.StakedAssetStatus.NEW,
                currency: request.currency,
                transactionHashId: request.transactionHashId,
            },
        })
            .then((res) => {
            return res;
        })
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        existingUser.tierId = tier.id;
        if (existingStakeAsset) {
            await existingUser
                .save()
                .then((res) => {
                return res;
            })
                .catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
            await request
                .save()
                .then((res) => {
                return res;
            })
                .catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
        }
        const newStakeAsset = new staked_asset_model_1.StakedAsset({
            userId: userId,
            tierId: merchantTierId,
            adminId: jwtUser.id,
            transactionHashId: request.transactionHashId,
            userWalletAddress: request.userWalletAddress,
            adminWalletAddress: await this.userService.getAdminAddressToPay(),
            currency: request.currency,
            amount: request.amount,
            balance: request.amount,
            status: enum_1.StakedAssetStatus.NEW,
            previousBalance: request.amount,
        });
        await existingUser
            .save()
            .then((res) => {
            return res;
        })
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        await request
            .save()
            .then((res) => {
            return res;
        })
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        await this.emailSender.sendApprovedBecomeMerchantRequestMessage(existingUser);
        return await newStakeAsset
            .save()
            .then((res) => {
            return res.toJSON();
        })
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async getUserByUserId(userId) {
        const existingUser = await user_model_1.User.findByPk(userId);
        if (!existingUser) {
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        }
        return existingUser.toJSON();
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [message_sender_service_1.MessageSenderService,
        user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AdminService);
//# sourceMappingURL=admin.service.js.map