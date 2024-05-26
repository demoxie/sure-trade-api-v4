"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const tier_model_1 = require("../../models/tier.model");
const transaction_profile_model_1 = require("../../models/transaction-profile.model");
const user_model_1 = require("../../models/user.model");
const user_device_details_model_1 = require("../../models/user-device-details.model");
const bank_details_1 = require("../../models/bank-details");
const wallet_model_1 = require("../../models/wallet.model");
const gift_card_model_1 = require("../../models/gift-card.model");
const gift_card_rate_model_1 = require("../../models/gift-card-rate.model");
const rating_model_1 = require("../../models/rating.model");
const rate_model_1 = require("../../models/rate.model");
const staked_asset_model_1 = require("../../models/staked-asset.model");
const referral_model_1 = require("../../models/referral.model");
const staked_asset_wthdrawal_request_model_1 = require("../../models/staked-asset-wthdrawal-request.model");
const become_a_merchant_request_model_1 = require("../../models/become-a-merchant-request.model");
const account_model_1 = require("../../models/account.model");
const advert_model_1 = require("../../models/advert.model");
const crypto_coin_model_1 = require("../../models/crypto-coin.model");
const currency_model_1 = require("../../models/currency.model");
const news_model_1 = require("../../models/news.model");
const gift_card_transaction_model_1 = require("../../models/gift-card-transaction.model");
const chat_mode_1 = require("../../models/chat.mode");
const transaction_model_1 = require("../../models/transaction.model");
const payment_model_1 = require("../../models/payment.model");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            sequelize_1.SequelizeModule.forRootAsync({
                useFactory: async (configService) => ({
                    dialect: configService.get("DB_DIALECT"),
                    dialectOptions: {
                        ssl: {
                            rejectUnauthorized: false,
                            require: configService.get("DB_SSL_REQUIRE"),
                        },
                    },
                    pool: {
                        max: parseInt(configService.get("DB_POOL_MAX")),
                        min: parseInt(configService.get("DB_POOL_MIN")),
                        acquire: parseInt(configService.get("DB_POOL_ACQUIRE")),
                        idle: parseInt(configService.get("DB_POOL_IDLE")),
                    },
                    host: configService.get("DB_HOST"),
                    port: configService.get("DB_PORT"),
                    username: configService.get("DB_USERNAME"),
                    password: configService.get("DB_PASSWORD"),
                    database: configService.get("DB_NAME"),
                    autoLoadModels: true,
                    synchronize: false,
                    logging: console.log,
                    models: [
                        tier_model_1.Tier,
                        transaction_profile_model_1.TransactionProfile,
                        user_model_1.User,
                        user_device_details_model_1.UserDeviceDetails,
                        bank_details_1.BankDetails,
                        wallet_model_1.Wallet,
                        gift_card_model_1.GiftCard,
                        gift_card_rate_model_1.GiftCardRate,
                        rating_model_1.Rating,
                        rate_model_1.Rate,
                        staked_asset_model_1.StakedAsset,
                        referral_model_1.Referral,
                        staked_asset_wthdrawal_request_model_1.StakeWithdrawalRequest,
                        become_a_merchant_request_model_1.BecomeMerchantRequests,
                        account_model_1.Account,
                        advert_model_1.Advert,
                        crypto_coin_model_1.CryptoCoin,
                        currency_model_1.Currency,
                        account_model_1.Account,
                        news_model_1.News,
                        gift_card_transaction_model_1.GiftCardTransaction,
                        chat_mode_1.Chat,
                        transaction_model_1.Transaction,
                        payment_model_1.Payment,
                    ],
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map