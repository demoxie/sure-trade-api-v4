import { User } from "../user.model";
import { GiftCardRate } from "../gift-card-rate.model";
import { BecomeMerchantRequests } from "../become-a-merchant-request.model";
import { GiftCardTransaction } from "../gift-card-transaction.model";
import { GiftCard } from "../gift-card.model";
export declare const userProviders: {
    provide: string;
    useValue: typeof User;
}[];
export declare const giftCardRateProvider: {
    provide: string;
    useValue: typeof GiftCardRate;
}[];
export declare const giftCardProvider: {
    provide: string;
    useValue: typeof GiftCard;
}[];
export declare const becomeMerchantRequestProvider: {
    provide: string;
    useValue: typeof BecomeMerchantRequests;
}[];
export declare const giftCardTransactionProvider: {
    provide: string;
    useValue: typeof GiftCardTransaction;
}[];
