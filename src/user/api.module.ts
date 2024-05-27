import { Module } from "@nestjs/common";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { DatabaseModule } from "../config/database/database.module";
import { ConfigModules } from "../config/config/configModules";
import { ConfigService } from "@nestjs/config";

import { RabbitmqConfigModule } from "../config/rabbitmq/rabbitmq-config.module";
import { RedisCoreModule } from "../config/redis/redis.config";
import { AuthModule } from "../auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { UtilModule } from "../util/util.module";
import { MessageSenderModule } from "../message-sender/message-sender.module";
import { GiftCardTransactionModule } from "../gift-card/gift-card-transaction.module";
import {becomeMerchantRequestProvider, userProviders} from "../models/repository/model.provider";

@Module({
  imports: [
    ConfigModules,
    DatabaseModule,
    RabbitmqConfigModule,
    RedisCoreModule,
    AuthModule,
    UtilModule,
    MessageSenderModule,
    GiftCardTransactionModule,
  ],
  controllers: [UserController],
  providers: [
    ConfigService,
    UserService,
    JwtService,
    ...userProviders,
    ...becomeMerchantRequestProvider,
  ],
  exports: [UserService],
})
export class ApiModule {}
