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
var UserController_1;
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../service/user.service");
const dto_1 = require("../dto");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../../auth/service/auth.service");
const HttpExceptionFilter_1 = require("../../exception/HttpExceptionFilter");
const auth_guard_1 = require("../../auth/service/auth.guard");
const role_guard_1 = require("../../auth/service/role.guard");
const enum_1 = require("../../enums/enum");
const gift_card_rate_model_1 = require("../models/gift-card-rate.model");
const gift_card_transaction_service_1 = require("../../gift-card/gift-card-trsanction/gift-card-transaction.service");
const gift_card_rate_service_1 = require("../../gift-card/gift-card-rate/gift-card-rate.service");
const become_a_merchant_request_model_1 = require("../models/become-a-merchant-request.model");
let UserController = UserController_1 = class UserController {
    constructor(userService, authService, transactionService, giftCardRateService) {
        this.userService = userService;
        this.authService = authService;
        this.transactionService = transactionService;
        this.giftCardRateService = giftCardRateService;
    }
    async getAllUsers() {
        return this.userService.getAllUsers();
    }
    async getUserById(id) {
        return this.userService.getUserById(id);
    }
    async getLoggedInUserProfile(request) {
        return await this.userService.getLoggedInUserProfile(request["user"].email);
    }
    async forgotPassword(email, req) {
        const ipAddress = req.socket.remoteAddress;
        const userAgent = req.headers["user-agent"];
        const requestIdentity = {
            userAgent: userAgent,
            ipAddress: ipAddress,
            time: new Date().toTimeString(),
        };
        return this.userService.forgotPassword(email, requestIdentity);
    }
    async resetPassword(otp, body) {
        return this.authService.resetPassword(otp, body);
    }
    async getMerchants() {
        return this.userService.getMerchants();
    }
    async getMerchantsByRate(cardName, currency, transactionType, giftCardCurrency) {
        return this.userService.getMerchantsByRate(cardName, currency, transactionType, giftCardCurrency);
    }
    async getMerchantRates(merchantId) {
        return this.giftCardRateService.getRatesByMerchantId(merchantId);
    }
    async getActiveMerchants() {
        return this.userService.getActiveMerchants();
    }
    async createUser(body) {
        return this.authService.createUser(body);
    }
    async setupTransactionPin(body, req) {
        const jwtUser = UserController_1.getJwtUser(req);
        const requestIdentity = {
            ipAddress: req.socket.remoteAddress,
            userAgent: req["user-agent"],
            time: new Date().toTimeString(),
        };
        return this.authService.setupTransactionPin(body, jwtUser, requestIdentity);
    }
    async confirmTransactionPin(pin, req) {
        const jwtUser = UserController_1.getJwtUser(req);
        return this.authService.confirmTransactionPin(pin, jwtUser);
    }
    async updateUser(id, body) {
        return this.userService.updateUser(id, body);
    }
    async deleteUser(id) {
        return this.userService.deleteUser(id);
    }
    async login(body, req) {
        const ipAddress = req.socket.remoteAddress;
        const userAgent = req.headers["user-agent"];
        body.requestIdentity = {
            userAgent: userAgent,
            ipAddress: ipAddress,
            time: new Date().toTimeString(),
        };
        return this.authService.login(body);
    }
    async logout(req) {
        const jwtUser = UserController_1.getJwtUser(req);
        return this.userService.logout(jwtUser);
    }
    async verifyOtp(body) {
        return this.authService.verifyOtp(body);
    }
    async uploadProfileImage(body, req) {
        const jwtUser = UserController_1.getJwtUser(req);
        return this.userService.uploadProfileImage(jwtUser, body);
    }
    async requestToBecomeMerchant(body, req) {
        const jwtUser = UserController_1.getJwtUser(req);
        return this.userService.requestToBecomeMerchant(jwtUser, body);
    }
    async getAdminAddressToPay() {
        return this.userService.getAdminAddressToPay();
    }
    async registerTelegram(body) {
        return this.userService.registerTelegram(body);
    }
};
exports.UserController = UserController;
UserController.getJwtUser = (req) => {
    const jwtUser = req["user"];
    return jwtUser;
};
__decorate([
    (0, common_1.Get)("/"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ type: [dto_1.UserResponse], status: 200 }),
    (0, swagger_1.ApiOperation)({ summary: "Get All Users", description: "Get All Users" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)("/:id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Get User By Id", description: "Get User By Id" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Get)("/logged-in/profile"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({
        summary: "Get LoggedIn User",
        description: "Get LoggedIn User",
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getLoggedInUserProfile", null);
__decorate([
    (0, common_1.Get)("/validate/:email"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_guard_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: "Initiate Password Reset",
        description: "Initiate Password Reset",
    }),
    __param(0, (0, common_1.Param)("email")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_guard_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: "Reset Password", description: "Reset Password" }),
    (0, swagger_1.ApiBody)({ type: dto_1.PasswordResetDTO }),
    (0, swagger_1.ApiResponse)({ type: dto_1.UserResponse }),
    (0, common_1.Put)("/reset-password/:otp"),
    __param(0, (0, common_1.Param)("otp")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_a = typeof dto_1.PasswordResetDTO !== "undefined" && dto_1.PasswordResetDTO) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)("/merchants/all"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get All Merchants",
        description: "Get All Merchants",
    }),
    (0, swagger_1.ApiResponse)({ type: [dto_1.UserResponse] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMerchants", null);
__decorate([
    (0, common_1.Get)("/merchants/rates/"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Merchants By Rate",
        description: "Get Merchants By Rate",
    }),
    (0, swagger_1.ApiResponse)({ type: [dto_1.UserResponse] }),
    __param(0, (0, common_1.Query)("cardName")),
    __param(1, (0, common_1.Query)("currency")),
    __param(2, (0, common_1.Query)("transactionType")),
    __param(3, (0, common_1.Query)("giftCardCurrency")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMerchantsByRate", null);
__decorate([
    (0, common_1.Get)("/merchant/all-rates/:merchantId"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Merchants Rates",
        description: "Get Merchants Rates",
        tags: ["Get Merchants Rates"],
    }),
    (0, swagger_1.ApiResponse)({ type: [gift_card_rate_model_1.GiftCardRate] }),
    __param(0, (0, common_1.Param)("merchantId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMerchantRates", null);
__decorate([
    (0, common_1.Get)("/merchants/active/rate"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Active Merchants and Their Rates",
        description: "Get Active Merchants and Their Rates",
    }),
    (0, swagger_1.ApiResponse)({ type: [dto_1.UserResponse] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getActiveMerchants", null);
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: "User Sign Up", description: "User Sign Up" }),
    (0, swagger_1.ApiResponse)({ type: dto_1.UserResponse }),
    (0, common_1.Post)("/"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof dto_1.SignupDTO !== "undefined" && dto_1.SignupDTO) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Setup Transaction PIN",
        description: "Setup Transaction PIN",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.UserResponse }),
    (0, common_1.Post)("/setup/transaction-pin"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof dto_1.TransactionPinDTO !== "undefined" && dto_1.TransactionPinDTO) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setupTransactionPin", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Confirm Transaction PIN",
        description: "Confirm Transaction PIN",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.UserResponse }),
    (0, common_1.Get)("/transaction-pin/confirm/:pin"),
    __param(0, (0, common_1.Param)("pin")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "confirmTransactionPin", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Update Account", description: "Update Account" }),
    (0, swagger_1.ApiResponse)({ type: dto_1.UserResponse }),
    (0, common_1.Put)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_d = typeof dto_1.UpdateDTO !== "undefined" && dto_1.UpdateDTO) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Update User Account",
        description: "Update User Account",
    }),
    (0, swagger_1.ApiResponse)({ type: String }),
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)("/login"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_guard_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: "Login", description: "Login" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof dto_1.LoginDto !== "undefined" && dto_1.LoginDto) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Logout", description: "Logout" }),
    (0, swagger_1.ApiResponse)({ type: String }),
    (0, common_1.Post)("/logout/me"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)("/verify-otp"),
    (0, auth_guard_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: "Verify OTP", description: "Verify OTP" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof dto_1.VerifyOtpDTO !== "undefined" && dto_1.VerifyOtpDTO) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Upload Profile Image",
        description: "Upload Profile Image",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.UserResponse }),
    (0, common_1.Post)("/profile/upload-profile-image"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof dto_1.ProfilePictureUpdateDTO !== "undefined" && dto_1.ProfilePictureUpdateDTO) === "function" ? _g : Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadProfileImage", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Apply to Become Merchant",
        description: "Apply to Become Merchant",
    }),
    (0, swagger_1.ApiResponse)({ type: become_a_merchant_request_model_1.BecomeMerchantRequests }),
    (0, common_1.Post)("/merchant/request/"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof dto_1.BecomeMerchantRequestDTO !== "undefined" && dto_1.BecomeMerchantRequestDTO) === "function" ? _h : Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "requestToBecomeMerchant", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Admin Address to Pay",
        description: "Get Admin Address to Pay",
    }),
    (0, swagger_1.ApiResponse)({ type: String }),
    (0, common_1.Get)("/new-merchant/get-admin-address"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAdminAddressToPay", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Register Telegram",
        description: "Register Telegram",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.UserResponse }),
    (0, common_1.Post)("/telegram/register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof dto_1.RegisterTelegramDTO !== "undefined" && dto_1.RegisterTelegramDTO) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerTelegram", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, common_1.Controller)("/users"),
    (0, swagger_1.ApiTags)("User Controller"),
    (0, common_1.UseFilters)(HttpExceptionFilter_1.HttpExceptionFilter),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        gift_card_transaction_service_1.GiftCardTransactionService,
        gift_card_rate_service_1.GiftCardRateService])
], UserController);
//# sourceMappingURL=user.controller.js.map