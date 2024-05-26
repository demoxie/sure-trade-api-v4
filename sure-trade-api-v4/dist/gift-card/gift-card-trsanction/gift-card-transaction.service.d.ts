import { GiftCardRate } from "../../models/gift-card-rate.model";
import { GiftCardTransaction } from "../../models/gift-card-transaction.model";
import { AcceptRejectTransactionDTO, GiftCardTransactionDTO, JwtPayload, PageRequest } from "../../dto";
import { TransactionStatus } from "../../enums/enum";
import { ConfigService } from "@nestjs/config";
import { UtilService } from "../../util/util.service";
import { User } from "../../models/user.model";
import { GiftCard } from "../../models/gift-card.model";
import { MessageSenderService } from "../../message-sender/message-sender.service";
export declare class GiftCardTransactionService {
    private giftCardRate;
    private giftCardTransaction;
    private giftCard;
    private userRepository;
    private readonly configService;
    private readonly utilService;
    private readonly messageSender;
    constructor(giftCardRate: typeof GiftCardRate, giftCardTransaction: typeof GiftCardTransaction, giftCard: typeof GiftCard, userRepository: typeof User, configService: ConfigService, utilService: UtilService, messageSender: MessageSenderService);
    getAllTransactions(): Promise<GiftCardTransaction[]>;
    addTransaction: (jwtUser: JwtPayload, dto: GiftCardTransactionDTO) => Promise<{
        transaction: GiftCardTransaction;
    }>;
    sellGiftCard: (user: User, transaction: GiftCardTransactionDTO) => Promise<{
        transaction: GiftCardTransaction;
    }>;
    getTransactionById: (id: number) => Promise<GiftCardTransaction>;
    getAllMyTransactionsWithOthers: (user: JwtPayload, pageRequest: PageRequest) => Promise<{
        transactions: GiftCardTransaction[];
        pagination: {
            totalItems: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
            isLastPage: boolean;
        };
    }>;
    getAllMyTransactionsAsLoggedInUser: (user: JwtPayload, pageRequest: PageRequest) => Promise<{
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
    getTransactionsByStatus: (status: TransactionStatus, user: JwtPayload, pageRequest: PageRequest) => Promise<{
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
    getAllMyPendingTransactions: (user: JwtPayload, pageRequest: PageRequest) => Promise<{
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
    getAllMyDeclinedTransactions: (user: JwtPayload, pageRequest: PageRequest) => Promise<{
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
    acceptOrRejectTransactionById: (transactionId: number, user: JwtPayload, payload: AcceptRejectTransactionDTO) => Promise<"Transaction accepted successfully" | "Transaction declined successfully">;
}
