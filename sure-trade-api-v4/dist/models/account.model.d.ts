import { Model } from "sequelize-typescript";
export declare class Account extends Model<Account> {
    id: number;
    name: string;
    currency: number;
    amount: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}
