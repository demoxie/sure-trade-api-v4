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
  Query,
  Req,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard, Roles } from "../../auth/service/auth.guard";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  GiftCardDTO,
  GiftCardResponse,
  SearchGiftCardQueryParams,
} from "../../api/dto";
import { RolesGuard } from "../../auth/service/role.guard";
import { Role } from "../../enums/enum";
import { GiftCardService } from "./gift-card.service";
import { Request } from "express";
import { UserController } from "../../api/controller/user.controller";
import { HttpExceptionFilter } from "../../exception/HttpExceptionFilter";

@Controller("/gift-card")
@ApiTags("Gift Card Controller")
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class GiftCardController {
  constructor(private readonly giftCardService: GiftCardService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get All Gift Cards",
    description: "Get All Gift Cards",
  })
  @ApiResponse({ type: [GiftCardResponse] })
  async getGiftCards() {
    return await this.giftCardService.getGiftCards();
  }

  @Get("/mine")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get All My Gift Cards",
    description: "Get All My Gift Cards",
  })
  @ApiResponse({ type: [GiftCardResponse] })
  async getAllMyGiftCards(@Req() req: Request) {
    return this.giftCardService.getAllMyGiftCards(
      UserController.getJwtUser(req),
    );
  }

  @Get("/:id")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Gift Card By Id",
    description: "Get Gift Card By Id",
  })
  @ApiResponse({ type: GiftCardResponse })
  async getGiftCardById(@Param("id") id: number) {
    return this.giftCardService.getGiftCardById(id);
  }

  @Get("/search/:cardCode")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Search Gift Cards By Card Code",
    description: "Search Gift Cards By Card Code",
  })
  @ApiResponse({ type: [GiftCardResponse] })
  async getGiftCardByCardCode(@Param("cardCode") cardCode: string) {
    return this.giftCardService.getGiftCardByCardCode(cardCode);
  }

  @Get("/user/:userId")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Gift Cards By User Id",
    description: "Get Gift Cards By User Id",
  })
  @ApiResponse({ type: [GiftCardResponse] })
  async getGiftCardsByUserId(@Param("userId") userId: number) {
    return this.giftCardService.getGiftCardsByUserId(userId);
  }

  @Get("/user/:status")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Gift Cards By Status",
    description: "Get Gift Cards By Status",
  })
  @ApiResponse({ type: [GiftCardResponse] })
  async getGiftCardsByStatus(@Param("status") status: string) {
    return this.giftCardService.getGiftCardByStatus(status);
  }

  @Get("/status/:status")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Gift Cards By Status",
    description: "Get Gift Cards By Status",
  })
  @ApiResponse({ type: [GiftCardResponse] })
  async getGiftCardByStatus(@Param("status") status: string) {
    return this.giftCardService.getGiftCardByStatus(status);
  }

  @Get("/type/:type")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Gift Cards By Type",
    description: "Get Gift Cards By Type",
  })
  @ApiResponse({ type: [GiftCardResponse] })
  async getGiftCardsByType(@Param("type") type: string) {
    return this.giftCardService.getGiftCardsByType(type);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create Gift Card",
    description: "Create Gift Card",
  })
  @ApiResponse({ type: GiftCardResponse })
  async createGiftCard(@Body() body: GiftCardDTO, @Req() req: Request) {
    return this.giftCardService.createGiftCard(
      body,
      UserController.getJwtUser(req),
    );
  }

  @Get("/params/search")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Search Gift Cards By Parameters",
    description: "Search Gift Cards By Parameters",
  })
  @ApiResponse({ type: [GiftCardResponse] })
  async searchGiftCards(@Query() query: SearchGiftCardQueryParams) {
    return this.giftCardService.searchGiftCards(query);
  }

  @Put("/:id")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update Gift Card By Id",
    description: "Update Gift Card By Id",
  })
  @ApiResponse({ type: GiftCardResponse })
  async updateGiftCardById(@Param("id") id: number, @Body() body: GiftCardDTO) {
    return this.giftCardService.updateGiftCardById(id, body);
  }

  @Put("/mine/:id")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update My Gift Card By Id",
    description: "Update My Gift Card By Id",
  })
  @ApiResponse({ type: GiftCardResponse })
  async updateMyGiftCardById(
    @Param("id") id: number,
    @Body() body: GiftCardDTO,
    @Req() req: Request,
  ) {
    return this.giftCardService.updateMyGiftCardById(
      id,
      UserController.getJwtUser(req),
      body,
    );
  }

  @Put("/:id/screenshots")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Upload Gift Card Screenshots",
    description: "Upload Gift Card Screenshots",
  })
  @ApiResponse({ type: GiftCardResponse })
  async uploadGiftCardScreenshots(
    @Param("id") id: number,
    @Body() body: GiftCardDTO,
  ) {
    return this.giftCardService.uploadGiftCardScreenshots(id, body);
  }

  @Delete("/:id")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Delete Gift Card By Id",
    description: "Delete Gift Card By Id",
  })
  @ApiResponse({ type: GiftCardResponse })
  async deleteGiftCard(@Param("id") id: number) {
    return this.giftCardService.deleteGiftCard(id);
  }

  @Get("/supported/gift-cards")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Supported Gift Cards",
    description: "Get Supported Gift Cards",
  })
  @ApiResponse({ type: [GiftCardResponse] })
  async getSupportedGiftCards() {
    return this.giftCardService.getSupportedGiftCards();
  }
}
