import { Model } from "sequelize-typescript";
export declare class Transaction extends Model<Transaction> {
    id: number;
    userId: number;
    merchantId: number;
    rateId: number;
    assetName: string;
    currency: string;
    amount: number;
    unitPrice: number;
    quantity: number;
    transactionFee: number;
    transactionType: string;
    productName: string;
    paymentMethod: string;
    bankDetailsId: number;
    walletAddressId: number;
    userTransactionHash: string;
    merchantTransactionHash: string;
    discount: number;
    type: string;
    status: string;
    description: string;
    screenshots: any;
    referenceNo: string;
    createdAt: Date;
    updatedAt: Date;
}
