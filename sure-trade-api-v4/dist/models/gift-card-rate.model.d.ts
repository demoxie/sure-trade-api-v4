import { Model } from "sequelize-typescript";
import { User } from "./user.model";
import { BankDetails } from "./bank-details";
import { Wallet } from "./wallet.model";
export declare class GiftCardRate extends Model<GiftCardRate> {
    id: number;
    cardName: string;
    merchantId: number;
    currency: string;
    giftCardCurrency: string;
    giftCardType: string;
    transactionType: string;
    paymentMethod: string;
    bankDetailsId: number;
    walletAddressId: number;
    maxLimit: number;
    minLimit: number;
    rate: number;
    status: string;
    screenshots: any;
    merchant: User;
    bankDetails: BankDetails;
    wallet: Wallet;
    createdAt: Date;
    updatedAt: Date;
}
