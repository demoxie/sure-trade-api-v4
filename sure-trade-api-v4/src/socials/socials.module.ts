import { Module } from "@nestjs/common";
import { SocialsService } from "./socials.service";
import { SocialsController } from "./socials.controller";
import { AuthModule } from "../auth/auth.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [AuthModule, JwtModule],
  providers: [SocialsService],
  controllers: [SocialsController],
})
export class SocialsModule {}
