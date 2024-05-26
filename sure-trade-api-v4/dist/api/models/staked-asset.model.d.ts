import { Model } from "sequelize-typescript";
import { StakedAssetStatus } from "../../enums/enum";
export declare class StakedAsset extends Model<StakedAsset> {
    id: number;
    userId: number;
    tierId: number;
    adminId: number;
    transactionHashId: string;
    userWalletAddress: string;
    adminWalletAddress: string;
    currency: string;
    amount: number;
    balance: number;
    previousBalance: number;
    status: StakedAssetStatus;
    createdAt: Date;
    updatedAt: Date;
}
