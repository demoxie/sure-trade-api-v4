import { Model } from "sequelize-typescript";
export declare class CryptoCoin extends Model<CryptoCoin> {
    id: number;
    name: string;
    symbol: string;
    marketPrice: number;
    price: number;
    quantity: number;
    margin: number;
    discount: number;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}
