import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { SocialsService } from "./socials.service";
import { RegisterTelegramDTO } from "../api/dto";
import { AuthGuard, Public } from "../auth/service/auth.guard";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { HttpExceptionFilter } from "../exception/HttpExceptionFilter";

@Controller("socials")
@ApiTags("Socials Controller")
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class SocialsController {
  constructor(private readonly socialService: SocialsService) {}

  @Public()
  @Post("/telegram/register")
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: String, status: 200 })
  @ApiOperation({
    summary: "Register for telegram chat",
    description: "Telegram chat registration",
  })
  async registerTelegram(@Body() dto: RegisterTelegramDTO) {
    console.log("DTO registration :::: ", dto);
    return await this.socialService.registerTelegram(dto);
  }
}
