"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const bank_details_controller_1 = require("./bank-details.controller");
const bank_details_service_1 = require("./bank-details.service");
const jwt_1 = require("@nestjs/jwt");
const configModules_1 = require("../config/config/configModules");
const config_1 = require("@nestjs/config");
const message_sender_module_1 = require("../message-sender/message-sender.module");
let BankDetailsModule = class BankDetailsModule {
};
exports.BankDetailsModule = BankDetailsModule;
exports.BankDetailsModule = BankDetailsModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule, configModules_1.ConfigModules, config_1.ConfigModule, message_sender_module_1.MessageSenderModule],
        controllers: [bank_details_controller_1.BankDetailsController],
        providers: [bank_details_service_1.BankDetailsService],
    })
], BankDetailsModule);
//# sourceMappingURL=bank-details.module.js.map