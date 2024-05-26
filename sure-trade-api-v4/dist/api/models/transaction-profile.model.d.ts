import { Model } from "sequelize-typescript";
export declare class TransactionProfile extends Model<TransactionProfile> {
    id: number;
    userId: number;
    transactionLimit: number;
    range: string;
    noOfStakings: {
        perDay: number;
        perMonth: number;
        perYear: number;
    };
    totalNoOfStakings: number;
    noOfTransactions: {
        perDay: number;
        perMonth: number;
        perYear: number;
    };
    totalTransactions: number;
    noOfCompletedTransactions: {
        perDay: number;
        perMonth: number;
        perYear: number;
    };
    totalNoOfCompletedTransactions: number;
    noOfCancelledTransactions: {
        perDay: number;
        perMonth: number;
        perYear: number;
    };
    totalNoOfCancelledTransactions: number;
    noOfFailedTransactions: {
        perDay: number;
        perMonth: number;
        perYear: number;
    };
    totalNoOfFailedTransactions: number;
    noOfPendingTransactions: {
        perDay: number;
        perMonth: number;
        perYear: number;
    };
    totalNoOfPendingTransactions: number;
}
