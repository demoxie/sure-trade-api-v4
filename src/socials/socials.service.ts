import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RegisterTelegramDTO } from "../dto";
import {User} from "../models/user.model";

@Injectable()
export class SocialsService {
  async registerTelegram(dto: RegisterTelegramDTO) {
    const existingUser = await User.findOne({
      where: {
        username: dto.username,
      },
    }).catch((err) => {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    if (!existingUser) {
      console.error("Not found");
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    existingUser.telegramChatId = dto.chatId;

    await existingUser.save();
    return "Successfully registered telegram";
  }
}
