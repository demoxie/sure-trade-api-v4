"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSenderModule = void 0;
const common_1 = require("@nestjs/common");
const message_sender_service_1 = require("./message-sender.service");
const rabbitmq_config_module_1 = require("../config/rabbitmq/rabbitmq-config.module");
const config_1 = require("@nestjs/config");
let MessageSenderModule = class MessageSenderModule {
};
exports.MessageSenderModule = MessageSenderModule;
exports.MessageSenderModule = MessageSenderModule = __decorate([
    (0, common_1.Module)({
        imports: [rabbitmq_config_module_1.RabbitmqConfigModule, config_1.ConfigModule],
        providers: [message_sender_service_1.MessageSenderService],
        exports: [message_sender_service_1.MessageSenderService],
    })
], MessageSenderModule);
//# sourceMappingURL=message-sender.module.js.map