import { Injectable } from "@nestjs/common";
import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";

@Injectable()
export class RabbitmqConsumerService {
  // @RabbitSubscribe({
  //   exchange: "email_exchange",
  //   name: "email_queue",
  //   routingKey: "email_routing_key",
  // })
  // public async handleMessage1(message: any) {
  //   console.log("Received message from queue1:", message);
  //   // Process the message here
  // }

  @RabbitSubscribe({
    exchange: "sms_exchange",
    name: "sms_queue",
    routingKey: "sms_routing_key",
  })
  public async handleMessage2(message: any) {
    console.log("Received message from queue2:", message);
    // Process the message here
  }

  // @RabbitSubscribe({
  //   exchange: "telegram_exchange",
  //   name: "telegram_queue",
  //   routingKey: "telegram_routing_key",
  // })
  // public async handleMessage3(message: any) {
  //   console.log("Received message from queue3:", message);
  //   // Process the message here
  // }

  @RabbitSubscribe({
    exchange: "transaction_exchange",
    name: "transaction_queue",
    routingKey: "transaction_routing_key",
  })
  public async handleMessage4(message: any) {
    console.log("Received message from queue4:", message);
    // Process the message here
  }

  @RabbitSubscribe({
    exchange: "gift_card_exchange",
    name: "gift_card_queue",
    routingKey: "giftcard_routing_key",
  })
  public async handleMessage5(message: any) {
    console.log("Received message from queue5:", message);
    // Process the message here
  }

  @RabbitSubscribe({
    exchange: "notification_exchange",
    name: "notification_queue",
    routingKey: "notification_routing_key",
  })
  public async handleMessage6(message: any) {
    console.log("Received message from queue6:", message);
    // Process the message here
  }
}
