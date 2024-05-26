import {
  Controller,
  HttpStatus,
  Param,
  Put,
  Req,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../auth/service/auth.guard";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { HttpExceptionFilter } from "../exception/HttpExceptionFilter";
import { AdminService } from "./admin.service";
import { BecomeMerchantRequests } from "../models/become-a-merchant-request.model";
import { UserController } from "../user/controller/user.controller";
import { Request } from "express";

@ApiTags("Admin Controller")
@Controller("/admins")
@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Get("transactions/get-all/:pageNumber/:limit/:sortBy/:sortDirection")
  // @ApiOperation({
  //   summary: "Get all transactions",
  //   description: "Retrieve all transactions with pagination and sorting.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: [GiftCardTransaction] })
  // async getAllTransactions(@Query() pagination: PageRequest) {
  //   return this.adminService.getAllTransactions(
  //     pagination.page,
  //     pagination.limit,
  //     pagination.sortBy,
  //     pagination.sortDirection,
  //   );
  // }
  //
  // @Get("users/get-all")
  // @ApiOperation({
  //   summary: "Get all users",
  //   description: "Retrieve all users registered in the system.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: [UserResponse] })
  // async getAllUsers(@Query() pagination: PageRequest) {
  //   return this.adminService.getAllUsers();
  // }
  //
  // @Post("get-transactions-by-params")
  // @ApiOperation({
  //   summary: "Get transactions by parameters",
  //   description: "Retrieve transactions based on provided parameters.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: [GiftCardTransaction] })
  // async getTransactionsByParams(@Body() body) {
  //   return this.adminService.getTransactionsByParams(body);
  // }
  //
  // @Get("transactions/:id")
  // @ApiOperation({
  //   summary: "Get transaction by ID",
  //   description: "Retrieve a transaction by its unique identifier.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: GiftCardTransaction })
  // async getTransactionById(@Param("id") id) {
  //   return this.adminService.getTransactionById(id);
  // }
  //
  // @Get()
  // @ApiOperation({
  //   summary: "Get all admins",
  //   description: "Retrieve all administrators registered in the system.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: [UserResponse] })
  // async getAllAdmins() {
  //   return this.adminService.getAllAdmins();
  // }
  //
  // @Get("stake-withdrawal-requests/get-all")
  // @ApiOperation({
  //   summary: "Get all stake withdrawal requests",
  //   description: "Retrieve all stake withdrawal requests.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: [StakeWithdrawalRequest] })
  // async getAllStakeWithdrawalRequests() {
  //   return this.stakeWithdrawalRequestController.getAllStakeWithdrawalRequests();
  // }
  //
  // @Get("stake-withdrawal-requests/:id/get")
  // @ApiOperation({
  //   summary: "Get stake withdrawal request by ID",
  //   description:
  //     "Retrieve a stake withdrawal request by its unique identifier.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: StakeWithdrawalRequest })
  // async getStakeWithdrawalRequestById(@Param("id") id) {
  //   return this.stakeWithdrawalRequestController.getStakeWithdrawalRequestById(
  //     id,
  //   );
  // }
  //
  // @Post("create-admin")
  // @ApiOperation({ summary: "Create admin", description: "Create a new admin." })
  // @ApiResponse({ status: HttpStatus.CREATED, type: User })
  // async createAdmin(@Body() body) {
  //   return this.adminService.createAdmin(body);
  // }
  //
  // @Post("verification/verify-by-otp")
  // @ApiOperation({
  //   summary: "Verify by OTP",
  //   description: "Verify a user by OTP.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: String })
  // async verifyByOtp(@Body() body) {
  //   return this.adminService.verifyByOtp(body);
  // }
  //
  // @Put("transactions/:transactionRef/cancel")
  // @ApiOperation({
  //   summary: "Cancel transaction",
  //   description: "Cancel a transaction by its reference.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: GiftCardTransaction })
  // async cancelTransaction(@Param("transactionRef") transactionRef) {
  //   return this.adminService.cancelTransaction(transactionRef);
  // }
  //
  // @Get("merchants/requests")
  // @ApiOperation({
  //   summary: "Get merchant requests",
  //   description: "Retrieve all requests to become a merchant.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: [BecomeMerchantRequests] })
  // async getRequestToBecomeMerchant() {
  //   return this.adminService.getRequestToBecomeMerchant();
  // }
  //
  // @Get("merchants/requests/get-by-id/:id")
  // @ApiOperation({
  //   summary: "Get merchant request by ID",
  //   description: "Retrieve a merchant request by its unique identifier.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: BecomeMerchantRequests })
  // async getRequestToBecomeMerchantById(@Param("id") id) {
  //   return this.adminService.getRequestToBecomeMerchantById(id);
  // }

  @Put("merchants/requests/:reqId/approve")
  @ApiOperation({
    summary: "Approve merchant request",
    description: "Approve a request to become a merchant by its ID.",
  })
  @ApiResponse({ status: HttpStatus.OK, type: BecomeMerchantRequests })
  async approveRequestToBecomeMerchant(
    @Param("reqId") reqId: number,
    @Req() req: Request,
  ) {
    return this.adminService.approveRequestToBecomeMerchant(
      reqId,
      UserController.getJwtUser(req),
    );
  }

  // @Get("stake-withdrawal-requests/params/get")
  // @ApiOperation({
  //   summary: "Get stake withdrawal requests by parameters",
  //   description:
  //     "Retrieve stake withdrawal requests based on provided parameters.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: [StakeWithdrawalRequest] })
  // async getStakeWithdrawalRequestsByParams(@Query() query) {
  //   return this.stakeWithdrawalRequestController.getStakeWithdrawalRequestsByParams(
  //     query,
  //   );
  // }
  //
  // @Put("stake-withdrawal-requests/:id/approve")
  // @ApiOperation({
  //   summary: "Approve stake withdrawal request",
  //   description: "Approve a stake withdrawal request by its ID.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: StakeWithdrawalRequest })
  // async approveStakeWithdrawalRequest(@Param("id") id) {
  //   return this.stakeWithdrawalRequestController.approveStakeWithdrawalRequest(
  //     id,
  //   );
  // }
  //
  // @Put("stake-withdrawal-requests/:id/reject")
  // @ApiOperation({
  //   summary: "Reject stake withdrawal request",
  //   description: "Reject a stake withdrawal request by its ID.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: StakeWithdrawalRequest })
  // async rejectStakeWithdrawalRequest(@Param("id") id) {
  //   return this.stakeWithdrawalRequestController.rejectStakeWithdrawalRequest(
  //     id,
  //   );
  // }
  //
  // @Delete("stake-withdrawal-requests/:id")
  // @ApiOperation({
  //   summary: "Delete stake withdrawal request",
  //   description: "Delete a stake withdrawal request by its ID.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: String })
  // async deleteStakeWithdrawalRequest(@Param("id") id) {
  //   return this.stakeWithdrawalRequestController.deleteStakeWithdrawalRequest(
  //     id,
  //   );
  // }
  //
  // @Get("stake-withdrawal-requests/users/:userId")
  // @ApiOperation({
  //   summary: "Get stake withdrawal requests by user ID",
  //   description:
  //     "Retrieve stake withdrawal requests associated with a user by their ID.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: [StakeWithdrawalRequest] })
  // async getUserStakeWithdrawalRequests(@Param("userId") userId) {
  //   return this.stakeWithdrawalRequestController.getUserStakeWithdrawalRequests(
  //     userId,
  //   );
  // }
  //
  // @Put("lift-user-suspension/:id")
  // @ApiOperation({
  //   summary: "Lift user suspension",
  //   description: "Lift suspension for a user by their ID.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: User })
  // async liftUserSuspension(@Param("id") id) {
  //   return this.adminService.liftUserSuspension(id);
  // }
  //
  // @Put("lift-admin-suspension/:id")
  // @ApiOperation({
  //   summary: "Lift admin suspension",
  //   description: "Lift suspension for an admin by their ID.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  // async liftAdminSuspension(@Param("id") id) {
  //   return this.adminService.liftAdminSuspension(id);
  // }
  //
  // @Post("login")
  // @ApiOperation({ summary: "Login", description: "Authenticate and log in." })
  // @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  // async login(@Body() body) {
  //   return this.adminService.login(body);
  // }
  //
  // @Post("logout")
  // @ApiOperation({ summary: "Logout", description: "Log out." })
  // @ApiResponse({ status: HttpStatus.OK, type: String })
  // async logout(@Body() body) {
  //   return this.adminService.logout(body);
  // }
  //
  // @Post("users/logout/all")
  // @ApiOperation({
  //   summary: "Logout all users",
  //   description: "Log out all users.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: String })
  // async logoutAll(@Body() body) {
  //   return this.adminService.logoutAll(body);
  // }
  //
  // @Post("forgot-password")
  // @ApiOperation({
  //   summary: "Forgot password",
  //   description: "Initiate the process to reset forgotten password.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: String })
  // async forgotPassword(@Body() body) {
  //   return this.adminService.forgotPassword(body);
  // }
  //
  // @Put("reset-password/:token")
  // @ApiOperation({
  //   summary: "Reset password",
  //   description: "Reset password using the provided token.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: String })
  // async resetPassword(@Param("token") token, @Body() body) {
  //   return this.adminService.resetPassword(token, body);
  // }
  //
  // @Post("change-password")
  // @ApiOperation({
  //   summary: "Change password",
  //   description: "Change the password of the current user.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: String })
  // async changePassword(@Body() body) {
  //   return this.adminService.changePassword(body);
  // }
  //
  // @Get("merchants/requests/by-params/get")
  // @ApiOperation({
  //   summary: "Get merchant requests by parameters",
  //   description: "Retrieve merchant requests based on provided parameters.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: [BecomeMerchantRequests] })
  // async getRequestToBecomeMerchantByParams(@Query() query) {
  //   return this.adminService.getRequestToBecomeMerchantByParams(query);
  // }
  //
  // @Get("tiers/get-by-amount/:amount")
  // @ApiOperation({
  //   summary: "Get tier by amount",
  //   description: "Retrieve a tier based on the provided amount.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: Tier })
  // async getTierByAmount(@Param("amount") amount) {
  //   return this.adminService.getTierByAmount(amount);
  // }
  //
  // @Post("payments/verify-payments")
  // @ApiOperation({ summary: "Verify payments", description: "Verify payments." })
  // @ApiResponse({ status: HttpStatus.OK, type: String })
  // async verifyPayments(@Body() body) {
  //   return this.adminService.verifyPayments(body);
  // }
  //
  // @Get("active-merchants/get-all")
  // @ApiOperation({
  //   summary: "Get all active merchants",
  //   description: "Retrieve all active merchants.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: [UserResponse] })
  // async getAllActiveMerchants() {
  //   return this.adminService.getAllActiveMerchants();
  // }
  //
  // @Get(":id")
  // @ApiOperation({
  //   summary: "Get admin by ID",
  //   description: "Retrieve an admin by their ID.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  // async getAdminById(@Param("id") id) {
  //   return this.adminService.getAdminById(id);
  // }
  //
  // @Put(":id")
  // @ApiOperation({
  //   summary: "Update admin by ID",
  //   description: "Update an admin by their ID.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  // async updateAdminById(@Param("id") id, @Body() body) {
  //   return this.adminService.updateAdminById(id, body);
  // }
  //
  // @Put("users/:userId")
  // @ApiOperation({
  //   summary: "Update user by ID",
  //   description: "Update a user by their ID.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: User })
  // async updateUserByUserId(@Param("userId") userId, @Body() body) {
  //   return this.adminService.updateUserByUserId(userId, body);
  // }
  //
  // @Post("assign-role")
  // @ApiOperation({
  //   summary: "Assign role",
  //   description: "Assign a role to a user.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  // async assignRole(@Body() body) {
  //   return this.adminService.assignRole(body);
  // }
  //
  // @Put("suspend-user/:id")
  // @ApiOperation({
  //   summary: "Suspend user",
  //   description: "Suspend a user by their ID.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: User })
  // async suspendUser(@Param("id") id) {
  //   return this.adminService.suspendUser(id);
  // }
  //
  // @Delete("super-admin/delete-admin/:id")
  // @ApiOperation({
  //   summary: "Delete admin by ID",
  //   description: "Delete an admin by their ID.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: String })
  // async deleteAdminById(@Param("id") id) {
  //   return this.adminService.deleteAdminById(id);
  // }
  //
  // @Delete("delete-user/:id")
  // @ApiOperation({
  //   summary: "Delete user by ID",
  //   description: "Delete a user by their ID.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: String })
  // async deleteUserById(@Param("id") id) {
  //   return this.adminService.deleteUserById(id);
  // }
  //
  // @Put("super-admin/suspend-admin/:id")
  // @ApiOperation({
  //   summary: "Suspend admin",
  //   description: "Suspend an admin by their ID.",
  // })
  // @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  // async suspendAdminById(@Param("id") id) {
  //   return this.adminService.suspendAdminById(id);
  // }
}
