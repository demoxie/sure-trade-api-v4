import { Model } from "sequelize-typescript";
export declare class StakeWithdrawalRequest extends Model<StakeWithdrawalRequest> {
    id: number;
    userId: number;
    paymentMethod: string;
    bankDetailsId: number;
    walletAddressId: number;
    stakedAssetId: number;
    paymentCurrency: string;
    amount: number;
    reasonForWithdrawal: string;
    withdrawalFee: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
