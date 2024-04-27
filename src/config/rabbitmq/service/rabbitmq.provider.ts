import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";

export const rabbitmqProvider = [
  {
    provide: "RABBITMQ_CONNECTION_PROVIDER",
    useValue: AmqpConnection,
  },
];
