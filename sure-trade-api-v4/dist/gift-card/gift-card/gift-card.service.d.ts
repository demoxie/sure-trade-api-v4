import { GiftCardDTO, GiftCardVO, JwtPayload, SearchGiftCardQueryParams, SupportedGiftCard } from "../../dto";
import { GiftCard } from "../../models/gift-card.model";
export declare class GiftCardService {
    getGiftCards: () => Promise<GiftCard[]>;
    getAllMyGiftCards(jwtUser: JwtPayload): Promise<GiftCardVO[]>;
    getGiftCardById(id: number): Promise<GiftCard>;
    getGiftCardByCardCode(cardCode: string): Promise<GiftCard>;
    getGiftCardsByUserId(userId: number): Promise<GiftCard[]>;
    getGiftCardByStatus(status: string): Promise<GiftCard[]>;
    getGiftCardsByType(type: string): Promise<GiftCard[]>;
    createGiftCard(body: GiftCardDTO, jwtUser: JwtPayload): Promise<GiftCard>;
    updateGiftCardById(id: number, body: GiftCardDTO): Promise<GiftCard>;
    deleteGiftCard(id: number): Promise<number>;
    uploadGiftCardScreenshots(id: number, body: GiftCardDTO): Promise<GiftCard>;
    getSupportedGiftCards(): SupportedGiftCard[];
    updateMyGiftCardById(id: number, jwtUser: JwtPayload, body: GiftCardDTO): Promise<GiftCard>;
    searchGiftCards: (searchParams: SearchGiftCardQueryParams) => Promise<{
        id: string;
        name: string;
        image: string;
        currency: string[];
    }[]>;
}
