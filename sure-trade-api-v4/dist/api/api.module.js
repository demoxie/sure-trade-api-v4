"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./controller/user.controller");
const user_service_1 = require("./service/user.service");
const database_module_1 = require("../config/database/database.module");
const configModules_1 = require("../config/config/configModules");
const config_1 = require("@nestjs/config");
const model_provider_1 = require("./models/repository/model.provider");
const rabbitmq_config_module_1 = require("../config/rabbitmq/rabbitmq-config.module");
const redis_config_1 = require("../config/redis/redis.config");
const auth_module_1 = require("../auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const util_module_1 = require("../util/util.module");
const message_sender_module_1 = require("../message-sender/message-sender.module");
const gift_card_transaction_module_1 = require("../gift-card/gift-card-transaction.module");
let ApiModule = class ApiModule {
};
exports.ApiModule = ApiModule;
exports.ApiModule = ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            configModules_1.ConfigModules,
            database_module_1.DatabaseModule,
            rabbitmq_config_module_1.RabbitmqConfigModule,
            redis_config_1.RedisCoreModule,
            auth_module_1.AuthModule,
            util_module_1.UtilModule,
            message_sender_module_1.MessageSenderModule,
            gift_card_transaction_module_1.GiftCardTransactionModule,
        ],
        controllers: [user_controller_1.UserController],
        providers: [
            config_1.ConfigService,
            user_service_1.UserService,
            jwt_1.JwtService,
            ...model_provider_1.userProviders,
            ...model_provider_1.becomeMerchantRequestProvider,
        ],
        exports: [user_service_1.UserService],
    })
], ApiModule);
//# sourceMappingURL=api.module.js.map