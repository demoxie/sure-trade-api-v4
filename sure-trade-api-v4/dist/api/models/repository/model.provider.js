"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.giftCardTransactionProvider = exports.becomeMerchantRequestProvider = exports.giftCardProvider = exports.giftCardRateProvider = exports.userProviders = void 0;
const user_model_1 = require("../user.model");
const gift_card_rate_model_1 = require("../gift-card-rate.model");
const become_a_merchant_request_model_1 = require("../become-a-merchant-request.model");
const gift_card_transaction_model_1 = require("../gift-card-transaction.model");
const gift_card_model_1 = require("../gift-card.model");
exports.userProviders = [
    {
        provide: "USER_REPOSITORY",
        useValue: user_model_1.User,
    },
];
exports.giftCardRateProvider = [
    {
        provide: "GIFT_CARD_RATE_REPOSITORY",
        useValue: gift_card_rate_model_1.GiftCardRate,
    },
];
exports.giftCardProvider = [
    {
        provide: "GIFT_CARD_REPOSITORY",
        useValue: gift_card_model_1.GiftCard,
    },
];
exports.becomeMerchantRequestProvider = [
    {
        provide: "BECOME_MERCHANT_REQUEST_REPOSITORY",
        useValue: become_a_merchant_request_model_1.BecomeMerchantRequests,
    },
];
exports.giftCardTransactionProvider = [
    {
        provide: "GIFT_CARD_TRANSACTION_REPOSITORY",
        useValue: gift_card_transaction_model_1.GiftCardTransaction,
    },
];
//# sourceMappingURL=model.provider.js.map