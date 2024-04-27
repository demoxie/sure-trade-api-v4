import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        host: configService.get<string>("REDIS_HOST"),
        port: configService.get<number>("REDIS_PORT"),
        password: configService.get<string>("REDIS_PASSWORD"),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class RedisModule {}
