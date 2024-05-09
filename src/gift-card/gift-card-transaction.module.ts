import { Module } from "@nestjs/common";
import { GiftCardTransactionsController } from "./gift-card-trsanction/gift-card-transaction.controller";
import { GiftCardRateService } from "./gift-card-rate/gift-card-rate.service";
import { GiftCardService } from "./gift-card/gift-card.service";
import { GiftCardTransactionService } from "./gift-card-trsanction/gift-card-transaction.service";
import {
  giftCardProvider,
  giftCardRateProvider,
  giftCardTransactionProvider,
  userProviders,
} from "../api/models/repository/model.provider";
import { AuthModule } from "../auth/auth.module";
import { ConfigModules } from "../config/config/configModules";
import { DatabaseModule } from "../config/database/database.module";
import { RabbitmqConfigModule } from "../config/rabbitmq/rabbitmq-config.module";
import { JwtModule } from "@nestjs/jwt";
import { UtilModule } from "../util/util.module";
import { MessageSenderModule } from "../message-sender/message-sender.module";
import { GiftCardController } from "./gift-card/gift-card.controller";
import { GiftCardRateController } from './gift-card-rate/gift-card-rate.controller';

@Module({
  imports: [
    AuthModule,
    JwtModule,
    ConfigModules,
    DatabaseModule,
    RabbitmqConfigModule,
    UtilModule,
    MessageSenderModule,
  ],
  controllers: [GiftCardTransactionsController, GiftCardController, GiftCardRateController],
  providers: [
    GiftCardService,
    GiftCardRateService,
    GiftCardTransactionService,
    ...giftCardRateProvider,
    ...userProviders,
    ...giftCardTransactionProvider,
    ...giftCardProvider,
  ],
  exports: [GiftCardTransactionService, GiftCardRateService],
})
export class GiftCardTransactionModule {}
