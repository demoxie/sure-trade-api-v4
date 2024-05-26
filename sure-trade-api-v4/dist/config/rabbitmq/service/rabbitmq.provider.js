"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitmqProvider = void 0;
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
exports.rabbitmqProvider = [
    {
        provide: "RABBITMQ_CONNECTION_PROVIDER",
        useValue: nestjs_rabbitmq_1.AmqpConnection,
    },
];
//# sourceMappingURL=rabbitmq.provider.js.map