import { Chat } from "../models/chat.mode";
import { ChatDTO, JwtPayload } from "../dto";
export declare class ChatService {
    createChat(user: JwtPayload, body: ChatDTO): Promise<Chat>;
    getChatById(id: number): Promise<Chat>;
    getChatByUserId(userId: number, transactionId: number): Promise<Chat[]>;
    updateChatById(id: number, user: JwtPayload, body: ChatDTO): Promise<[affectedCount: number]>;
    deleteChat(id: number, user: JwtPayload): Promise<number>;
    getChatMessages(id: number): Promise<Chat>;
    getChatMessageById(id: number): Promise<Chat>;
    getChatBetweenUsers(senderId: number, receiverId: number, transactionId: number): Promise<Chat[]>;
    getUnreadChats(user: JwtPayload, transactionId: number): Promise<Chat[]>;
    getChats(): Promise<Chat[]>;
    getUnreadChatsWithUserByUserId(senderId: number, receiverId: number, transactionId: number): Promise<Chat[]>;
}
