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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/service/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const HttpExceptionFilter_1 = require("../exception/HttpExceptionFilter");
const admin_service_1 = require("./admin.service");
const become_a_merchant_request_model_1 = require("../models/become-a-merchant-request.model");
const user_controller_1 = require("../user/controller/user.controller");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async approveRequestToBecomeMerchant(reqId, req) {
        return this.adminService.approveRequestToBecomeMerchant(reqId, user_controller_1.UserController.getJwtUser(req));
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Put)("merchants/requests/:reqId/approve"),
    (0, swagger_1.ApiOperation)({
        summary: "Approve merchant request",
        description: "Approve a request to become a merchant by its ID.",
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: become_a_merchant_request_model_1.BecomeMerchantRequests }),
    __param(0, (0, common_1.Param)("reqId")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approveRequestToBecomeMerchant", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)("Admin Controller"),
    (0, common_1.Controller)("/admins"),
    (0, common_1.UseFilters)(new HttpExceptionFilter_1.HttpExceptionFilter()),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map