import { OnModuleInit } from '@nestjs/common';
import { NestMinioService } from './nest-minio.service';
import { ConfigurableModuleClass } from './nest-minio.module-definition';
export declare class NestMinioModule extends ConfigurableModuleClass implements OnModuleInit {
    readonly service: NestMinioService;
    constructor(service: NestMinioService);
    onModuleInit(): void;
}
