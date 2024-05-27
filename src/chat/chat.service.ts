import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Chat } from "../models/chat.mode";
import { ChatDTO, JwtPayload } from "../dto";

@Injectable()
export class ChatService {
  async createChat(user: JwtPayload, body: ChatDTO) {
    return await Chat.create({
      ...body,
      senderId: user.id,
    })
      .then(async (chat) => {
        chat = chat.toJSON();
        return await Chat.findOne({
          where: { id: chat.id },
          include: { all: true },
        })
          // .then(async (chat) => {
          //   chat = chat.toJSON();
          //   return chat;
          // })
          .catch((e) => {
            throw new HttpException(
              e.message,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          });
      })
      .then(async (chat) => {
        return chat.toJSON();
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async getChatById(id: number) {
    return await Chat.findOne({
      where: {
        id: id,
      },
      include: { all: true },
    })
      .then((chat) => {
        return chat;
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async getChatByUserId(userId: number, transactionId: number) {
    return await Chat.findAll({
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
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async updateChatById(id: number, user: JwtPayload, body: ChatDTO) {
    const chat = await this.getChatById(id);
    if (chat.senderId !== user.id) {
      throw new HttpException(
        "You are not allowed to update this chat",
        HttpStatus.UNAUTHORIZED,
      );
    }
    return await Chat.update(
      {
        ...body,
        senderId: user.id,
      },
      {
        where: {
          id: id,
        },
      },
    )
      .then((chat) => {
        return chat;
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async deleteChat(id: number, user: JwtPayload) {
    const chat = await this.getChatById(id);
    if (chat.senderId !== user.id) {
      throw new HttpException(
        "You are not allowed to update this chat",
        HttpStatus.UNAUTHORIZED,
      );
    }
    return await Chat.destroy({
      where: {
        id: id,
      },
    })
      .then((chat) => {
        return chat;
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async getChatMessages(id: number) {
    return await this.getChatById(id);
  }

  async getChatMessageById(id: number) {
    return await Chat.findOne({
      where: {
        id: id,
      },
      include: { all: true },
    })
      .then((chat) => {
        return chat;
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async getChatBetweenUsers(
    senderId: number,
    receiverId: number,
    transactionId: number,
  ) {
    const chats1 = await Chat.findAll({
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
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    const chats2 = await Chat.findAll({
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
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    const joinedChats = chats1.concat(chats2);
    return joinedChats.sort(
      (a: Chat, b: Chat) => a.createdAt.getTime() - b.createdAt.getTime(),
    );
  }

  async getUnreadChats(user: JwtPayload, transactionId: number) {
    return await Chat.findAll({
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
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async getChats() {
    return await Chat.findAll({ include: { all: true } })
      .then((chat) => {
        return chat;
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async getUnreadChatsWithUserByUserId(
    senderId: number,
    receiverId: number,
    transactionId: number,
  ) {
    return await Chat.findAll({
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
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
