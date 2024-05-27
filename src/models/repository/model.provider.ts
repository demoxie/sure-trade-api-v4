import { User } from "../user.model";
import { GiftCardRate } from "../gift-card-rate.model";
import { BecomeMerchantRequests } from "../become-a-merchant-request.model";
import { GiftCardTransaction } from "../gift-card-transaction.model";
import { GiftCard } from "../gift-card.model";

export const userProviders = [
  {
    provide: "USER_REPOSITORY",
    useValue: User,
  },
];

export const giftCardRateProvider = [
  {
    provide: "GIFT_CARD_RATE_REPOSITORY",
    useValue: GiftCardRate,
  },
];

export const giftCardProvider = [
  {
    provide: "GIFT_CARD_REPOSITORY",
    useValue: GiftCard,
  },
];

export const becomeMerchantRequestProvider = [
  {
    provide: "BECOME_MERCHANT_REQUEST_REPOSITORY",
    useValue: BecomeMerchantRequests,
  },
];

export const giftCardTransactionProvider = [
  {
    provide: "GIFT_CARD_TRANSACTION_REPOSITORY",
    useValue: GiftCardTransaction,
  },
];
