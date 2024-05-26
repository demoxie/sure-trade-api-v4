import { Model } from "sequelize-typescript";
export declare class Referral extends Model<Referral> {
    id: number;
    referrer: number;
    referee: number;
    referralCode: string;
    referralLink: string;
    referralType: string;
    referralValue: number;
    expiryDate: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
