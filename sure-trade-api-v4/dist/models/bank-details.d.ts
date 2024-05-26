import { User } from "./user.model";
import { Model } from "sequelize-typescript";
export declare class BankDetails extends Model<BankDetails> {
    id: number;
    bankName: string;
    accountName: string;
    accountNumber: string;
    currency: string;
    accountType: string;
    bankCode: string;
    bankCountry: string;
    userId: number;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
