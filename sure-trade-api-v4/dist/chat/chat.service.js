"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const chat_mode_1 = require("../models/chat.mode");
let ChatService = class ChatService {
    async createChat(user, body) {
        return await chat_mode_1.Chat.create({
            ...body,
            senderId: user.id,
        })
            .then(async (chat) => {
            chat = chat.toJSON();
            return await chat_mode_1.Chat.findOne({
                where: { id: chat.id },
                include: { all: true },
            })
                .catch((e) => {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
        })
            .then(async (chat) => {
            return chat.toJSON();
        })
            .catch((e) => {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async getChatById(id) {
        return await chat_mode_1.Chat.findOne({
            where: {
                id: id,
            },
            include: { all: true },
        })
            .then((chat) => {
            return chat;
        })
            .catch((e) => {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async getChatByUserId(userId, transactionId) {
        return await chat_mode_1.Chat.findAll({
            where: {
                senderId: userId,
                transactionId: transactionId,
            },
            include: { all: true },
        })
            .then((chat) => {
            return chat;
        })
            .catch((e) => {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async updateChatById(id, user, body) {
        const chat = await this.getChatById(id);
        if (chat.senderId !== user.id) {
            throw new common_1.HttpException("You are not allowed to update this chat", common_1.HttpStatus.UNAUTHORIZED);
        }
        return await chat_mode_1.Chat.update({
            ...body,
            senderId: user.id,
        }, {
            where: {
                id: id,
            },
        })
            .then((chat) => {
            return chat;
        })
            .catch((e) => {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async deleteChat(id, user) {
        const chat = await this.getChatById(id);
        if (chat.senderId !== user.id) {
            throw new common_1.HttpException("You are not allowed to update this chat", common_1.HttpStatus.UNAUTHORIZED);
        }
        return await chat_mode_1.Chat.destroy({
            where: {
                id: id,
            },
        })
            .then((chat) => {
            return chat;
        })
            .catch((e) => {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async getChatMessages(id) {
        return await this.getChatById(id);
    }
    async getChatMessageById(id) {
        return await chat_mode_1.Chat.findOne({
            where: {
                id: id,
            },
            include: { all: true },
        })
            .then((chat) => {
            return chat;
        })
            .catch((e) => {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async getChatBetweenUsers(senderId, receiverId, transactionId) {
        const chats1 = await chat_mode_1.Chat.findAll({
            where: {
                senderId: senderId,
                receiverId: receiverId,
                transactionId: transactionId,
            },
            include: { all: true },
        })
            .then((chat) => {
            return chat;
        })
            .catch((e) => {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        const chats2 = await chat_mode_1.Chat.findAll({
            where: {
                senderId: receiverId,
                receiverId: senderId,
                transactionId: transactionId,
            },
            include: { all: true },
        })
            .then((chat) => {
            return chat;
        })
            .catch((e) => {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        const joinedChats = chats1.concat(chats2);
        return joinedChats.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
    async getUnreadChats(user, transactionId) {
        return await chat_mode_1.Chat.findAll({
            where: {
                receiverId: user.id,
                transactionId: transactionId,
                isRead: false,
            },
            include: { all: true },
        })
            .then((chat) => {
            return chat;
        })
            .catch((e) => {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async getChats() {
        return await chat_mode_1.Chat.findAll({ include: { all: true } })
            .then((chat) => {
            return chat;
        })
            .catch((e) => {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async getUnreadChatsWithUserByUserId(senderId, receiverId, transactionId) {
        return await chat_mode_1.Chat.findAll({
            where: {
                senderId: senderId,
                receiverId: receiverId,
                isRead: false,
                transactionId: transactionId,
            },
            include: { all: true },
        })
            .then((chat) => {
            return chat;
        })
            .catch((e) => {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)()
], ChatService);
//# sourceMappingURL=chat.service.js.map