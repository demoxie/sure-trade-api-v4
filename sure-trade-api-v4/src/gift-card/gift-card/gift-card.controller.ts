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
  GiftCardResponse, GiftCardsResponse,
  SearchGiftCardQueryParams, SupportedGiftCard,
} from "../../dto";
import { RolesGuard } from "../../auth/service/role.guard";
import { Role } from "../../enums/enum";
import { GiftCardService } from "./gift-card.service";
import { Request } from "express";
import { UserController } from "../../user/controller/user.controller";
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
  @ApiResponse({ type: GiftCardsResponse })
  async getGiftCards() {
    return {
      data: await this.giftCardService.getGiftCards(),
      message: "Success"
    }
  }

  @Get("/mine")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get All My Gift Cards",
    description: "Get All My Gift Cards",
  })
  @ApiResponse({ type: GiftCardsResponse,description: 'List of Gift Cards' })
  async getAllMyGiftCards(@Req() req: Request): Promise<GiftCardsResponse> {
    const giftCards =  await this.giftCardService.getAllMyGiftCards(
      UserController.getJwtUser(req),
    );
    return {
      data: giftCards,
      message: "Success"
    }
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
    return {
      data: await this.giftCardService.getGiftCardById(id),
      message: "Success"
    }
  }

  @Get("/search/:cardCode")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Search Gift Cards By Card Code",
    description: "Search Gift Cards By Card Code",
  })
  @ApiResponse({ type: GiftCardResponse })
  async getGiftCardByCardCode(@Param("cardCode") cardCode: string) {
    return {
      data: await this.giftCardService.getGiftCardByCardCode(cardCode),
      message: "Success"
    }
  }

  @Get("/user/:userId")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Gift Cards By User Id",
    description: "Get Gift Cards By User Id",
  })
  @ApiResponse({ type: GiftCardsResponse })
  async getGiftCardsByUserId(@Param("userId") userId: number) {
    return {
      data: await this.giftCardService.getGiftCardsByUserId(userId),
      message: "Success"
    }
  }

  @Get("/user/:status")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Gift Cards By Status",
    description: "Get Gift Cards By Status",
  })
  @ApiResponse({ type: GiftCardsResponse })
  async getGiftCardsByStatus(@Param("status") status: string) {
    return {
      data: await this.giftCardService.getGiftCardByStatus(status),
      message: "Success"
    }
  }

  @Get("/status/:status")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Gift Cards By Status",
    description: "Get Gift Cards By Status",
  })
  @ApiResponse({ type: GiftCardResponse })
  async getGiftCardByStatus(@Param("status") status: string) {
    return {
      data: this.giftCardService.getGiftCardByStatus(status),
      message: "Success"
    }
  }

  @Get("/type/:type")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Gift Cards By Type",
    description: "Get Gift Cards By Type",
  })
  @ApiResponse({ type: GiftCardsResponse })
  async getGiftCardsByType(@Param("type") type: string) {
    return {
      data: await this.giftCardService.getGiftCardsByType(type),
      message: "Success"
    }
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
    return {
      data: await this.giftCardService.createGiftCard(
          body,
          UserController.getJwtUser(req),
      ),
      message: "Success"
    }
  }

  @Get("/params/search")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Search Gift Cards By Parameters",
    description: "Search Gift Cards By Parameters",
  })
  @ApiResponse({ type: GiftCardsResponse })
  async searchGiftCards(@Query() query: SearchGiftCardQueryParams) {
    return {
      data: await this.giftCardService.searchGiftCards(query),
      message: "Success"
    }
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
    return {
      data: await this.giftCardService.updateGiftCardById(id, body),
      message: "Success"
    }
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
    return {
      data: await this.giftCardService.updateMyGiftCardById(
          id,
          UserController.getJwtUser(req),
          body,
      ),
      message: "Success"
    }
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
    return {
      data: this.giftCardService.uploadGiftCardScreenshots(id, body),
      message: "Success"
    }
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
    return {
      data: await this.giftCardService.deleteGiftCard(id),
      message: "Success"
    }
  }

  @Get("/supported/gift-cards")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Supported Gift Cards",
    description: "Get Supported Gift Cards",
  })
  @ApiResponse({ type: [SupportedGiftCard] })
  async getSupportedGiftCards() {
    return {
      data: this.giftCardService.getSupportedGiftCards(),
      message: "Success"
    }
  }
}
