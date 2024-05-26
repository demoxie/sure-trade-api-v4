import { Model } from "sequelize-typescript";
export declare class News extends Model<News> {
    id: number;
    title: string;
    subTitle: string;
    content: string;
    subContent: string;
    images: any;
    video: any;
    userId: number;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}
