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
exports.GiftCardTransactionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const gift_card_transaction_service_1 = require("./gift-card-transaction.service");
const role_guard_1 = require("../../auth/service/role.guard");
const auth_guard_1 = require("../../auth/service/auth.guard");
const enum_1 = require("../../enums/enum");
const dto_1 = require("../../dto");
const HttpExceptionFilter_1 = require("../../exception/HttpExceptionFilter");
const user_controller_1 = require("../../user/controller/user.controller");
const gift_card_transaction_model_1 = require("../../models/gift-card-transaction.model");
let GiftCardTransactionsController = class GiftCardTransactionsController {
    constructor(giftCardTransaction) {
        this.giftCardTransaction = giftCardTransaction;
    }
    async getTransactions() {
        return await this.giftCardTransaction.getAllTransactions();
    }
    async addTransaction(body, req) {
        const jwtUser = user_controller_1.UserController.getJwtUser(req);
        return await this.giftCardTransaction.addTransaction(jwtUser, body);
    }
    async getTransactionById(id, pagination) {
        pagination.page = parseInt(pagination.page, 10);
        pagination.limit = parseInt(pagination.limit, 10);
        return await this.giftCardTransaction.getTransactionById(id);
    }
    async getAllMyTransactions(pagination, req) {
        pagination.page = parseInt(pagination.page, 10);
        pagination.limit = parseInt(pagination.limit, 10);
        console.table(pagination);
        return await this.giftCardTransaction.getAllMyTransactionsAsLoggedInUser(user_controller_1.UserController.getJwtUser(req), pagination);
    }
    getAllMyPendingTransactions(pagination, req) {
        pagination.page = parseInt(pagination.page, 10);
        pagination.limit = parseInt(pagination.limit, 10);
        return this.giftCardTransaction.getAllMyPendingTransactions(user_controller_1.UserController.getJwtUser(req), pagination);
    }
    getAllMyDeclinedTransactions(pagination, req) {
        pagination.page = parseInt(pagination.page, 10);
        pagination.limit = parseInt(pagination.limit, 10);
        return this.giftCardTransaction.getAllMyDeclinedTransactions(user_controller_1.UserController.getJwtUser(req), pagination);
    }
    async getAllMyTransactionsWithOthers(pagination, req) {
        pagination.page = parseInt(pagination.page, 10);
        pagination.limit = parseInt(pagination.limit, 10);
        return await this.giftCardTransaction.getAllMyTransactionsWithOthers(user_controller_1.UserController.getJwtUser(req), pagination);
    }
    getTransactionsByStatus(status, pagination, req) {
        pagination.page = parseInt(pagination.page, 10);
        pagination.limit = parseInt(pagination.limit, 10);
        return this.giftCardTransaction.getTransactionsByStatus(status, user_controller_1.UserController.getJwtUser(req), pagination);
    }
    acceptOrRejectTransaction(transactionId, body, req) {
        return this.giftCardTransaction.acceptOrRejectTransactionById(transactionId, user_controller_1.UserController.getJwtUser(req), body);
    }
};
exports.GiftCardTransactionsController = GiftCardTransactionsController;
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Gift Card Transactions",
        description: "Get All Transactions",
    }),
    (0, swagger_1.ApiResponse)({ type: [dto_1.GiftCardTransactionResponse] }),
    (0, common_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GiftCardTransactionsController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Post a Transaction",
        description: "Post a Transaction",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.GiftCardTransactionResponse }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.GiftCardTransactionDTO, Object]),
    __metadata("design:returntype", Promise)
], GiftCardTransactionsController.prototype, "addTransaction", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get a Transaction By Id",
        description: "Get a Transaction",
    }),
    (0, swagger_1.ApiResponse)({ type: gift_card_transaction_model_1.GiftCardTransaction }),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.PageRequest]),
    __metadata("design:returntype", Promise)
], GiftCardTransactionsController.prototype, "getTransactionById", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get my Transactions",
        description: "Get my Transactions",
    }),
    (0, swagger_1.ApiResponse)({ type: [gift_card_transaction_model_1.GiftCardTransaction] }),
    (0, common_1.Get)("mine/logged-in-user"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PageRequest, Object]),
    __metadata("design:returntype", Promise)
], GiftCardTransactionsController.prototype, "getAllMyTransactions", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get my pending Transactions",
        description: "Get my pending Transactions",
    }),
    (0, swagger_1.ApiResponse)({ type: [gift_card_transaction_model_1.GiftCardTransaction] }),
    (0, common_1.Get)("pending/mine"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PageRequest, Object]),
    __metadata("design:returntype", void 0)
], GiftCardTransactionsController.prototype, "getAllMyPendingTransactions", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get my declined Transactions",
        description: "Get my declined Transactions",
    }),
    (0, swagger_1.ApiResponse)({ type: [gift_card_transaction_model_1.GiftCardTransaction] }),
    (0, common_1.Get)("decline/mine"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PageRequest, Object]),
    __metadata("design:returntype", void 0)
], GiftCardTransactionsController.prototype, "getAllMyDeclinedTransactions", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get my transactions with other",
        description: "Get my transactions with other",
    }),
    (0, swagger_1.ApiResponse)({ type: [gift_card_transaction_model_1.GiftCardTransaction] }),
    (0, common_1.Get)("mine/with/others"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PageRequest, Object]),
    __metadata("design:returntype", Promise)
], GiftCardTransactionsController.prototype, "getAllMyTransactionsWithOthers", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get transactions by status",
        description: "Get transactions by status",
    }),
    (0, swagger_1.ApiResponse)({ type: [gift_card_transaction_model_1.GiftCardTransaction] }),
    (0, common_1.Get)("filter/:status"),
    __param(0, (0, common_1.Param)("status")),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.PageRequest, Object]),
    __metadata("design:returntype", void 0)
], GiftCardTransactionsController.prototype, "getTransactionsByStatus", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ description: "Logout" }),
    (0, swagger_1.ApiResponse)({ type: gift_card_transaction_model_1.GiftCardTransaction }),
    (0, common_1.Put)(":transactionId/accept-or-reject"),
    __param(0, (0, common_1.Param)("transactionId")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.AcceptRejectTransactionDTO, Object]),
    __metadata("design:returntype", void 0)
], GiftCardTransactionsController.prototype, "acceptOrRejectTransaction", null);
exports.GiftCardTransactionsController = GiftCardTransactionsController = __decorate([
    (0, common_1.Controller)("/gift-card-transaction"),
    (0, swagger_1.ApiTags)("Gift Card Transactions Controller"),
    (0, common_1.UseFilters)(HttpExceptionFilter_1.HttpExceptionFilter),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [gift_card_transaction_service_1.GiftCardTransactionService])
], GiftCardTransactionsController);
//# sourceMappingURL=gift-card-transaction.controller.js.map