"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialsService = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("../models/user.model");
let SocialsService = class SocialsService {
    async registerTelegram(dto) {
        const existingUser = await user_model_1.User.findOne({
            where: {
                username: dto.username,
            },
        }).catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        if (!existingUser) {
            console.error("Not found");
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        }
        existingUser.telegramChatId = dto.chatId;
        await existingUser.save();
        return "Successfully registered telegram";
    }
};
exports.SocialsService = SocialsService;
exports.SocialsService = SocialsService = __decorate([
    (0, common_1.Injectable)()
], SocialsService);
//# sourceMappingURL=socials.service.js.map