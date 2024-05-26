import * as minio from 'minio';
import { NestMinioOptions } from './nest-minio.options';
interface INestMinioService {
    getMinio(): minio.Client;
}
export declare class NestMinioService implements INestMinioService {
    private _NestMinioOptions;
    private _minioConnection;
    private readonly logger;
    constructor(_NestMinioOptions: NestMinioOptions);
    getMinio(): minio.Client;
    checkConnection(): void;
}
export {};
