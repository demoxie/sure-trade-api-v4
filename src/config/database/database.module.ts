import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Tier } from "../../api/models/tier.model";
import { TransactionProfile } from "../../api/models/transaction-profile.model";
import { User } from "../../api/models/user.model";
import { UserDeviceDetails } from "../../api/models/user-device-details.model";
import { BankDetails } from "../../api/models/bank-details";
import { Wallet } from "../../api/models/wallet.model";
import { GiftCard } from "../../api/models/gift-card.model";
import { GiftCardRate } from "../../api/models/gift-card-rate.model";
import { Rating } from "../../api/models/rating.model";
import { Rate } from "../../api/models/rate.model";
import { StakedAsset } from "../../api/models/staked-asset.model";
import { Referral } from "../../api/models/referral.model";
import { StakeWithdrawalRequest } from "../../api/models/staked-asset-wthdrawal-request.model";
import { BecomeMerchantRequests } from "../../api/models/become-a-merchant-request.model";
import { Account } from "../../api/models/account.model";
import { Advert } from "../../api/models/advert.model";
import { CryptoCoin } from "../../api/models/crypto-coin.model";
import { Currency } from "../../api/models/currency.model";
import { News } from "../../api/models/news.model";
import { GiftCardTransaction } from "../../api/models/gift-card-transaction.model";
import { Chat } from "../../api/models/chat.mode";
import { Transaction } from "../../api/models/transaction.model";
import { Payment } from "../../api/models/payment.model";

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
