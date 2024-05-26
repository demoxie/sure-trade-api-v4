import { Model } from "sequelize-typescript";
export declare class Rate extends Model<Rate> {
    id: number;
    merchantId: number;
    transactionType: string;
    maxLimit: number;
    minLimit: number;
    currency: string;
    assetName: string;
    rate: number;
    sellRate: number;
    buyRate: number;
    margin: number;
    standardRate: number;
    productName: string;
    discount: number;
    paymentMethod: string;
    bankDetailsId: number;
    walletAddressId: number;
    createdAt: Date;
    updatedAt: Date;
}
