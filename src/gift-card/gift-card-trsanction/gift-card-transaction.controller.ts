import {
  Body,
  Controller,
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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { GiftCardTransactionService } from "./gift-card-transaction.service";
import { RolesGuard } from "../../auth/service/role.guard";
import { AuthGuard, Roles } from "../../auth/service/auth.guard";
import { Role, TransactionStatus } from "../../enums/enum";
import {
  AcceptRejectTransactionDTO,
  GiftCardTransactionDTO,
  GiftCardTransactionResponse,
  JwtPayload,
  PageRequest,
} from "../../dto";
import { HttpExceptionFilter } from "../../exception/HttpExceptionFilter";
import { Request } from "express";
import { UserController } from "../../user/controller/user.controller";
import { GiftCardTransaction } from "../../models/gift-card-transaction.model";

@Controller("/gift-card-transaction")
@ApiTags("Gift Card Transactions Controller")
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class GiftCardTransactionsController {
  constructor(
    private readonly giftCardTransaction: GiftCardTransactionService,
  ) {}

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Gift Card Transactions",
    description: "Get All Transactions",
  })
  @ApiResponse({ type: [GiftCardTransactionResponse] })
  @Get("/")
  async getTransactions() {
    return await this.giftCardTransaction.getAllTransactions();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Post a Transaction",
    description: "Post a Transaction",
  })
  @ApiResponse({ type: GiftCardTransactionResponse })
  @Post()
  async addTransaction(
    @Body() body: GiftCardTransactionDTO,
    @Req() req: Request,
  ) {
    const jwtUser: JwtPayload = UserController.getJwtUser(req);
    return await this.giftCardTransaction.addTransaction(jwtUser, body);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get a Transaction By Id",
    description: "Get a Transaction",
  })
  @ApiResponse({ type: GiftCardTransaction })
  @Get(":id")
  async getTransactionById(
    @Param("id") id: number,
    @Query() pagination: PageRequest,
  ) {
    pagination.page = parseInt(pagination.page as unknown as string, 10);
    pagination.limit = parseInt(pagination.limit as unknown as string, 10);
    return await this.giftCardTransaction.getTransactionById(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get my Transactions",
    description: "Get my Transactions",
  })
  @ApiResponse({ type: [GiftCardTransaction] })
  @Get("mine/logged-in-user")
  async getAllMyTransactions(
    @Query() pagination: PageRequest,
    @Req() req: Request,
  ) {
    pagination.page = parseInt(pagination.page as unknown as string, 10);
    pagination.limit = parseInt(pagination.limit as unknown as string, 10);
    console.table(pagination);
    return await this.giftCardTransaction.getAllMyTransactionsAsLoggedInUser(
      UserController.getJwtUser(req),
      pagination,
    );
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get my pending Transactions",
    description: "Get my pending Transactions",
  })
  @ApiResponse({ type: [GiftCardTransaction] })
  @Get("pending/mine")
  getAllMyPendingTransactions(
    @Query() pagination: PageRequest,
    @Req() req: Request,
  ) {
    pagination.page = parseInt(pagination.page as unknown as string, 10);
    pagination.limit = parseInt(pagination.limit as unknown as string, 10);
    return this.giftCardTransaction.getAllMyPendingTransactions(
      UserController.getJwtUser(req),
      pagination,
    );
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get my declined Transactions",
    description: "Get my declined Transactions",
  })
  @ApiResponse({ type: [GiftCardTransaction] })
  @Get("decline/mine")
  getAllMyDeclinedTransactions(
    @Query() pagination: PageRequest,
    @Req() req: Request,
  ) {
    pagination.page = parseInt(pagination.page as unknown as string, 10);
    pagination.limit = parseInt(pagination.limit as unknown as string, 10);
    return this.giftCardTransaction.getAllMyDeclinedTransactions(
      UserController.getJwtUser(req),
      pagination,
    );
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get my transactions with other",
    description: "Get my transactions with other",
  })
  @ApiResponse({ type: [GiftCardTransaction] })
  @Get("mine/with/others")
  async getAllMyTransactionsWithOthers(
    @Query() pagination: PageRequest,
    @Req() req: Request,
  ) {
    pagination.page = parseInt(pagination.page as unknown as string, 10);
    pagination.limit = parseInt(pagination.limit as unknown as string, 10);
    return await this.giftCardTransaction.getAllMyTransactionsWithOthers(
      UserController.getJwtUser(req),
      pagination,
    );
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get transactions by status",
    description: "Get transactions by status",
  })
  @ApiResponse({ type: [GiftCardTransaction] })
  @Get("filter/:status")
  getTransactionsByStatus(
    @Param("status") status: TransactionStatus,
    @Query() pagination: PageRequest,
    @Req() req: Request,
  ) {
    pagination.page = parseInt(pagination.page as unknown as string, 10);
    pagination.limit = parseInt(pagination.limit as unknown as string, 10);
    return this.giftCardTransaction.getTransactionsByStatus(
      status,
      UserController.getJwtUser(req),
      pagination,
    );
  }

  //
  // @UseGuards(RolesGuard)
  // @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ description: "Logout" })
  // @ApiResponse({ type: UserResponse })
  // @Put(":id")
  // updateTransaction(@Param("id") id: string, @Body() body: any) {
  //   return this.giftCardTransaction.updateTransaction(id, body);
  // }
  //
  // @UseGuards(RolesGuard)
  // @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ description: "Logout" })
  // @ApiResponse({ type: UserResponse })
  // @Delete(":id")
  // deleteTransaction(@Param("id") id: string) {
  //   return this.giftCardTransaction.deleteTransaction(id);
  // }
  //
  // @UseGuards(RolesGuard)
  // @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ description: "Logout" })
  // @ApiResponse({ type: UserResponse })
  // @Put("user/:id")
  // getTransactionsByUserId(@Param("id") userId: string) {
  //   return this.giftCardTransaction.getTransactionsByUserId(userId);
  // }
  //
  // @UseGuards(RolesGuard)
  // @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ description: "Logout" })
  // @ApiResponse({ type: UserResponse })
  // @Get("status/user/")
  // getTransactionsByUserIdAndStatus() {
  //   return this.giftCardTransaction.getTransactionsByUserIdAndStatus();
  // }
  //
  // @UseGuards(RolesGuard)
  // @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ description: "Logout" })
  // @ApiResponse({ type: UserResponse })
  // @Get("user-merchant/status")
  // getTransactionsByUserIdAndMerchantId() {
  //   return this.giftCardTransaction.getTransactionsByUserIdAndMerchantId();
  // }
  //
  // @UseGuards(RolesGuard)
  // @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ description: "Logout" })
  // @ApiResponse({ type: UserResponse })
  // @Get("merchant/:id")
  // getTransactionsByMerchantId(@Param("id") merchantId: string) {
  //   return this.giftCardTransaction.getTransactionsByMerchantId(merchantId);
  // }
  //
  // @UseGuards(RolesGuard)
  // @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ description: "Logout" })
  // @ApiResponse({ type: UserResponse })
  // @Get("gift-card/:id")
  // getTransactionsByGiftCardId(@Param("id") giftCardId: string) {
  //   return this.giftCardTransaction.getTransactionsByGiftCardId(giftCardId);
  // }
  //
  // @UseGuards(RolesGuard)
  // @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ description: "Logout" })
  // @ApiResponse({ type: UserResponse })
  // @Put("my-transactions/:transactionId/cancel")
  // cancelMyTransactionById(@Param("transactionId") transactionId: string) {
  //   return this.giftCardTransaction.cancelMyTransactionById(transactionId);
  // }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: "Logout" })
  @ApiResponse({ type: GiftCardTransaction })
  @Put(":transactionId/accept-or-reject")
  acceptOrRejectTransaction(
    @Param("transactionId") transactionId: number,
    @Body() body: AcceptRejectTransactionDTO,
    @Req() req: Request,
  ) {
    return this.giftCardTransaction.acceptOrRejectTransactionById(
      transactionId,
      UserController.getJwtUser(req),
      body,
    );
  }
}
