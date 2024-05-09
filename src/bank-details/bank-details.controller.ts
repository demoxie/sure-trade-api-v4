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
import { BankDetailsService } from "./bank-details.service";
import { BankDetailsDTO } from "../api/dto";
import { Request } from "express";
import { UserController } from "../api/controller/user.controller";
import { RolesGuard } from "../auth/service/role.guard";
import { AuthGuard, Roles } from "../auth/service/auth.guard";
import { Role } from "../enums/enum";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { HttpExceptionFilter } from "../exception/HttpExceptionFilter";

@ApiTags("Bank Details Controller")
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller("/bank-details")
export class BankDetailsController {
  constructor(private readonly bankDetailsService: BankDetailsService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Add Bank Details",
    description: "Add Bank Details",
  })
  @ApiResponse({ type: BankDetailsDTO })
  @Post("/")
  async addBankDetails(@Body() dto: BankDetailsDTO, @Req() req: Request) {
    const jwtUser = UserController.getJwtUser(req);
    return await this.bankDetailsService.addBankDetails(jwtUser, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get All Bank Details",
    description: "Get All Bank Details",
  })
  @ApiResponse({ type: [BankDetailsDTO] })
  @Get()
  async getAllBankDetails() {
    return await this.bankDetailsService.getAllBankDetails();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Bank Details By Id",
    description: "Get Bank Details By Id",
  })
  @ApiResponse({ type: BankDetailsDTO })
  @Get(":id")
  async getBankDetailById(@Param("id") id: number) {
    return await this.bankDetailsService.getBankDetailById(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get My Bank Details",
    description: "Get My Bank Details",
  })
  @ApiResponse({ type: BankDetailsDTO })
  @Get("mine/all")
  async getMyBankDetails(@Req() req: Request) {
    return await this.bankDetailsService.getMyBankDetails(
      UserController.getJwtUser(req),
    );
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get User Bank Details",
    description: "Get User Bank Details",
  })
  @ApiResponse({ type: BankDetailsDTO })
  @Get("user/:id")
  async getUserBankDetails(@Param("id") id: number) {
    return await this.bankDetailsService.getUserBankDetails(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Bank Details By Account number",
    description: "Get Bank Details By Account number",
  })
  @ApiResponse({ type: BankDetailsDTO })
  @Get("account-numbers/:accountNumber")
  async getBankDetailsByAccountNumber(
    @Param("accountNumber") accountNumber: string,
  ) {
    return await this.bankDetailsService.getBankDetailsByAccountNumber(
      accountNumber,
    );
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update Bank Details",
    description: "Update Bank Details",
  })
  @ApiResponse({ type: BankDetailsDTO })
  @Put(":id")
  async updateBankDetail(
    @Param("id") id: number,
    @Body() bankDetailDto: BankDetailsDTO,
  ) {
    return await this.bankDetailsService.updateBankDetail(id, bankDetailDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Delete Bank Details By Id",
    description: "Delete Bank Details By Id",
  })
  @ApiResponse({ type: String })
  @Delete(":id")
  async deleteBankDetail(@Param("id") id: number) {
    return await this.bankDetailsService.deleteBankDetail(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Delete Bank Details By Account number",
    description: "Delete Bank Details By Account number",
  })
  @ApiResponse({ type: String })
  @Delete("by-account-number/:accountNumber")
  async deleteBankDetailByAccountNumber(
    @Param("accountNumber") accountNumber: string,
  ) {
    return await this.bankDetailsService.deleteBankDetailByAccountNumber(
      accountNumber,
    );
  }
}
