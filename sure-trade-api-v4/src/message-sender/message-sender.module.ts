import { Module } from "@nestjs/common";
import { MessageSenderService } from "./message-sender.service";
import { RabbitmqConfigModule } from "../config/rabbitmq/rabbitmq-config.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [RabbitmqConfigModule, ConfigModule],
  providers: [MessageSenderService],
  exports: [MessageSenderService],
})
export class MessageSenderModule {}
