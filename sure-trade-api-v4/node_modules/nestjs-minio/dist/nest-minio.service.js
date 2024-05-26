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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NestMinioService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestMinioService = void 0;
const common_1 = require("@nestjs/common");
const minio = require("minio");
const nest_minio_module_definition_1 = require("./nest-minio.module-definition");
let NestMinioService = NestMinioService_1 = class NestMinioService {
    constructor(_NestMinioOptions) {
        this._NestMinioOptions = _NestMinioOptions;
        this.logger = new common_1.Logger(NestMinioService_1.name);
    }
    getMinio() {
        if (!this._minioConnection) {
            this._minioConnection = new minio.Client(this._NestMinioOptions);
        }
        return this._minioConnection;
    }
    checkConnection() {
        this._minioConnection.listBuckets().then(() => {
            this.logger.log("Successfullly connected to minio.");
        })
            .catch(error => {
            this.logger.error(error);
        });
    }
};
exports.NestMinioService = NestMinioService;
exports.NestMinioService = NestMinioService = NestMinioService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(nest_minio_module_definition_1.MODULE_OPTIONS_TOKEN)),
    __metadata("design:paramtypes", [Object])
], NestMinioService);
