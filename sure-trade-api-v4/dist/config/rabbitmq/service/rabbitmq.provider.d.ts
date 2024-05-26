import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
export declare const rabbitmqProvider: {
    provide: string;
    useValue: typeof AmqpConnection;
}[];
