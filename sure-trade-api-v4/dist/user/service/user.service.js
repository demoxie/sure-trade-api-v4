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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const rabbitmq_producer_1 = require("../../config/rabbitmq/service/rabbitmq-producer");
const ioredis_1 = require("ioredis");
const ioredis_2 = require("@nestjs-modules/ioredis");
const config_1 = require("@nestjs/config");
const util_service_1 = require("../../util/util.service");
const modelmapper_service_1 = require("../../util/modelmapper/modelmapper.service");
const sequelize_1 = require("sequelize");
const message_sender_service_1 = require("../../message-sender/message-sender.service");
const enum_1 = require("../../enums/enum");
const user_model_1 = require("../../models/user.model");
const become_a_merchant_request_model_1 = require("../../models/become-a-merchant-request.model");
const gift_card_rate_model_1 = require("../../models/gift-card-rate.model");
let UserService = class UserService {
    constructor(rabbitmq, redis, configService, utilService, userRepository, becomeMerchantRequest, messageSender) {
        this.rabbitmq = rabbitmq;
        this.redis = redis;
        this.configService = configService;
        this.utilService = utilService;
        this.userRepository = userRepository;
        this.becomeMerchantRequest = becomeMerchantRequest;
        this.messageSender = messageSender;
        this.getUserByEmail = async (userEmail) => {
            return await user_model_1.User.findOne({
                where: {
                    email: userEmail,
                },
                include: { all: true },
            })
                .then((res) => res)
                .catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.NOT_FOUND);
            });
        };
        this.getLoggedInUserProfile = async (email) => {
            return await this.getUserByEmail(email);
        };
        this.getAllUsers = async () => {
            return await this.userRepository
                .findAll({ include: { all: true } })
                .then((res) => {
                const mapper = new modelmapper_service_1.ModelMapper();
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
        this.getUserById = async (id) => {
            return await this.userRepository
                .findByPk(id, { include: { all: true } })
                .then((res) => {
                const mapper = new modelmapper_service_1.ModelMapper();
                return mapper.map(res.toJSON());
            })
                .catch((err) => {
                throw new sequelize_1.DatabaseError(err.message);
            });
        };
        this.forgotPassword = async (email, requestIdentity) => {
            const existingUser = await this.getUserByEmail(email);
            if (!existingUser) {
                throw new common_1.HttpException("Account doesn't exist", common_1.HttpStatus.NOT_FOUND);
            }
            const otp = this.utilService.generateOtp().toString();
            existingUser.otp = otp;
            await this.redis.set(otp, email, "EX", 900000);
            await existingUser.save();
            await this.messageSender.sendForgotPasswordMessage(otp, existingUser.toJSON(), requestIdentity);
            const mapper = new modelmapper_service_1.ModelMapper();
            return mapper.map(existingUser.toJSON());
        };
        this.getMerchants = async () => await this.userRepository
            .findAll({ include: { all: true } })
            .then((merchants) => {
            if (merchants.length > 0) {
                merchants.map((merchant) => {
                    const mapper = new modelmapper_service_1.ModelMapper();
                    return mapper.map(merchant.toJSON());
                });
            }
            return merchants;
        })
            .catch((err) => {
            throw new common_1.HttpException("Database error has occurred " + err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        this.getMerchantsByRate = async (cardName, currency, transactionType, giftCardCurrency) => await this.userRepository
            .findAll({
            include: [
                {
                    model: gift_card_rate_model_1.GiftCardRate,
                    where: {
                        [sequelize_1.Op.or]: [
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
                role: enum_1.Role.MERCHANT,
            },
        })
            .then((merchants) => {
            if (merchants.length > 0) {
                merchants.map((merchant) => {
                    const mapper = new modelmapper_service_1.ModelMapper();
                    return mapper.map(merchant.toJSON());
                });
            }
            return merchants;
        })
            .catch((err) => {
            throw new common_1.HttpException("Database error has occurred " + err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        this.getActiveMerchants = async () => await this.userRepository
            .findAll({
            where: {
                isActive: true,
            },
            include: { all: true },
        })
            .then((merchants) => {
            if (merchants.length > 0) {
                merchants.map((merchant) => {
                    const mapper = new modelmapper_service_1.ModelMapper();
                    return mapper.map(merchant.toJSON());
                });
            }
            return merchants;
        })
            .catch((err) => {
            throw new common_1.HttpException("Database error has occurred " + err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        this.deleteUser = async (id) => {
            await this.userRepository.destroy({
                where: {
                    id: id,
                },
            });
            return "Account deleted successfully";
        };
        this.logout = async (jwtUser) => {
            const existingUser = await this.userRepository.findByPk(jwtUser.id);
            if (await this.redis.get(existingUser.token))
                await this.redis.del(existingUser.token);
            existingUser.token = null;
            await existingUser.save();
            return "Logout successful";
        };
        this.getActiveAdmin = async () => {
            return await user_model_1.User.findOne({
                where: {
                    isActive: true,
                    [sequelize_1.Op.or]: [{ role: enum_1.Role.ADMIN }, { role: enum_1.Role.SUPER_ADMIN }],
                },
            })
                .then((admin) => admin.toJSON())
                .catch((err) => {
                throw new common_1.HttpException("Database error has occurred " + err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
        };
        this.getAdminAddressToPay = async () => {
            const superAdmin = await this.userRepository.findOne({
                where: {
                    role: enum_1.Role.SUPER_ADMIN,
                },
            });
            return superAdmin ? superAdmin.walletAddress : "";
        };
    }
    async updateUser(id, user) {
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
                const mapper = new modelmapper_service_1.ModelMapper();
                return mapper.map(res.toJSON());
            })
                .catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
        })
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async uploadProfileImage(jwtUser, body) {
        const existingUser = await this.userRepository.findByPk(jwtUser.id);
        existingUser.profilePicture = body.profileImage;
        const mapper = new modelmapper_service_1.ModelMapper();
        return mapper.map((await existingUser.save()).toJSON());
    }
    async requestToBecomeMerchant(jwtUser, body) {
        const user = await user_model_1.User.findByPk(jwtUser.id).catch((err) => {
            throw new common_1.HttpException("Database error has occurred " + err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
        if (user && user.role === enum_1.Role.USER) {
            searchParams = { ...searchParams, userId: user.id };
        }
        const existingRequest = await become_a_merchant_request_model_1.BecomeMerchantRequests.findOne({
            where: [sequelize_1.Op.or, searchParams],
        }).catch((err) => {
            throw new common_1.HttpException("Database error has occurred " + err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        if (existingRequest) {
            throw new common_1.HttpException("Request already exists", common_1.HttpStatus.CONFLICT);
        }
        body.status = enum_1.BecomeAMerchantRequestStatus.PROCESSING;
        body.userId = user.id;
        const existingUser = await user_model_1.User.findByPk(user.id).catch((err) => {
            throw new common_1.HttpException("Database error has occurred " + err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
        const request = await become_a_merchant_request_model_1.BecomeMerchantRequests.create(body)
            .then((res) => res.toJSON())
            .catch((err) => {
            throw new common_1.HttpException("Database error has occurred " + err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        await this.messageSender.sendBecomeMerchantRequestMessage(existingUser, request, admin);
        return request;
    }
    registerTelegram(body) {
        return "success";
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, ioredis_2.InjectRedis)()),
    __param(4, (0, common_1.Inject)("USER_REPOSITORY")),
    __param(5, (0, common_1.Inject)("BECOME_MERCHANT_REQUEST_REPOSITORY")),
    __metadata("design:paramtypes", [rabbitmq_producer_1.RabbitmqProducer,
        ioredis_1.default,
        config_1.ConfigService,
        util_service_1.UtilService, Object, Object, message_sender_service_1.MessageSenderService])
], UserService);
//# sourceMappingURL=user.service.js.map