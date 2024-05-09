import { Module } from "@nestjs/common";
import { UtilService } from "./util.service";
import { JwtModule } from "@nestjs/jwt";
import { ModelMapperService } from "./modelmapper/modelmapper.service";

@Module({
  imports: [JwtModule],
  providers: [UtilService, ModelMapperService],
  exports: [UtilService],
})
export class UtilModule {}
