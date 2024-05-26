import { GiftCardTransactionService } from "./gift-card-transaction.service";
import { TransactionStatus } from "../../enums/enum";
import { AcceptRejectTransactionDTO, GiftCardTransactionDTO, JwtPayload, PageRequest } from "../../dto";
import { Request } from "express";
import { GiftCardTransaction } from "../../models/gift-card-transaction.model";
export declare class GiftCardTransactionsController {
    private readonly giftCardTransaction;
    constructor(giftCardTransaction: GiftCardTransactionService);
    getTransactions(): Promise<GiftCardTransaction[]>;
    addTransaction(body: GiftCardTransactionDTO, req: Request): Promise<{
        transaction: GiftCardTransaction;
    }>;
    getTransactionById(id: number, pagination: PageRequest): Promise<GiftCardTransaction>;
    getAllMyTransactions(pagination: PageRequest, req: Request): Promise<{
        transactions: GiftCardTransaction[];
        pagination: {
            totalItems: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
            isLastPage: boolean;
        };
        profile: JwtPayload;
    }>;
    getAllMyPendingTransactions(pagination: PageRequest, req: Request): Promise<{
        transactions: GiftCardTransaction[];
        pagination: {
            totalItems: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
            isLastPage: boolean;
        };
        profile: JwtPayload;
    }>;
    getAllMyDeclinedTransactions(pagination: PageRequest, req: Request): Promise<{
        transactions: GiftCardTransaction[];
        pagination: {
            totalItems: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
            isLastPage: boolean;
        };
        profile: JwtPayload;
    }>;
    getAllMyTransactionsWithOthers(pagination: PageRequest, req: Request): Promise<{
        transactions: GiftCardTransaction[];
        pagination: {
            totalItems: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
            isLastPage: boolean;
        };
    }>;
    getTransactionsByStatus(status: TransactionStatus, pagination: PageRequest, req: Request): Promise<{
        transactions: GiftCardTransaction[];
        pagination: {
            totalItems: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
            isLastPage: boolean;
        };
        profile: JwtPayload;
    }>;
    acceptOrRejectTransaction(transactionId: number, body: AcceptRejectTransactionDTO, req: Request): Promise<"Transaction accepted successfully" | "Transaction declined successfully">;
}
