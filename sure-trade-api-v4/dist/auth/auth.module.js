"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./service/auth.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const util_module_1 = require("../util/util.module");
const message_sender_module_1 = require("../message-sender/message-sender.module");
const rabbitmq_config_module_1 = require("../config/rabbitmq/rabbitmq-config.module");
const user_service_1 = require("../user/service/user.service");
const model_provider_1 = require("../models/repository/model.provider");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            util_module_1.UtilModule,
            message_sender_module_1.MessageSenderModule,
            rabbitmq_config_module_1.RabbitmqConfigModule,
            message_sender_module_1.MessageSenderModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: async (configService) => ({
                    global: true,
                    secret: configService.get("JWT_SECRET"),
                    signOptions: { expiresIn: configService.get("JWT_EXPIRATION_TIME") },
                    secretOrPrivateKey: configService.get("JWT_SECRET"),
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [
            auth_service_1.AuthService,
            user_service_1.UserService,
            ...model_provider_1.userProviders,
            ...model_provider_1.becomeMerchantRequestProvider,
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map