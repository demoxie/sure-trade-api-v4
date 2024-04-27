import { Body, Controller, Inject, Post } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { SignUpDto } from "../dto/SignUpDto";
import { ApiTags } from "@nestjs/swagger";
// import { Authentication } from "./authentication.service";
// import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("/users")
@ApiTags("User Controller")
export class UserController {
  constructor(@Inject() private readonly userService: UserService) {}

  // // @UseGuards(JwtAuthGuard)
  // @Get("/")
  // async getAllUsers() {
  //   return this.userService.getAllUsers();
  // }
  //
  // // @UseGuards(JwtAuthGuard)
  // @Get("/:id")
  // async getUserById(@Param("id") id: string) {
  //   return this.userService.getUserById(id);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Get("/logged-in/profile")
  // async getLoggedInUserProfile() {
  //   return this.userService.getLoggedInUserProfile();
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Get("/username/:username")
  // async getUserByUsername(@Param("username") username: string) {
  //   return this.userService.getUserByUsername(username);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Get("/email/:email")
  // async getUserByEmail(@Param("email") email: string) {
  //   return this.userService.getUserByEmail(email);
  // }
  //
  // @Get("/validate/:email")
  // async forgotPassword(@Param("email") email: string) {
  //   return this.userService.forgotPassword(email);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Put("/change-password/mine")
  // async changePassword(@Body() body: any) {
  //   return this.userService.changePassword(body);
  // }
  //
  // @Put("/reset-password/:otp")
  // async resetPassword(@Param("otp") otp: string, @Body() body: any) {
  //   return this.userService.resetPassword(otp, body);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Get("/phone/:phone")
  // async getUserByPhone(@Param("phone") phone: string) {
  //   return this.userService.getUserByPhone(phone);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Get("/address/:address")
  // async getUserByAddress(@Param("address") address: string) {
  //   return this.userService.getUserByAddress(address);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Get("/merchants/all")
  // async getMerchants() {
  //   return this.userService.getMerchants();
  // }
  //
  // @Get("/merchants/rates/")
  // async getMerchantsByRate() {
  //   return this.userService.getMerchantsByRate();
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Get("/merchant/all-rates/:merchantId")
  // async getMerchantAllRates(@Param("merchantId") merchantId: string) {
  //   return this.userService.getMerchantAllRates(merchantId);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Get("/merchants/active/rate")
  // async getActiveMerchants() {
  //   return this.userService.getActiveMerchants();
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Get("/admins/all")
  // async getAdmins() {
  //   return this.userService.getAdmins();
  // }

  @Post("/")
  async createUser(@Body() body: SignUpDto) {
    return this.userService.createUser(body);
  }

  //
  // @UseGuards(JwtAuthGuard)
  // @Post("/add-admin")
  // async createAdmin(@Body() body: any) {
  //   return this.userService.createAdmin(body);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Post("/assign-role/")
  // async assignRole(@Body() body: any) {
  //   return this.userService.assignRole(body);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Post("/setup/transaction-pin")
  // async setupTransactionPin(@Body() body: any) {
  //   return this.userService.setupTransactionPin(body);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Get("/transaction-pin/confirm/:pin")
  // async confirmTransactionPin(@Param("pin") pin: string) {
  //   return this.userService.confirmTransactionPin(pin);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Put("/:id")
  // async updateUser(@Param("id") id: string, @Body() body: any) {
  //   return this.userService.updateUser(id, body);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Delete("/")
  // async deleteUser(@Body() body: any) {
  //   return this.userService.deleteUser(body);
  // }
  //
  // @Post("/login")
  // async login(@Body() body: any) {
  //   return this.userService.login(body);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Post("/logout/me")
  // async logout() {
  //   return this.userService.logout();
  // }
  //
  // @Post("/refresh")
  // async refresh(@Body() body: any) {
  //   return this.userService.refresh(body);
  // }
  //
  // @Post("/verify-otp")
  // async verifyOtp(@Body() body: any) {
  //   return this.userService.verifyOtp(body);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Post("/profile/upload-profile-image")
  // async uploadProfileImage(@Body() body: any) {
  //   return this.userService.uploadProfileImage(body);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Post("/merchant/request/")
  // async requestToBecomeMerchant(@Body() body: any) {
  //   return this.userService.requestToBecomeMerchant(body);
  // }
  //
  // @Get("/new-merchant/get-admin-address")
  // async getAdminAddressToPay() {
  //   return this.userService.getAdminAddressToPay();
  // }
  //
  // @Get("/merchant/become-merchant")
  // async becomeMerchant() {
  //   return this.userService.becomeMerchant();
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Get("/user/nonce")
  // async getNonce() {
  //   return this.userService.getNonce();
  // }
  //
  // @Get("/metamask/:walletAddress/check-if-exist")
  // async checkIfUserExists(@Param("walletAddress") walletAddress: string) {
  //   return this.userService.checkIfUserExists(walletAddress);
  // }
  //
  // @Get("/metamask/signup")
  // async signupWithMetamask() {
  //   return this.userService.signupWithMetamask();
  // }
  //
  // @Get("/metamask/login")
  // async loginWithMetamask() {
  //   return this.userService.loginWithMetamask();
  // }
  //
  // @Get("/metamask/:walletAddress")
  // async getUserByWalletAddress(@Param("walletAddress") walletAddress: string) {
  //   return this.userService.getUserByWalletAddress(walletAddress);
  // }
  //
  // @Get("/metamask/:walletAddress/transactions")
  // async getTransactionsByWalletAddress(
  //   @Param("walletAddress") walletAddress: string,
  // ) {
  //   return this.userService.getTransactionsByWalletAddress(walletAddress);
  // }
  //
  // @Post("/telegram/register")
  // async registerTelegram(@Body() body: any) {
  //   return this.userService.registerTelegram(body);
  // }
}
