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
exports.SocialsController = void 0;
const common_1 = require("@nestjs/common");
const socials_service_1 = require("./socials.service");
const dto_1 = require("../dto");
const auth_guard_1 = require("../auth/service/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const HttpExceptionFilter_1 = require("../exception/HttpExceptionFilter");
let SocialsController = class SocialsController {
    constructor(socialService) {
        this.socialService = socialService;
    }
    async registerTelegram(dto) {
        console.log("DTO registration :::: ", dto);
        return await this.socialService.registerTelegram(dto);
    }
};
exports.SocialsController = SocialsController;
__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Post)("/telegram/register"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ type: String, status: 200 }),
    (0, swagger_1.ApiOperation)({
        summary: "Register for telegram chat",
        description: "Telegram chat registration",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegisterTelegramDTO]),
    __metadata("design:returntype", Promise)
], SocialsController.prototype, "registerTelegram", null);
exports.SocialsController = SocialsController = __decorate([
    (0, common_1.Controller)("socials"),
    (0, swagger_1.ApiTags)("Socials Controller"),
    (0, common_1.UseFilters)(HttpExceptionFilter_1.HttpExceptionFilter),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [socials_service_1.SocialsService])
], SocialsController);
//# sourceMappingURL=socials.controller.js.map