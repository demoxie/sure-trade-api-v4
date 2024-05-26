import { GiftCardRateService } from "./gift-card-rate.service";
import { GiftCardRateDTO } from "../../dto";
import { Request } from "express";
export declare class GiftCardRateController {
    private readonly giftCardRateService;
    constructor(giftCardRateService: GiftCardRateService);
    addRate(rateDto: GiftCardRateDTO, req: Request): Promise<import("../../models/gift-card-rate.model").GiftCardRate>;
    getAllRates(): Promise<import("../../models/gift-card-rate.model").GiftCardRate[]>;
    getRatesByMerchantId(id: number): Promise<import("../../models/gift-card-rate.model").GiftCardRate[]>;
    getMyRates(req: Request): Promise<import("../../models/gift-card-rate.model").GiftCardRate[]>;
    getRatesByStatus(status: string): Promise<import("../../models/gift-card-rate.model").GiftCardRate[]>;
    getRateById(id: number): Promise<import("../../models/gift-card-rate.model").GiftCardRate>;
    updateRate(id: number, rateDto: GiftCardRateDTO): Promise<import("../../models/gift-card-rate.model").GiftCardRate>;
    deleteRate(id: number): Promise<number>;
}
