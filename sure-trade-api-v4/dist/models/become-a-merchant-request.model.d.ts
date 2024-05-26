import { Model } from "sequelize-typescript";
import { BecomeAMerchantRequestStatus } from "../enums/enum";
export declare class BecomeMerchantRequests extends Model<BecomeMerchantRequests> {
    id: number;
    userId: number;
    userWalletAddress: string;
    transactionHashId: string;
    amount: number;
    currency: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    username: string;
    country: string;
    status: BecomeAMerchantRequestStatus;
    createdAt: Date;
    updatedAt: Date;
}
