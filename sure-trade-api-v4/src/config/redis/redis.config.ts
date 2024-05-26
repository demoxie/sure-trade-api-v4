import { Module } from "@nestjs/common";
import { RedisModule } from "@nestjs-modules/ioredis";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "single",
        url: configService.get("REDIS_URL"),
        options: {
          enableReadyCheck: true,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class RedisCoreModule {}
