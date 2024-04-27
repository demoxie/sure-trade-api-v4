import { EmailModel } from "./email.model";
import { PushyMessage } from "./notification.model";
import { SmsMessage } from "./sms.model";
import { TelegramMessage } from "./telegram-message.model";

export class QueueMessage {
  email?: EmailModel;
  notification?: PushyMessage;
  sms?: SmsMessage;
  telegram?: TelegramMessage;
}
