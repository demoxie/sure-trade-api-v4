import { Module } from "@nestjs/common";
import { DatabaseModule } from "./config/database/database.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModules } from "./config/config/configModules";
import { ApiModule } from "./user/api.module";
import { RabbitmqConfigModule } from "./config/rabbitmq/rabbitmq-config.module";
import { UtilModule } from "./util/util.module";
import { MessageSenderModule } from "./message-sender/message-sender.module";
import { GiftCardTransactionModule } from "./gift-card/gift-card-transaction.module";
import { BankDetailsModule } from "./bank-details/bank-details.module";
import { GiftCardRateModule } from "./gift-card-rate/gift-card-rate.module";
import { HttpExceptionFilter } from "./exception/HttpExceptionFilter";
import {APP_FILTER, APP_INTERCEPTOR} from "@nestjs/core";
import { ChatModule } from "./chat/chat.module";

// import { MinioModule } from './config/minio/minio/minio.module';
import { AdminModule } from './admin/admin.module';
import { StakedAssetModule } from './staked-asset/staked-asset.module';
import { SocialsModule } from './socials/socials.module';

@Module({
  imports: [
    AuthModule,
    ConfigModules,
    DatabaseModule,
    RabbitmqConfigModule,
    ApiModule,
    UtilModule,
    MessageSenderModule,
    GiftCardTransactionModule,
    BankDetailsModule,
    GiftCardRateModule,
    ChatModule,
    AdminModule,
    StakedAssetModule,
    SocialsModule,
    // MinioModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
