"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCoreModule = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("@nestjs-modules/ioredis");
const config_1 = require("@nestjs/config");
let RedisCoreModule = class RedisCoreModule {
};
exports.RedisCoreModule = RedisCoreModule;
exports.RedisCoreModule = RedisCoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            ioredis_1.RedisModule.forRootAsync({
                useFactory: (configService) => ({
                    type: "single",
                    url: configService.get("REDIS_URL"),
                    options: {
                        enableReadyCheck: true,
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], RedisCoreModule);
//# sourceMappingURL=redis.config.js.map