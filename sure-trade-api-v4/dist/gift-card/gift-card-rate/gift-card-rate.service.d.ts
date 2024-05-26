import { GiftCardRate } from "../../models/gift-card-rate.model";
import { User } from "../../models/user.model";
import { GiftCardRateDTO } from "../../dto";
export declare class GiftCardRateService {
    private giftCardRate;
    private userRepository;
    constructor(giftCardRate: typeof GiftCardRate, userRepository: typeof User);
    addRate: (merchantId: number, rate: GiftCardRateDTO) => Promise<GiftCardRate>;
    getRateById: (id: number) => Promise<GiftCardRate>;
    getAllRates: () => Promise<GiftCardRate[]>;
    updateRate: (id: number, rate: GiftCardRateDTO) => Promise<GiftCardRate>;
    deleteRate: (id: number) => Promise<number>;
    getRatesByMerchantId: (merchantId: number) => Promise<GiftCardRate[]>;
    getRatesByFromCurrency: (fromCurrency: string) => Promise<GiftCardRate[]>;
    getRatesByToCurrency: (toCurrency: string) => Promise<GiftCardRate[]>;
    getRatesByStatus: (status: string) => Promise<GiftCardRate[]>;
    getMyRates: (userId: number) => Promise<GiftCardRate[]>;
}
