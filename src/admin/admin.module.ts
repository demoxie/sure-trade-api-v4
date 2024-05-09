import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { ApiModule } from "../api/api.module";
import { MessageSenderModule } from "../message-sender/message-sender.module";
import { StakedAssetModule } from "../staked-asset/staked-asset.module";

@Module({
  imports: [
    JwtModule,
    ConfigModule.forRoot(),
    ApiModule,
    MessageSenderModule,
    StakedAssetModule,
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
