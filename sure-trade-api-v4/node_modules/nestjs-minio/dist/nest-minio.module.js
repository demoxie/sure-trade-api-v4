"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestMinioModule = void 0;
const common_1 = require("@nestjs/common");
const nest_minio_service_1 = require("./nest-minio.service");
const nest_minio_module_definition_1 = require("./nest-minio.module-definition");
const nest_minio_connection_providers_1 = require("./nest-minio.connection.providers");
let NestMinioModule = class NestMinioModule extends nest_minio_module_definition_1.ConfigurableModuleClass {
    constructor(service) {
        super();
        this.service = service;
    }
    onModuleInit() {
        this.service.checkConnection();
    }
};
exports.NestMinioModule = NestMinioModule;
exports.NestMinioModule = NestMinioModule = __decorate([
    (0, common_1.Module)({
        providers: [nest_minio_service_1.NestMinioService, nest_minio_connection_providers_1.connectionFactory],
        exports: [nest_minio_service_1.NestMinioService, nest_minio_connection_providers_1.connectionFactory],
    }),
    __metadata("design:paramtypes", [nest_minio_service_1.NestMinioService])
], NestMinioModule);
