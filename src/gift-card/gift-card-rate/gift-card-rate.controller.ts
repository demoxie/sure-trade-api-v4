import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { GiftCardRateService } from "./gift-card-rate.service";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { HttpExceptionFilter } from "../../exception/HttpExceptionFilter";
import { AuthGuard, Roles } from "../../auth/service/auth.guard";
import { Role } from "src/enums/enum";
import { GiftCardRateDTO } from "../../api/dto";
import { Request } from "express";
import { UserController } from "../../api/controller/user.controller";

@Controller("/gift-card-rate")
@ApiTags("Gift Card Rate Controller")
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class GiftCardRateController {
  constructor(private readonly giftCardRateService: GiftCardRateService) {}

  @Post()
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Add Gift Card Rate",
    description: "Endpoint to add a new gift card rate.",
  })
  @ApiResponse({ status: HttpStatus.OK, type: GiftCardRateDTO })
  async addRate(@Body() rateDto: GiftCardRateDTO, @Req() req: Request) {
    return this.giftCardRateService.addRate(
      UserController.getJwtUser(req).id,
      rateDto,
    );
  }

  @Get()
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get All Gift Card Rates",
    description: "Endpoint to retrieve all gift card rates.",
  })
  @ApiResponse({ status: HttpStatus.OK, type: [GiftCardRateDTO] })
  async getAllRates() {
    return this.giftCardRateService.getAllRates();
  }

  @Get("merchant/:id")
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Gift Card Rates by Merchant ID",
    description: "Endpoint to retrieve gift card rates by merchant ID.",
  })
  @ApiResponse({ status: HttpStatus.OK, type: [GiftCardRateDTO] })
  async getRatesByMerchantId(@Param("id") id: number) {
    return this.giftCardRateService.getRatesByMerchantId(id);
  }

  @Get("merchants/mine")
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @Roles(Role.MERCHANT)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get My Gift Card Rates",
    description:
      "Endpoint to retrieve gift card rates for the authenticated merchant.",
  })
  @ApiResponse({ status: HttpStatus.OK, type: [GiftCardRateDTO] })
  async getMyRates(@Req() req: Request) {
    console.log("JWT USER " + JSON.stringify(UserController.getJwtUser(req)));
    return this.giftCardRateService.getMyRates(
      UserController.getJwtUser(req).id,
    );
  }

  @Get("status/:status")
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Gift Card Rates by Status",
    description: "Endpoint to retrieve gift card rates by status.",
  })
  @ApiResponse({ status: HttpStatus.OK, type: [GiftCardRateDTO] })
  async getRatesByStatus(@Param("status") status: string) {
    return this.giftCardRateService.getRatesByStatus(status);
  }

  @Get(":id")
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Gift Card Rate by ID",
    description: "Endpoint to retrieve a gift card rate by ID.",
  })
  @ApiResponse({ status: HttpStatus.OK, type: GiftCardRateDTO })
  async getRateById(@Param("id") id: number) {
    return this.giftCardRateService.getRateById(id);
  }

  @Put(":id")
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @Roles(Role.MERCHANT)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update Gift Card Rate",
    description: "Endpoint to update an existing gift card rate.",
  })
  @ApiResponse({ status: HttpStatus.OK, type: GiftCardRateDTO })
  async updateRate(@Param("id") id: number, @Body() rateDto: GiftCardRateDTO) {
    return this.giftCardRateService.updateRate(id, rateDto);
  }

  @Delete(":id")
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @Roles(Role.MERCHANT)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Delete Gift Card Rate",
    description: "Endpoint to delete a gift card rate by ID.",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Gift card rate deleted successfully.",
  })
  async deleteRate(@Param("id") id: number) {
    return this.giftCardRateService.deleteRate(id);
  }
}
