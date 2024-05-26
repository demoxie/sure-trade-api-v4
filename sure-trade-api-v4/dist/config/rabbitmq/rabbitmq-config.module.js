"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitmqConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const rabbitmq_consumer_service_1 = require("./service/rabbitmq-consumer.service");
const rabbitmq_provider_1 = require("./service/rabbitmq.provider");
const rabbitmq_producer_1 = require("./service/rabbitmq-producer");
let RabbitmqConfigModule = class RabbitmqConfigModule {
};
exports.RabbitmqConfigModule = RabbitmqConfigModule;
exports.RabbitmqConfigModule = RabbitmqConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            nestjs_rabbitmq_1.RabbitMQModule.forRootAsync(nestjs_rabbitmq_1.RabbitMQModule, {
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    exchanges: [
                        { name: "email_exchange", type: "direct" },
                        { name: "sms_exchange", type: "direct" },
                        { name: "telegram_exchange", type: "direct" },
                        { name: "transaction_exchange", type: "direct" },
                        { name: "gift_card_exchange", type: "direct" },
                        { name: "notification_exchange", type: "direct" },
                    ],
                    queues: [
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
                    uri: `${configService.get("RABBITMQ_URL")}`,
                    enableControllerDiscovery: true,
                    enableDirectReplyTo: true,
                    name: "SURE_TRADE_QUEUES",
                    defaultRpcTimeout: 10000,
                    connectionInitOptions: { wait: false, timeout: 10000 },
                }),
                inject: [config_1.ConfigService],
            }),
            RabbitmqConfigModule,
        ],
        providers: [rabbitmq_consumer_service_1.RabbitmqConsumerService, rabbitmq_producer_1.RabbitmqProducer, ...rabbitmq_provider_1.rabbitmqProvider],
        exports: [rabbitmq_producer_1.RabbitmqProducer],
    })
], RabbitmqConfigModule);
//# sourceMappingURL=rabbitmq-config.module.js.map