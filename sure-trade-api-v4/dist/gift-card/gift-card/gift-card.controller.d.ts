import { GiftCardDTO, GiftCardsResponse, SearchGiftCardQueryParams, SupportedGiftCard } from "../../dto";
import { GiftCardService } from "./gift-card.service";
import { Request } from "express";
export declare class GiftCardController {
    private readonly giftCardService;
    constructor(giftCardService: GiftCardService);
    getGiftCards(): Promise<{
        data: import("../../models/gift-card.model").GiftCard[];
        message: string;
    }>;
    getAllMyGiftCards(req: Request): Promise<GiftCardsResponse>;
    getGiftCardById(id: number): Promise<{
        data: import("../../models/gift-card.model").GiftCard;
        message: string;
    }>;
    getGiftCardByCardCode(cardCode: string): Promise<{
        data: import("../../models/gift-card.model").GiftCard;
        message: string;
    }>;
    getGiftCardsByUserId(userId: number): Promise<{
        data: import("../../models/gift-card.model").GiftCard[];
        message: string;
    }>;
    getGiftCardsByStatus(status: string): Promise<{
        data: import("../../models/gift-card.model").GiftCard[];
        message: string;
    }>;
    getGiftCardByStatus(status: string): Promise<{
        data: Promise<import("../../models/gift-card.model").GiftCard[]>;
        message: string;
    }>;
    getGiftCardsByType(type: string): Promise<{
        data: import("../../models/gift-card.model").GiftCard[];
        message: string;
    }>;
    createGiftCard(body: GiftCardDTO, req: Request): Promise<{
        data: import("../../models/gift-card.model").GiftCard;
        message: string;
    }>;
    searchGiftCards(query: SearchGiftCardQueryParams): Promise<{
        data: {
            id: string;
            name: string;
            image: string;
            currency: string[];
        }[];
        message: string;
    }>;
    updateGiftCardById(id: number, body: GiftCardDTO): Promise<{
        data: import("../../models/gift-card.model").GiftCard;
        message: string;
    }>;
    updateMyGiftCardById(id: number, body: GiftCardDTO, req: Request): Promise<{
        data: import("../../models/gift-card.model").GiftCard;
        message: string;
    }>;
    uploadGiftCardScreenshots(id: number, body: GiftCardDTO): Promise<{
        data: Promise<import("../../models/gift-card.model").GiftCard>;
        message: string;
    }>;
    deleteGiftCard(id: number): Promise<{
        data: number;
        message: string;
    }>;
    getSupportedGiftCards(): Promise<{
        data: SupportedGiftCard[];
        message: string;
    }>;
}
