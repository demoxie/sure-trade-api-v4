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
exports.BankDetailsController = void 0;
const common_1 = require("@nestjs/common");
const bank_details_service_1 = require("./bank-details.service");
const dto_1 = require("../dto");
const user_controller_1 = require("../user/controller/user.controller");
const role_guard_1 = require("../auth/service/role.guard");
const auth_guard_1 = require("../auth/service/auth.guard");
const enum_1 = require("../enums/enum");
const swagger_1 = require("@nestjs/swagger");
const HttpExceptionFilter_1 = require("../exception/HttpExceptionFilter");
let BankDetailsController = class BankDetailsController {
    constructor(bankDetailsService) {
        this.bankDetailsService = bankDetailsService;
    }
    async addBankDetails(dto, req) {
        const jwtUser = user_controller_1.UserController.getJwtUser(req);
        return await this.bankDetailsService.addBankDetails(jwtUser, dto);
    }
    async getAllBankDetails() {
        return await this.bankDetailsService.getAllBankDetails();
    }
    async getBankDetailById(id) {
        return await this.bankDetailsService.getBankDetailById(id);
    }
    async getMyBankDetails(req) {
        return await this.bankDetailsService.getMyBankDetails(user_controller_1.UserController.getJwtUser(req));
    }
    async getUserBankDetails(id) {
        return await this.bankDetailsService.getUserBankDetails(id);
    }
    async getBankDetailsByAccountNumber(accountNumber) {
        return await this.bankDetailsService.getBankDetailsByAccountNumber(accountNumber);
    }
    async updateBankDetail(id, bankDetailDto) {
        return await this.bankDetailsService.updateBankDetail(id, bankDetailDto);
    }
    async deleteBankDetail(id) {
        return await this.bankDetailsService.deleteBankDetail(id);
    }
    async deleteBankDetailByAccountNumber(accountNumber) {
        return await this.bankDetailsService.deleteBankDetailByAccountNumber(accountNumber);
    }
};
exports.BankDetailsController = BankDetailsController;
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Add Bank Details",
        description: "Add Bank Details",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.BankDetailsDTO }),
    (0, common_1.Post)("/"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BankDetailsDTO, Object]),
    __metadata("design:returntype", Promise)
], BankDetailsController.prototype, "addBankDetails", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get All Bank Details",
        description: "Get All Bank Details",
    }),
    (0, swagger_1.ApiResponse)({ type: [dto_1.BankDetailsDTO] }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BankDetailsController.prototype, "getAllBankDetails", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Bank Details By Id",
        description: "Get Bank Details By Id",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.BankDetailsDTO }),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BankDetailsController.prototype, "getBankDetailById", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get My Bank Details",
        description: "Get My Bank Details",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.BankDetailsDTO }),
    (0, common_1.Get)("mine/all"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BankDetailsController.prototype, "getMyBankDetails", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get User Bank Details",
        description: "Get User Bank Details",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.BankDetailsDTO }),
    (0, common_1.Get)("user/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BankDetailsController.prototype, "getUserBankDetails", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Bank Details By Account number",
        description: "Get Bank Details By Account number",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.BankDetailsDTO }),
    (0, common_1.Get)("account-numbers/:accountNumber"),
    __param(0, (0, common_1.Param)("accountNumber")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BankDetailsController.prototype, "getBankDetailsByAccountNumber", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Update Bank Details",
        description: "Update Bank Details",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.BankDetailsDTO }),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.BankDetailsDTO]),
    __metadata("design:returntype", Promise)
], BankDetailsController.prototype, "updateBankDetail", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Delete Bank Details By Id",
        description: "Delete Bank Details By Id",
    }),
    (0, swagger_1.ApiResponse)({ type: String }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BankDetailsController.prototype, "deleteBankDetail", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Delete Bank Details By Account number",
        description: "Delete Bank Details By Account number",
    }),
    (0, swagger_1.ApiResponse)({ type: String }),
    (0, common_1.Delete)("by-account-number/:accountNumber"),
    __param(0, (0, common_1.Param)("accountNumber")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BankDetailsController.prototype, "deleteBankDetailByAccountNumber", null);
exports.BankDetailsController = BankDetailsController = __decorate([
    (0, swagger_1.ApiTags)("Bank Details Controller"),
    (0, common_1.UseFilters)(HttpExceptionFilter_1.HttpExceptionFilter),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("/bank-details"),
    __metadata("design:paramtypes", [bank_details_service_1.BankDetailsService])
], BankDetailsController);
//# sourceMappingURL=bank-details.controller.js.map