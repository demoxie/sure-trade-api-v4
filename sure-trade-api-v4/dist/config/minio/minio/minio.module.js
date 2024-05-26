"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinioModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_minio_1 = require("nestjs-minio");
const config_1 = require("@nestjs/config");
let MinioModule = class MinioModule {
};
exports.MinioModule = MinioModule;
exports.MinioModule = MinioModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            nestjs_minio_1.NestMinioModule.registerAsync({
                useFactory: async (configService) => ({
                    endPoint: configService.get("MINIO_ENDPOINT"),
                    port: configService.get("MINIO_PORT"),
                    useSSL: configService.get("MINIO_USE_SSL"),
                    accessKey: configService.get("MINIO_ACCESS_KEY"),
                    secretKey: configService.get("MINIO_SECRET_KEY"),
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], MinioModule);
//# sourceMappingURL=minio.module.js.map