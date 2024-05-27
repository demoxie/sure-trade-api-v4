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
import { UserService } from "../service/user.service";
import {
  BecomeMerchantRequestDTO,
  JwtPayload,
  LoginDto,
  PasswordResetDTO,
  ProfilePictureUpdateDTO,
  RegisterTelegramDTO,
  RequestIdentityDTO,
  SignupDTO,
  TransactionPinDTO,
  UpdateDTO,
  UserResponse,
  VerifyOtpDTO,
} from "../../dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Request } from "express";
import { AuthService } from "../../auth/service/auth.service";
import { HttpExceptionFilter } from "../../exception/HttpExceptionFilter";
import { AuthGuard, Public, Roles } from "../../auth/service/auth.guard";
import { RolesGuard } from "../../auth/service/role.guard";
import { Role } from "../../enums/enum";
import { GiftCardTransactionService } from "../../gift-card/gift-card-trsanction/gift-card-transaction.service";
import { GiftCardRateService } from "../../gift-card/gift-card-rate/gift-card-rate.service";
import {GiftCardRate} from "../../models/gift-card-rate.model";
import {BecomeMerchantRequests} from "../../models/become-a-merchant-request.model";

@Controller("/users")
@ApiTags("User Controller")
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly transactionService: GiftCardTransactionService,
    private readonly giftCardRateService: GiftCardRateService,
  ) {}

  public static getJwtUser = (req: Request) => {
    const jwtUser: JwtPayload = req["user"];
    return jwtUser;
  };

  @Get("/")
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: [UserResponse], status: 200 })
  @ApiOperation({ summary: "Get All Users", description: "Get All Users" })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get User By Id", description: "Get User By Id" })
  async getUserById(@Param("id") id: number) {
    return this.userService.getUserById(id);
  }

  @Get("/logged-in/profile")
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(Role.USER)
  @ApiOperation({
    summary: "Get LoggedIn User",
    description: "Get LoggedIn User",
  })
  async getLoggedInUserProfile(@Req() request: Request) {
    return await this.userService.getLoggedInUserProfile(request["user"].email);
  }

  @Get("/validate/:email")
  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOperation({
    summary: "Initiate Password Reset",
    description: "Initiate Password Reset",
  })
  async forgotPassword(@Param("email") email: string, @Req() req: Request) {
    const ipAddress = req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const requestIdentity: RequestIdentityDTO = {
      userAgent: userAgent,
      ipAddress: ipAddress,
      time: new Date().toTimeString(),
    };
    return this.userService.forgotPassword(email, requestIdentity);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOperation({ summary: "Reset Password", description: "Reset Password" })
  @ApiBody({ type: PasswordResetDTO })
  @ApiResponse({ type: UserResponse })
  @Put("/reset-password/:otp")
  async resetPassword(
    @Param("otp") otp: string,
    @Body() body: PasswordResetDTO,
  ) {
    return this.authService.resetPassword(otp, body);
  }

  @Get("/merchants/all")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get All Merchants",
    description: "Get All Merchants",
  })
  @ApiResponse({ type: [UserResponse] })
  async getMerchants() {
    return this.userService.getMerchants();
  }

  @Get("/merchants/rates/")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Merchants By Rate",
    description: "Get Merchants By Rate",
  })
  @ApiResponse({ type: [UserResponse] })
  async getMerchantsByRate(
    @Query("cardName") cardName: string,
    @Query("currency") currency: string,
    @Query("transactionType") transactionType: string,
    @Query("giftCardCurrency") giftCardCurrency: string,
  ) {
    return this.userService.getMerchantsByRate(
      cardName,
      currency,
      transactionType,
      giftCardCurrency,
    );
  }

  @Get("/merchant/all-rates/:merchantId")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Merchants Rates",
    description: "Get Merchants Rates",
    tags: ["Get Merchants Rates"],
  })
  @ApiResponse({ type: [GiftCardRate] })
  async getMerchantRates(@Param("merchantId") merchantId: number) {
    return this.giftCardRateService.getRatesByMerchantId(merchantId);
  }

  @Get("/merchants/active/rate")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Active Merchants and Their Rates",
    description: "Get Active Merchants and Their Rates",
  })
  @ApiResponse({ type: [UserResponse] })
  async getActiveMerchants() {
    return this.userService.getActiveMerchants();
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "User Sign Up", description: "User Sign Up" })
  @ApiResponse({ type: UserResponse })
  @Post("/")
  async createUser(@Body() body: SignupDTO) {
    return this.authService.createUser(body);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Setup Transaction PIN",
    description: "Setup Transaction PIN",
  })
  @ApiResponse({ type: UserResponse })
  @Post("/setup/transaction-pin")
  async setupTransactionPin(
    @Body() body: TransactionPinDTO,
    @Req() req: Request,
  ) {
    const jwtUser: JwtPayload = UserController.getJwtUser(req);
    const requestIdentity: RequestIdentityDTO = {
      ipAddress: req.socket.remoteAddress,
      userAgent: req["user-agent"],
      time: new Date().toTimeString(),
    };
    return this.authService.setupTransactionPin(body, jwtUser, requestIdentity);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Confirm Transaction PIN",
    description: "Confirm Transaction PIN",
  })
  @ApiResponse({ type: UserResponse })
  @Get("/transaction-pin/confirm/:pin")
  async confirmTransactionPin(@Param("pin") pin: string, @Req() req: Request) {
    const jwtUser: JwtPayload = UserController.getJwtUser(req);
    return this.authService.confirmTransactionPin(pin, jwtUser);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update Account", description: "Update Account" })
  @ApiResponse({ type: UserResponse })
  @Put("/:id")
  async updateUser(@Param("id") id: number, @Body() body: UpdateDTO) {
    return this.userService.updateUser(id, body);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update User Account",
    description: "Update User Account",
  })
  @ApiResponse({ type: String })
  @Delete("/:id")
  async deleteUser(@Param("id") id: number) {
    return this.userService.deleteUser(id);
  }

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOperation({ summary: "Login", description: "Login" })
  async login(@Body() body: LoginDto, @Req() req: Request) {
    const ipAddress = req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];
    body.requestIdentity = {
      userAgent: userAgent,
      ipAddress: ipAddress,
      time: new Date().toTimeString(),
    };
    return this.authService.login(body);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Logout", description: "Logout" })
  @ApiResponse({ type: String })
  @Post("/logout/me")
  async logout(@Req() req: Request) {
    const jwtUser: JwtPayload = UserController.getJwtUser(req);
    return this.userService.logout(jwtUser);
  }

  @Post("/verify-otp")
  @Public()
  @ApiOperation({ summary: "Verify OTP", description: "Verify OTP" })
  async verifyOtp(@Body() body: VerifyOtpDTO) {
    return this.authService.verifyOtp(body);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Upload Profile Image",
    description: "Upload Profile Image",
  })
  @ApiResponse({ type: UserResponse })
  @Post("/profile/upload-profile-image")
  async uploadProfileImage(
    @Body() body: ProfilePictureUpdateDTO,
    @Req() req: Request,
  ) {
    const jwtUser: JwtPayload = UserController.getJwtUser(req);
    return this.userService.uploadProfileImage(jwtUser, body);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Apply to Become Merchant",
    description: "Apply to Become Merchant",
  })
  @ApiResponse({ type: BecomeMerchantRequests })
  @Post("/merchant/request/")
  async requestToBecomeMerchant(
    @Body() body: BecomeMerchantRequestDTO,
    @Req() req: Request,
  ) {
    const jwtUser = UserController.getJwtUser(req);
    return this.userService.requestToBecomeMerchant(jwtUser, body);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Admin Address to Pay",
    description: "Get Admin Address to Pay",
  })
  @ApiResponse({ type: String })
  @Get("/new-merchant/get-admin-address")
  async getAdminAddressToPay() {
    return this.userService.getAdminAddressToPay();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Register Telegram",
    description: "Register Telegram",
  })
  @ApiResponse({ type: UserResponse })
  @Post("/telegram/register")
  async registerTelegram(@Body() body: RegisterTelegramDTO) {
    return this.userService.registerTelegram(body);
  }
}
