import { ChatService } from "./chat.service";
import { ChatDTO } from "../dto";
import { Request } from "express";
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getChats(): Promise<import("../models/chat.mode").Chat[]>;
    getChatById(id: number): Promise<import("../models/chat.mode").Chat>;
    getChatByUserId(userId: number, transactionId: number): Promise<import("../models/chat.mode").Chat[]>;
    createChat(chatDto: ChatDTO, req: Request): Promise<import("../models/chat.mode").Chat>;
    updateChatById(id: number, chatDto: ChatDTO, req: Request): Promise<[affectedCount: number]>;
    deleteChat(id: number, req: Request): Promise<number>;
    getChatBetweenUsers(receiverId: number, transactionId: number, req: Request): Promise<import("../models/chat.mode").Chat[]>;
    getUnreadChats(transactionId: number, req: Request): Promise<import("../models/chat.mode").Chat[]>;
    getUnreadChatsWithUserByUserId(userId: number, transactionId: number, req: Request): Promise<import("../models/chat.mode").Chat[]>;
}
