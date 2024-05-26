import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Tier } from "../../models/tier.model";
import { TransactionProfile } from "../../models/transaction-profile.model";
import { User } from "../../models/user.model";
import { UserDeviceDetails } from "../../models/user-device-details.model";
import { BankDetails } from "../../models/bank-details";
import { Wallet } from "../../models/wallet.model";
import { GiftCard } from "../../models/gift-card.model";
import { GiftCardRate } from "../../models/gift-card-rate.model";
import { Rating } from "../../models/rating.model";
import { Rate } from "../../models/rate.model";
import { StakedAsset } from "../../models/staked-asset.model";
import { Referral } from "../../models/referral.model";
import { StakeWithdrawalRequest } from "../../models/staked-asset-wthdrawal-request.model";
import { BecomeMerchantRequests } from "../../models/become-a-merchant-request.model";
import { Account } from "../../models/account.model";
import { Advert } from "../../models/advert.model";
import { CryptoCoin } from "../../models/crypto-coin.model";
import { Currency } from "../../models/currency.model";
import { News } from "../../models/news.model";
import { GiftCardTransaction } from "../../models/gift-card-transaction.model";
import { Chat } from "../../models/chat.mode";
import { Transaction } from "../../models/transaction.model";
import { Payment } from "../../models/payment.model";

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
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
          Tier,
          TransactionProfile,
          User,
          UserDeviceDetails,
          BankDetails,
          Wallet,
          GiftCard,
          GiftCardRate,
          Rating,
          Rate,
          StakedAsset,
          Referral,
          StakeWithdrawalRequest,
          BecomeMerchantRequests,
          Account,
          Advert,
          CryptoCoin,
          Currency,
          Account,
          News,
          GiftCardTransaction,
          Chat,
          Transaction,
          Payment,
        ],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
