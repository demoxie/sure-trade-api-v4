import { Model } from "sequelize-typescript";
import { User } from "./user.model";
import { CardStatus } from "../enums/enum";
export declare class GiftCard extends Model<GiftCard> {
    id: number;
    userId: number;
    user: User;
    cardCode: string;
    cardPin: string;
    cardType: string;
    cardIssuer: string;
    currency: string;
    amount: number;
    quantity: number;
    cardValue: number;
    discount: number;
    expiryDate: Date;
    status: CardStatus;
    screenshots: any;
    createdAt: Date;
    updatedAt: Date;
}
