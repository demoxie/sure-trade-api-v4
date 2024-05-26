import { Model } from "sequelize-typescript";
export declare class Advert extends Model<Advert> {
    id: number;
    title: string;
    description: string;
    imageUrls: string;
    url: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
