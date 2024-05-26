import { Model } from "sequelize-typescript";
import { User } from "./user.model";
import { GiftCard } from "./gift-card.model";
export declare class Chat extends Model<Chat> {
    id: number;
    senderId: number;
    receiverId: number;
    transactionId: number;
    giftCardId: number;
    cryptoCoinId: number;
    giftCard: GiftCard;
    sender: User;
    receiver: User;
    assetName: string;
    message: string;
    screenshots: any;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}
