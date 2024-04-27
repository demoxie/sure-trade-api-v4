import { Module } from "@nestjs/common";
import { CodeGenerator } from "./code-generator.util";

@Module({
  providers: [CodeGenerator],
})
export class UtilModule {}
