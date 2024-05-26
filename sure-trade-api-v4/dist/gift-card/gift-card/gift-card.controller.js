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
exports.GiftCardController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../auth/service/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../dto");
const role_guard_1 = require("../../auth/service/role.guard");
const enum_1 = require("../../enums/enum");
const gift_card_service_1 = require("./gift-card.service");
const user_controller_1 = require("../../user/controller/user.controller");
const HttpExceptionFilter_1 = require("../../exception/HttpExceptionFilter");
let GiftCardController = class GiftCardController {
    constructor(giftCardService) {
        this.giftCardService = giftCardService;
    }
    async getGiftCards() {
        return {
            data: await this.giftCardService.getGiftCards(),
            message: "Success"
        };
    }
    async getAllMyGiftCards(req) {
        const giftCards = await this.giftCardService.getAllMyGiftCards(user_controller_1.UserController.getJwtUser(req));
        return {
            data: giftCards,
            message: "Success"
        };
    }
    async getGiftCardById(id) {
        return {
            data: await this.giftCardService.getGiftCardById(id),
            message: "Success"
        };
    }
    async getGiftCardByCardCode(cardCode) {
        return {
            data: await this.giftCardService.getGiftCardByCardCode(cardCode),
            message: "Success"
        };
    }
    async getGiftCardsByUserId(userId) {
        return {
            data: await this.giftCardService.getGiftCardsByUserId(userId),
            message: "Success"
        };
    }
    async getGiftCardsByStatus(status) {
        return {
            data: await this.giftCardService.getGiftCardByStatus(status),
            message: "Success"
        };
    }
    async getGiftCardByStatus(status) {
        return {
            data: this.giftCardService.getGiftCardByStatus(status),
            message: "Success"
        };
    }
    async getGiftCardsByType(type) {
        return {
            data: await this.giftCardService.getGiftCardsByType(type),
            message: "Success"
        };
    }
    async createGiftCard(body, req) {
        return {
            data: await this.giftCardService.createGiftCard(body, user_controller_1.UserController.getJwtUser(req)),
            message: "Success"
        };
    }
    async searchGiftCards(query) {
        return {
            data: await this.giftCardService.searchGiftCards(query),
            message: "Success"
        };
    }
    async updateGiftCardById(id, body) {
        return {
            data: await this.giftCardService.updateGiftCardById(id, body),
            message: "Success"
        };
    }
    async updateMyGiftCardById(id, body, req) {
        return {
            data: await this.giftCardService.updateMyGiftCardById(id, user_controller_1.UserController.getJwtUser(req), body),
            message: "Success"
        };
    }
    async uploadGiftCardScreenshots(id, body) {
        return {
            data: this.giftCardService.uploadGiftCardScreenshots(id, body),
            message: "Success"
        };
    }
    async deleteGiftCard(id) {
        return {
            data: await this.giftCardService.deleteGiftCard(id),
            message: "Success"
        };
    }
    async getSupportedGiftCards() {
        return {
            data: this.giftCardService.getSupportedGiftCards(),
            message: "Success"
        };
    }
};
exports.GiftCardController = GiftCardController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get All Gift Cards",
        description: "Get All Gift Cards",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.GiftCardsResponse }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "getGiftCards", null);
__decorate([
    (0, common_1.Get)("/mine"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get All My Gift Cards",
        description: "Get All My Gift Cards",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.GiftCardsResponse, description: 'List of Gift Cards' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "getAllMyGiftCards", null);
__decorate([
    (0, common_1.Get)("/:id"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Gift Card By Id",
        description: "Get Gift Card By Id",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.GiftCardResponse }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "getGiftCardById", null);
__decorate([
    (0, common_1.Get)("/search/:cardCode"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Search Gift Cards By Card Code",
        description: "Search Gift Cards By Card Code",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.GiftCardResponse }),
    __param(0, (0, common_1.Param)("cardCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "getGiftCardByCardCode", null);
__decorate([
    (0, common_1.Get)("/user/:userId"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Gift Cards By User Id",
        description: "Get Gift Cards By User Id",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.GiftCardsResponse }),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "getGiftCardsByUserId", null);
__decorate([
    (0, common_1.Get)("/user/:status"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Gift Cards By Status",
        description: "Get Gift Cards By Status",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.GiftCardsResponse }),
    __param(0, (0, common_1.Param)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "getGiftCardsByStatus", null);
__decorate([
    (0, common_1.Get)("/status/:status"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Gift Cards By Status",
        description: "Get Gift Cards By Status",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.GiftCardResponse }),
    __param(0, (0, common_1.Param)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "getGiftCardByStatus", null);
__decorate([
    (0, common_1.Get)("/type/:type"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Gift Cards By Type",
        description: "Get Gift Cards By Type",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.GiftCardsResponse }),
    __param(0, (0, common_1.Param)("type")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "getGiftCardsByType", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: "Create Gift Card",
        description: "Create Gift Card",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.GiftCardResponse }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.GiftCardDTO, Object]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "createGiftCard", null);
__decorate([
    (0, common_1.Get)("/params/search"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Search Gift Cards By Parameters",
        description: "Search Gift Cards By Parameters",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.GiftCardsResponse }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SearchGiftCardQueryParams]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "searchGiftCards", null);
__decorate([
    (0, common_1.Put)("/:id"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Update Gift Card By Id",
        description: "Update Gift Card By Id",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.GiftCardResponse }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.GiftCardDTO]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "updateGiftCardById", null);
__decorate([
    (0, common_1.Put)("/mine/:id"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Update My Gift Card By Id",
        description: "Update My Gift Card By Id",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.GiftCardResponse }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.GiftCardDTO, Object]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "updateMyGiftCardById", null);
__decorate([
    (0, common_1.Put)("/:id/screenshots"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Upload Gift Card Screenshots",
        description: "Upload Gift Card Screenshots",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.GiftCardResponse }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.GiftCardDTO]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "uploadGiftCardScreenshots", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Delete Gift Card By Id",
        description: "Delete Gift Card By Id",
    }),
    (0, swagger_1.ApiResponse)({ type: dto_1.GiftCardResponse }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "deleteGiftCard", null);
__decorate([
    (0, common_1.Get)("/supported/gift-cards"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Supported Gift Cards",
        description: "Get Supported Gift Cards",
    }),
    (0, swagger_1.ApiResponse)({ type: [dto_1.SupportedGiftCard] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GiftCardController.prototype, "getSupportedGiftCards", null);
exports.GiftCardController = GiftCardController = __decorate([
    (0, common_1.Controller)("/gift-card"),
    (0, swagger_1.ApiTags)("Gift Card Controller"),
    (0, common_1.UseFilters)(HttpExceptionFilter_1.HttpExceptionFilter),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [gift_card_service_1.GiftCardService])
], GiftCardController);
//# sourceMappingURL=gift-card.controller.js.map