import { Model } from "sequelize-typescript";
export declare class Currency extends Model<Currency> {
    id: number;
    name: string;
    symbol: string;
    currencyType: string;
    createdAt: Date;
    updatedAt: Date;
}
