import { Model } from "sequelize-typescript";
export declare class Rating extends Model<Rating> {
    id: number;
    rating: number;
    comment: string;
    userId: number;
    raterId: number;
    createdAt: Date;
    updatedAt: Date;
}
