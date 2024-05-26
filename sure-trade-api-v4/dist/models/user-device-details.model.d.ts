import { Model } from "sequelize-typescript";
export declare class UserDeviceDetails extends Model<UserDeviceDetails> {
    id: number;
    userId: number;
    role: string;
    deviceToken: string;
    ip: string;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}
