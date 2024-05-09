import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { RabbitmqConsumerService } from "./service/rabbitmq-consumer.service";
import { rabbitmqProvider } from "./service/rabbitmq.provider";
import { RabbitmqProducer } from "./service/rabbitmq-producer";

@Module({
  imports: [
    ConfigModule.forRoot(),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        exchanges: [
          { name: "email_exchange", type: "direct" },
          { name: "sms_exchange", type: "direct" },
          { name: "telegram_exchange", type: "direct" },
          { name: "transaction_exchange", type: "direct" },
          { name: "gift_card_exchange", type: "direct" },
          { name: "notification_exchange", type: "direct" },
        ],
        queues: [
          // {
          //   exchange: "email_exchange",
          //   name: "email_queue",
          //   routingKey: "email_routing_key",
          //   createQueueIfNotExists: false,
          //   options: {
          //     durable: true,
          //   },
          // },
          // {
          //   exchange: "sms_exchange",
          //   name: "sms_queue",
          //   routingKey: "sms_routing_key",
          //   createQueueIfNotExists: false,
          // },
          // {
          //   exchange: "telegram_exchange",
          //   name: "telegram_queue",
          //   routingKey: "telegram_routing_key",
          //   createQueueIfNotExists: false,
          // },
          // {
          //   exchange: "transaction_exchange",
          //   name: "transaction_queue",
          //   routingKey: "transaction_routing_key",
          //   createQueueIfNotExists: false,
          // },
          // {
          //   exchange: "gift_card_exchange",
          //   name: "gift_card_queue",
          //   routingKey: "giftcard_routing_key",
          //   createQueueIfNotExists: false,
          // },
          {
            exchange: "notification_exchange",
            name: "notification_queue",
            routingKey: "notification_routing_key",
            createQueueIfNotExists: true,
            options: {
              durable: true,
            },
          },
        ],
        uri: `${configService.get<string>("RABBITMQ_URL")}`,
        enableControllerDiscovery: true,
        enableDirectReplyTo: true,
        name: "SURE_TRADE_QUEUES",
        defaultRpcTimeout: 10000,
        connectionInitOptions: { wait: false, timeout: 10000 },
      }),
      inject: [ConfigService],
    }),
    RabbitmqConfigModule,
  ],
  providers: [RabbitmqConsumerService, RabbitmqProducer, ...rabbitmqProvider],
  exports: [RabbitmqProducer],
})
export class RabbitmqConfigModule {}
