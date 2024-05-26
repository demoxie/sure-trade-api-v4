import { Injectable } from "@nestjs/common";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";

@Injectable()
export class RabbitmqProducer {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  public sendMessage = async (
    message: object,
    exchange: string,
    routingKey: string,
  ) => {
    await this.amqpConnection.publish<object>(exchange, routingKey, message);
  };
}
