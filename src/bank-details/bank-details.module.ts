import { Module } from "@nestjs/common";
import { BankDetailsController } from "./bank-details.controller";
import { BankDetailsService } from "./bank-details.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModules } from "../config/config/configModules";
import { ConfigModule } from "@nestjs/config";
import { MessageSenderModule } from "../message-sender/message-sender.module";

@Module({
  imports: [JwtModule, ConfigModules, ConfigModule, MessageSenderModule],
  controllers: [BankDetailsController],
  providers: [BankDetailsService],
})
export class BankDetailsModule {}
