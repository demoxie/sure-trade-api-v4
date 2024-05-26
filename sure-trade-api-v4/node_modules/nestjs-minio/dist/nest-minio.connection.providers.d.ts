import { NestMinioService } from './nest-minio.service';
export declare const MINIO_CONNECTION = "MINIO_CONNECTION";
export declare const connectionFactory: {
    provide: string;
    useFactory: (nestMinioService: any) => Promise<any>;
    inject: (typeof NestMinioService)[];
};
