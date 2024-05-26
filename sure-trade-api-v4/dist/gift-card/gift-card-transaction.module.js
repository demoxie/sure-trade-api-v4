"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftCardTransactionModule = void 0;
const common_1 = require("@nestjs/common");
const gift_card_transaction_controller_1 = require("./gift-card-trsanction/gift-card-transaction.controller");
const gift_card_rate_service_1 = require("./gift-card-rate/gift-card-rate.service");
const gift_card_service_1 = require("./gift-card/gift-card.service");
const gift_card_transaction_service_1 = require("./gift-card-trsanction/gift-card-transaction.service");
const model_provider_1 = require("../models/repository/model.provider");
const auth_module_1 = require("../auth/auth.module");
const configModules_1 = require("../config/config/configModules");
const database_module_1 = require("../config/database/database.module");
const rabbitmq_config_module_1 = require("../config/rabbitmq/rabbitmq-config.module");
const jwt_1 = require("@nestjs/jwt");
const util_module_1 = require("../util/util.module");
const message_sender_module_1 = require("../message-sender/message-sender.module");
const gift_card_controller_1 = require("./gift-card/gift-card.controller");
const gift_card_rate_controller_1 = require("./gift-card-rate/gift-card-rate.controller");
let GiftCardTransactionModule = class GiftCardTransactionModule {
};
exports.GiftCardTransactionModule = GiftCardTransactionModule;
exports.GiftCardTransactionModule = GiftCardTransactionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            jwt_1.JwtModule,
            configModules_1.ConfigModules,
            database_module_1.DatabaseModule,
            rabbitmq_config_module_1.RabbitmqConfigModule,
            util_module_1.UtilModule,
            message_sender_module_1.MessageSenderModule,
        ],
        controllers: [gift_card_transaction_controller_1.GiftCardTransactionsController, gift_card_controller_1.GiftCardController, gift_card_rate_controller_1.GiftCardRateController],
        providers: [
            gift_card_service_1.GiftCardService,
            gift_card_rate_service_1.GiftCardRateService,
            gift_card_transaction_service_1.GiftCardTransactionService,
            ...model_provider_1.giftCardRateProvider,
            ...model_provider_1.userProviders,
            ...model_provider_1.giftCardTransactionProvider,
            ...model_provider_1.giftCardProvider,
        ],
        exports: [gift_card_transaction_service_1.GiftCardTransactionService, gift_card_rate_service_1.GiftCardRateService],
    })
], GiftCardTransactionModule);
//# sourceMappingURL=gift-card-transaction.module.js.map