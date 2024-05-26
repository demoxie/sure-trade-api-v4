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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("../../models/user.model");
const bcrypt = require("bcrypt");
const tier_model_1 = require("../../models/tier.model");
const enum_1 = require("../../enums/enum");
const rabbitmq_producer_1 = require("../../config/rabbitmq/service/rabbitmq-producer");
const ioredis_1 = require("@nestjs-modules/ioredis");
const ioredis_2 = require("ioredis");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../../user/service/user.service");
const message_sender_service_1 = require("../../message-sender/message-sender.service");
const util_service_1 = require("../../util/util.service");
const modelmapper_service_1 = require("../../util/modelmapper/modelmapper.service");
let AuthService = class AuthService {
    constructor(rabbitmq, redis, configService, utilService, messageSender, userService, userRepository) {
        this.rabbitmq = rabbitmq;
        this.redis = redis;
        this.configService = configService;
        this.utilService = utilService;
        this.messageSender = messageSender;
        this.userService = userService;
        this.userRepository = userRepository;
        this.login = async (dto) => {
            const existingUser = await user_model_1.User.findOne({
                where: {
                    email: dto.email,
                },
            }).catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.NOT_FOUND);
            });
            if (!existingUser) {
                throw new common_1.UnauthorizedException("User doesn't exist");
            }
            if (!existingUser.isVerified) {
                const otp = this.utilService.generateOtp().toString();
                existingUser.otp = otp;
                await existingUser.save();
                await this.redis.set(otp, existingUser.email, "EX", 900000);
                await this.messageSender.sendAccountVerificationMessage(otp, existingUser);
                throw new common_1.UnauthorizedException("User is not verified");
            }
            if (existingUser.isSuspended) {
                throw new common_1.UnauthorizedException("User is suspended");
            }
            const passwordIsValid = bcrypt.compareSync(dto.password, existingUser.password);
            if (!passwordIsValid) {
                throw new common_1.UnauthorizedException("Invalid credentials");
            }
            const payload = {
                id: existingUser.id,
                email: existingUser.email,
                role: existingUser.role,
            };
            const token = await this.utilService.generateToken(payload);
            existingUser.isActive = true;
            existingUser.token = token;
            await this.messageSender.sendLoginNoticeMessage(dto.requestIdentity, existingUser);
            return await existingUser
                .save()
                .then((res) => res.toJSON())
                .catch((err) => {
                console.log(err);
                throw new common_1.HttpException(err.message, common_1.HttpStatus.NOT_FOUND);
            });
        };
        this.createUser = async (user) => {
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
                throw new common_1.HttpException("User already exists", 409);
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
            const userTier = await tier_model_1.Tier.findOne({ where: { id: 5 } })
                .then((tiers) => {
                return tiers;
            })
                .catch((error) => {
                throw new common_1.HttpException(error, 500);
            });
            const payload = {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                password: hashedPassword,
                phoneNumber: user.phoneNumber,
                role: enum_1.Role.USER,
                tierId: userTier.id,
                otp: otp,
                isVerified: false,
                isActive: false,
                isSuspended: false,
                createdAt: new Date(),
            };
            const newUser = await this.userRepository
                .create(payload)
                .then((user) => {
                return user.toJSON();
            })
                .catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
            await this.messageSender.sendAccountVerificationMessage(otp, newUser);
            return newUser;
        };
        this.verifyOtp = async (dto) => {
            const otp = dto.otp;
            const userEmail = await this.redis.get(otp);
            console.log("User email: " + userEmail);
            if (userEmail) {
                const user = await this.userService.getUserByEmail(userEmail);
                if (user) {
                    if (user.otp === otp) {
                        user.isVerified = true;
                        user.otp = "";
                        const mapper = new modelmapper_service_1.ModelMapper();
                        const userToUpdate = mapper.map(user);
                        const updatedUser = await this.userService.updateUser(user.id, userToUpdate);
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
                            const otpVerificationResponse = {
                                token: token,
                            };
                            return otpVerificationResponse;
                        }
                    }
                    else {
                        throw new common_1.UnauthorizedException("Invalid otp");
                    }
                }
                else {
                    throw new common_1.UnauthorizedException("User not found");
                }
            }
            else {
                throw new common_1.UnauthorizedException("Invalid otp");
            }
        };
        this.resetPassword = async (otp, body) => {
            const savedOtp = await this.redis.get(otp);
            if (!savedOtp) {
                throw new common_1.HttpException("OTP Expired or Invalid", common_1.HttpStatus.BAD_REQUEST);
            }
            const existingUser = await this.userService.getUserByEmail(savedOtp);
            if (!existingUser) {
                throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
            }
            const isValid = body.password === body.confirmPassword;
            if (!isValid) {
                throw new common_1.HttpException("Passwords does not match", common_1.HttpStatus.BAD_REQUEST);
            }
            await this.redis.del(otp);
            existingUser.otp = "";
            existingUser.password = bcrypt.hashSync(body.password, 10);
            const mapper = new modelmapper_service_1.ModelMapper();
            return mapper.map((await existingUser.save()).toJSON());
        };
        this.confirmTransactionPin = async (pin, jwtUser) => {
            const existingUser = await this.userRepository.findByPk(jwtUser.id);
            if (!existingUser) {
                throw new common_1.HttpException("Account doesn't exist", common_1.HttpStatus.NOT_FOUND);
            }
            const isValid = bcrypt.compareSync(pin, existingUser.transactionPin);
            if (!isValid) {
                throw new common_1.HttpException("Incorrect transaction pin", common_1.HttpStatus.BAD_REQUEST);
            }
            const mapper = new modelmapper_service_1.ModelMapper();
            return mapper.map((await existingUser.save()).toJSON());
        };
    }
    async setupTransactionPin(body, jwtUser, requestIdentity) {
        const existingUser = await this.userRepository.findByPk(jwtUser.id);
        if (!existingUser) {
            throw new common_1.HttpException("Account doesn't exist", common_1.HttpStatus.NOT_FOUND);
        }
        if (body.transactionPin !== body.confirmTransactionPin) {
            throw new common_1.HttpException("Transaction pins do not match ", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        existingUser.transactionPin = bcrypt.hashSync(body.transactionPin, 10);
        await this.messageSender.sendTransactionPinSetupMessage(body.transactionPin, existingUser, requestIdentity);
        const mapper = new modelmapper_service_1.ModelMapper();
        return mapper.map((await existingUser.save()).toJSON());
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, ioredis_1.InjectRedis)()),
    __param(6, (0, common_1.Inject)("USER_REPOSITORY")),
    __metadata("design:paramtypes", [rabbitmq_producer_1.RabbitmqProducer,
        ioredis_2.default,
        config_1.ConfigService,
        util_service_1.UtilService,
        message_sender_service_1.MessageSenderService,
        user_service_1.UserService, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map