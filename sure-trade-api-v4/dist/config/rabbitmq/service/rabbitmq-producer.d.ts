import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
export declare class RabbitmqProducer {
    private readonly amqpConnection;
    constructor(amqpConnection: AmqpConnection);
    sendMessage: (message: object, exchange: string, routingKey: string) => Promise<void>;
}
