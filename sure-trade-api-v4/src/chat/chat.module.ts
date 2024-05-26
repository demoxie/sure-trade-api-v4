import { Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
