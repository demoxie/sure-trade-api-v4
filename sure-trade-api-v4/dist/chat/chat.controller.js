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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const HttpExceptionFilter_1 = require("../exception/HttpExceptionFilter");
const auth_guard_1 = require("../auth/service/auth.guard");
const chat_service_1 = require("./chat.service");
const enum_1 = require("../enums/enum");
const role_guard_1 = require("../auth/service/role.guard");
const dto_1 = require("../dto");
const user_controller_1 = require("../user/controller/user.controller");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async getChats() {
        return this.chatService.getChats();
    }
    async getChatById(id) {
        return this.chatService.getChatById(id);
    }
    async getChatByUserId(userId, transactionId) {
        return this.chatService.getChatByUserId(userId, transactionId);
    }
    async createChat(chatDto, req) {
        return this.chatService.createChat(user_controller_1.UserController.getJwtUser(req), chatDto);
    }
    async updateChatById(id, chatDto, req) {
        return this.chatService.updateChatById(id, user_controller_1.UserController.getJwtUser(req), chatDto);
    }
    async deleteChat(id, req) {
        return this.chatService.deleteChat(id, user_controller_1.UserController.getJwtUser(req));
    }
    async getChatBetweenUsers(receiverId, transactionId, req) {
        return this.chatService.getChatBetweenUsers(user_controller_1.UserController.getJwtUser(req).id, receiverId, transactionId);
    }
    async getUnreadChats(transactionId, req) {
        return this.chatService.getUnreadChats(user_controller_1.UserController.getJwtUser(req), transactionId);
    }
    async getUnreadChatsWithUserByUserId(userId, transactionId, req) {
        return this.chatService.getUnreadChatsWithUserByUserId(user_controller_1.UserController.getJwtUser(req).id, userId, transactionId);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get All Chats",
        description: "Endpoint to retrieve all chats.",
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: [dto_1.ChatResponse] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChats", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Chat by ID",
        description: "Endpoint to retrieve a chat by ID.",
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: dto_1.ChatResponse }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChatById", null);
__decorate([
    (0, common_1.Get)("user/:userId/transactions/:transactionId"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Chat by User ID and Transaction ID",
        description: "Endpoint to retrieve a chat by user ID and transaction ID.",
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: dto_1.ChatResponse }),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Param)("transactionId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChatByUserId", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Create Chat",
        description: "Endpoint to create a new chat.",
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: dto_1.ChatResponse }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ChatDTO, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createChat", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Update Chat by ID",
        description: "Endpoint to update a chat by ID.",
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: dto_1.ChatResponse }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.ChatDTO, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "updateChatById", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Delete Chat by ID",
        description: "Endpoint to delete a chat by ID.",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Chat deleted successfully.",
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "deleteChat", null);
__decorate([
    (0, common_1.Get)("between/:receiverId/me/transactions/:transactionId"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get Chat Between Users",
        description: "Endpoint to retrieve chats between authenticated user and another user by ID.",
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: [dto_1.ChatResponse] }),
    __param(0, (0, common_1.Param)("receiverId")),
    __param(1, (0, common_1.Param)("transactionId")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChatBetweenUsers", null);
__decorate([
    (0, common_1.Get)("my/unread/get-all/transactions/:transactionId"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get All My Unread Chats",
        description: "Endpoint to retrieve all unread chats for the authenticated user.",
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: [dto_1.ChatResponse] }),
    __param(0, (0, common_1.Param)("transactionId")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getUnreadChats", null);
__decorate([
    (0, common_1.Get)("my/unread/users/:userId/get-all/transactions/:transactionId"),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, auth_guard_1.Roles)(enum_1.Role.USER, enum_1.Role.MERCHANT, enum_1.Role.ADMIN, enum_1.Role.SUPER_ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Get All My Unread Chats with User by User ID",
        description: "Endpoint to retrieve all unread chats with a specific user by user ID for the authenticated user.",
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: [dto_1.ChatResponse] }),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Param)("transactionId")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getUnreadChatsWithUserByUserId", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)("/chat"),
    (0, swagger_1.ApiTags)("Chat Controller"),
    (0, common_1.UseFilters)(new HttpExceptionFilter_1.HttpExceptionFilter()),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map