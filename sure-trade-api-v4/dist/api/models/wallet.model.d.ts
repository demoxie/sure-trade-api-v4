import { Model } from "sequelize-typescript";
export declare class Wallet extends Model<Wallet> {
    id: number;
    userId: number;
    address: string;
    balance: number;
    currency: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
