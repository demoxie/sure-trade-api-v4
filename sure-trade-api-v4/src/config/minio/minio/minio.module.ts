import { Module } from "@nestjs/common";
import { NestMinioModule } from "nestjs-minio";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    NestMinioModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        endPoint: configService.get<string>("MINIO_ENDPOINT"),
        port: configService.get<number>("MINIO_PORT"),
        useSSL: configService.get<boolean>("MINIO_USE_SSL"),
        accessKey: configService.get<string>("MINIO_ACCESS_KEY"),
        secretKey: configService.get<string>("MINIO_SECRET_KEY"),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MinioModule {}
