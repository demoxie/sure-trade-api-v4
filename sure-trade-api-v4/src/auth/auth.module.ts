import { Module } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UtilModule } from "../util/util.module";
import { MessageSenderModule } from "../message-sender/message-sender.module";
import { RabbitmqConfigModule } from "../config/rabbitmq/rabbitmq-config.module";
import { UserService } from "../user/service/user.service";
import {
  becomeMerchantRequestProvider,
  userProviders,
} from "../models/repository/model.provider";

@Module({
  imports: [
    ConfigModule,
    UtilModule,
    MessageSenderModule,
    RabbitmqConfigModule,
    MessageSenderModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: configService.get("JWT_EXPIRATION_TIME") },
        secretOrPrivateKey: configService.get("JWT_SECRET"),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    UserService,
    ...userProviders,
    ...becomeMerchantRequestProvider,
  ],
  exports: [AuthService],
})
export class AuthModule {}
