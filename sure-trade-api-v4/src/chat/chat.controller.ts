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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { HttpExceptionFilter } from "../exception/HttpExceptionFilter";
import { AuthGuard, Roles } from "../auth/service/auth.guard";
import { ChatService } from "./chat.service";
import { Role } from "../enums/enum";
import { RolesGuard } from "../auth/service/role.guard";
import { ChatDTO, ChatResponse } from "../dto";
import { Request } from "express";
import { UserController } from "../user/controller/user.controller";

@Controller("/chat")
@ApiTags("Chat Controller")
@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get All Chats",
    description: "Endpoint to retrieve all chats.",
  })
  @ApiResponse({ status: HttpStatus.OK, type: [ChatResponse] })
  async getChats() {
    return this.chatService.getChats();
  }

  @Get(":id")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Chat by ID",
    description: "Endpoint to retrieve a chat by ID.",
  })
  @ApiResponse({ status: HttpStatus.OK, type: ChatResponse })
  async getChatById(@Param("id") id: number) {
    return this.chatService.getChatById(id);
  }

  @Get("user/:userId/transactions/:transactionId")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Chat by User ID and Transaction ID",
    description: "Endpoint to retrieve a chat by user ID and transaction ID.",
  })
  @ApiResponse({ status: HttpStatus.OK, type: ChatResponse })
  async getChatByUserId(
    @Param("userId") userId: number,
    @Param("transactionId") transactionId: number,
  ) {
    return this.chatService.getChatByUserId(userId, transactionId);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Create Chat",
    description: "Endpoint to create a new chat.",
  })
  @ApiResponse({ status: HttpStatus.OK, type: ChatResponse })
  async createChat(@Body() chatDto: ChatDTO, @Req() req: Request) {
    return this.chatService.createChat(UserController.getJwtUser(req), chatDto);
  }

  @Put(":id")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update Chat by ID",
    description: "Endpoint to update a chat by ID.",
  })
  @ApiResponse({ status: HttpStatus.OK, type: ChatResponse })
  async updateChatById(
    @Param("id") id: number,
    @Body() chatDto: ChatDTO,
    @Req() req: Request,
  ) {
    return this.chatService.updateChatById(
      id,
      UserController.getJwtUser(req),
      chatDto,
    );
  }

  @Delete(":id")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Delete Chat by ID",
    description: "Endpoint to delete a chat by ID.",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Chat deleted successfully.",
  })
  async deleteChat(@Param("id") id: number, @Req() req: Request) {
    return this.chatService.deleteChat(id, UserController.getJwtUser(req));
  }

  @Get("between/:receiverId/me/transactions/:transactionId")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get Chat Between Users",
    description:
      "Endpoint to retrieve chats between authenticated user and another user by ID.",
  })
  @ApiResponse({ status: HttpStatus.OK, type: [ChatResponse] })
  async getChatBetweenUsers(
    @Param("receiverId") receiverId: number,
    @Param("transactionId") transactionId: number,
    @Req() req: Request,
  ) {
    return this.chatService.getChatBetweenUsers(
      UserController.getJwtUser(req).id,
      receiverId,
      transactionId,
    );
  }

  @Get("my/unread/get-all/transactions/:transactionId")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get All My Unread Chats",
    description:
      "Endpoint to retrieve all unread chats for the authenticated user.",
  })
  @ApiResponse({ status: HttpStatus.OK, type: [ChatResponse] })
  async getUnreadChats(
    @Param("transactionId") transactionId: number,
    @Req() req: Request,
  ) {
    return this.chatService.getUnreadChats(
      UserController.getJwtUser(req),
      transactionId,
    );
  }

  @Get("my/unread/users/:userId/get-all/transactions/:transactionId")
  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.MERCHANT, Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get All My Unread Chats with User by User ID",
    description:
      "Endpoint to retrieve all unread chats with a specific user by user ID for the authenticated user.",
  })
  @ApiResponse({ status: HttpStatus.OK, type: [ChatResponse] })
  async getUnreadChatsWithUserByUserId(
    @Param("userId") userId: number,
    @Param("transactionId") transactionId: number,
    @Req() req: Request,
  ) {
    return this.chatService.getUnreadChatsWithUserByUserId(
      UserController.getJwtUser(req).id,
      userId,
      transactionId,
    );
  }
}
