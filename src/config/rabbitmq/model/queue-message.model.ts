import { EmailModel } from "./email.model";
import { PushyMessage } from "./notification.model";
import { SmsMessage } from "./sms.model";
import { TelegramMessage } from "./telegram-message.model";

export class QueueMessage {
  emailToUser?: EmailModel;
  emailToMerchant?: EmailModel;
  emailToAdmin?: EmailModel;
  notificationToUser?: PushyMessage;
  notificationMerchant?: PushyMessage;
  smsToUser?: SmsMessage;
  smsToMerchant?: SmsMessage;
  telegramToUser?: TelegramMessage;
  telegramToMerchant?: TelegramMessage;
  telegramToAdmin?: TelegramMessage;
}
