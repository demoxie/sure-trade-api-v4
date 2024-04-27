import { Module } from '@nestjs/common';
import { MessageSenderService } from './message-sender.service';

@Module({
  providers: [MessageSenderService]
})
export class MessageSenderModule {}
