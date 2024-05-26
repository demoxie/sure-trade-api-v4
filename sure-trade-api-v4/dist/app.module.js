"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("./config/database/database.module");
const auth_module_1 = require("./auth/auth.module");
const configModules_1 = require("./config/config/configModules");
const api_module_1 = require("./user/api.module");
const rabbitmq_config_module_1 = require("./config/rabbitmq/rabbitmq-config.module");
const util_module_1 = require("./util/util.module");
const message_sender_module_1 = require("./message-sender/message-sender.module");
const gift_card_transaction_module_1 = require("./gift-card/gift-card-transaction.module");
const bank_details_module_1 = require("./bank-details/bank-details.module");
const gift_card_rate_module_1 = require("./gift-card-rate/gift-card-rate.module");
const HttpExceptionFilter_1 = require("./exception/HttpExceptionFilter");
const core_1 = require("@nestjs/core");
const chat_module_1 = require("./chat/chat.module");
const admin_module_1 = require("./admin/admin.module");
const staked_asset_module_1 = require("./staked-asset/staked-asset.module");
const socials_module_1 = require("./socials/socials.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            configModules_1.ConfigModules,
            database_module_1.DatabaseModule,
            rabbitmq_config_module_1.RabbitmqConfigModule,
            api_module_1.ApiModule,
            util_module_1.UtilModule,
            message_sender_module_1.MessageSenderModule,
            gift_card_transaction_module_1.GiftCardTransactionModule,
            bank_details_module_1.BankDetailsModule,
            gift_card_rate_module_1.GiftCardRateModule,
            chat_module_1.ChatModule,
            admin_module_1.AdminModule,
            staked_asset_module_1.StakedAssetModule,
            socials_module_1.SocialsModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: HttpExceptionFilter_1.HttpExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map