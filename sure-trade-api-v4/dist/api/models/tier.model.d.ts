import { Model } from "sequelize-typescript";
export declare class Tier extends Model<Tier> {
    id: number;
    tierName: string;
    tierDescription: string;
    stakedAmountRange: string;
    noOfTransactions: {
        perDay: number;
        perMonth: number;
        perYear: number;
    };
    noOfReferrals: number;
    referralBonus: number;
    referralBonusType: string;
    referralBonusAmount: number;
    referralBonusPercentage: number;
}
