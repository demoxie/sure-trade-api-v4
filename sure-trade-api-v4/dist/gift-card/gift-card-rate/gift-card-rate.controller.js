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
exports.GiftCardRateController = void 0;
const common_1 = require("@nestjs/common");
const gift_card_rate_service_1 = require("./gift-card-rate.service");
const swagger_1 = require("@nestjs/swagger");
const HttpExceptionFilter_1 = require("../../exception/HttpExceptionFilter");
const auth_guard_1 = require("../../auth/service/auth.guard");
const enum_1 = require("../../enums/enum");
const dto_1 = require("../../dto");
const user_controller_1 = require("../../user/controller/user.controller");
let GiftCardRateController = class GiftCardRateController {
    constructor(giftCardRateService) {
        this.giftCardRateService = giftCardRateService;
    }
    async addRate(rateDto, req) {
        return this.giftCardRateService.addRate(user_controller_1.UserController.getJwtUser(req).id, rateDto);
    }
    async getAllRates() {
        return this.giftCardRateService.getAllRates();
    }
    async getRatesByMerchantId(id) {
        return this.giftCardRateService.getRatesByMerchantId(id);
    }
    async getMyRates(req) {
        console.log("JWT USER " + JSON.stringify(user_controller_1.UserController.getJwtUser(req)));
        return this.giftCardRateService.getMyRates(user_controller_1.UserController.getJwtUser(req).id);
    }
    async getRatesByStatus(status) {
        return this.giftCardRateService.getRatesByStatus(status);
    }
    async getRateById(id) {
        return this.giftCardRateService.getRateById(id);
    }
    async updateRate(id, rateDto) {
        return this.giftCardRateService.updateRate(id, rateDto);
    }
    async deleteRate(id) {
        return this.giftCardRateService.deleteRate(id);
    }
};
exports.GiftCardRateController = GiftCardRateController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Add Gift Card Rate",
        description: "Endpoint to add a new gift card rate.",
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: dto_1.GiftCardRateDTO }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.GiftCardRateDTO, Object]),
    __metadata("design:returntype", Promise)
], GiftCardRateController.prototype, "addRate", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get All Gift Card Rates",
        description: "Endpoint to retrieve all gift card rates.",
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: [dto_1.GiftCardRateDTO] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GiftCardRateController.prototype, "getAllRates", null);
__decorate([
    (0, common_1.Get)("merchant/:id"),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Gift Card Rates by Merchant ID",
        description: "Endpoint to retrieve gift card rates by merchant ID.",
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: [dto_1.GiftCardRateDTO] }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GiftCardRateController.prototype, "getRatesByMerchantId", null);
__decorate([
    (0, common_1.Get)("merchants/mine"),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, auth_guard_1.Roles)(enum_1.Role.MERCHANT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get My Gift Card Rates",
        description: "Endpoint to retrieve gift card rates for the authenticated merchant.",
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: [dto_1.GiftCardRateDTO] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GiftCardRateController.prototype, "getMyRates", null);
__decorate([
    (0, common_1.Get)("status/:status"),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Gift Card Rates by Status",
        description: "Endpoint to retrieve gift card rates by status.",
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: [dto_1.GiftCardRateDTO] }),
    __param(0, (0, common_1.Param)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GiftCardRateController.prototype, "getRatesByStatus", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Gift Card Rate by ID",
        description: "Endpoint to retrieve a gift card rate by ID.",
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: dto_1.GiftCardRateDTO }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GiftCardRateController.prototype, "getRateById", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, auth_guard_1.Roles)(enum_1.Role.MERCHANT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Update Gift Card Rate",
        description: "Endpoint to update an existing gift card rate.",
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: dto_1.GiftCardRateDTO }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.GiftCardRateDTO]),
    __metadata("design:returntype", Promise)
], GiftCardRateController.prototype, "updateRate", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, auth_guard_1.Roles)(enum_1.Role.MERCHANT),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Delete Gift Card Rate",
        description: "Endpoint to delete a gift card rate by ID.",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Gift card rate deleted successfully.",
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GiftCardRateController.prototype, "deleteRate", null);
exports.GiftCardRateController = GiftCardRateController = __decorate([
    (0, common_1.Controller)("/gift-card-rate"),
    (0, swagger_1.ApiTags)("Gift Card Rate Controller"),
    (0, common_1.UseFilters)(HttpExceptionFilter_1.HttpExceptionFilter),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [gift_card_rate_service_1.GiftCardRateService])
], GiftCardRateController);
//# sourceMappingURL=gift-card-rate.controller.js.map