import { Injectable } from "@nestjs/common";
import { User } from "../api/models/user.model";
import { EmailModel } from "../config/rabbitmq/model/email.model";
import { SmsMessage } from "../config/rabbitmq/model/sms.model";
import { QueueMessage } from "../config/rabbitmq/model/queue-message.model";
import { ConfigService } from "@nestjs/config";
import { RabbitmqProducer } from "../config/rabbitmq/service/rabbitmq-producer";
import { RequestIdentityDTO } from "../api/dto";
import { BecomeMerchantRequests } from "../api/models/become-a-merchant-request.model";
import { GiftCardTransaction } from "../api/models/gift-card-transaction.model";
import { GiftCard } from "../api/models/gift-card.model";
import { GiftCardRate } from "../api/models/gift-card-rate.model";
import { BankDetails } from "../api/models/bank-details";

@Injectable()
export class MessageSenderService {
  constructor(
    private readonly configService: ConfigService,
    private readonly rabbitmq: RabbitmqProducer,
  ) {}

  sendAccountVerificationMessage = async (otp: string, newUser: User) => {
    const email: EmailModel = {
      body: {
        name: newUser.firstName,
        otp: otp,
      },
      template: "account-verification",
      to: newUser.email,
      from: this.configService.get("MAIL_SENDER"),
      subject: "Account Verification",
    };
    // const sms: SmsMessage = {
    //   to: newUser.phoneNumber,
    //   from: this.configService.get("TWILIO_PHONE_NUMBER"),
    // };
    const queue: QueueMessage = {
      emailToUser: email,
    };

    await this.rabbitmq.sendMessage(
      queue,
      "notification_exchange",
      "notification_routing_key",
    );
  };
  public sendLoginNoticeMessage = async (
    requestIdentity: RequestIdentityDTO,
    user: User,
  ) => {
    const email: EmailModel = {
      body: {
        username: user.username,
        userAgent: requestIdentity.userAgent,
        ipAddress: requestIdentity.ipAddress,
        time: requestIdentity.time,
      },
      template: "login-notice",
      to: user.email,
      from: this.configService.get("MAIL_SENDER"),
      subject: "Login Notice",
    };
    const queue: QueueMessage = {
      emailToUser: email,
    };

    await this.rabbitmq.sendMessage(
      queue,
      "notification_exchange",
      "notification_routing_key",
    );
  };

  sendForgotPasswordMessage = async (
    otp: string,
    existingUser: User,
    requestIdentity: RequestIdentityDTO,
  ) => {
    const email: EmailModel = {
      body: {
        username: existingUser.username,
        userAgent: requestIdentity.userAgent,
        ipAddress: requestIdentity.ipAddress,
        time: requestIdentity.time,
        otp: otp,
      },
      template: "password-reset",
      to: existingUser.email,
      from: this.configService.get("MAIL_SENDER"),
      subject: "Password Reset",
    };
    const queue: QueueMessage = {
      emailToUser: email,
    };

    await this.rabbitmq.sendMessage(
      queue,
      "notification_exchange",
      "notification_routing_key",
    );
  };

  sendTransactionPinSetupMessage = async (
    transactionPin: string,
    existingUser: User,
    requestIdentity: RequestIdentityDTO,
  ) => {
    const email: EmailModel = {
      body: {
        username: existingUser.username,
        userAgent: requestIdentity.userAgent,
        ipAddress: requestIdentity.ipAddress,
        time: requestIdentity.time,
        transactionPin: transactionPin,
      },
      template: "transaction-pin-setup",
      to: existingUser.email,
      from: this.configService.get("MAIL_SENDER"),
      subject: "Transaction Pin Set",
    };
    const sms: SmsMessage = {
      to: existingUser.phoneNumber,
      from: this.configService.get("TWILIO_PHONE_NUMBER"),
    };
    const queue: QueueMessage = {
      emailToUser: email,
      smsToUser: sms,
    };

    await this.rabbitmq.sendMessage(
      queue,
      "notification_exchange",
      "notification_routing_key",
    );
  };

  async sendBecomeMerchantRequestMessage(
    existingUser: User,
    request: BecomeMerchantRequests,
    activeAdmin: User,
  ) {
    const emailToUser: EmailModel = {
      body: {
        username: existingUser.username,
      },
      template: "become-a-merchant-request-sent",
      to: existingUser.email,
      from: this.configService.get("MAIL_SENDER"),
      subject: "Request Sent",
    };
    const emailToAdmin: EmailModel = {
      body: {
        username: activeAdmin.username,
        nameOfMerchantToBe: existingUser.username,
      },
      template: "become-a-merchant-request",
      to: activeAdmin.email,
      from: this.configService.get("MAIL_SENDER"),
      subject: "Request To Become Merchant",
    };

    const telegramToUser = existingUser.telegramChatId && {
      chatId: existingUser.telegramChatId,
      message: "requestToBecomeMerchantSent",
    };

    const telegramToAdmin = activeAdmin.telegramChatId && {
      chatId: activeAdmin.telegramChatId,
      message: "requestToBecomeMerchantReceived",
    };
    console.log("Ok o I hear try4");
    const queue: QueueMessage = {
      emailToUser: emailToUser,
      emailToAdmin: emailToAdmin,
      telegramToUser: telegramToUser ? telegramToUser : null,
      telegramToAdmin: telegramToAdmin ? telegramToAdmin : null,
    };

    await this.rabbitmq.sendMessage(
      queue,
      "notification_exchange",
      "notification_routing_key",
    );
  }

  sendGiftCardTransactionMessage = async (transaction: GiftCardTransaction) => {
    console.log(
      "Transaction Dealing with is ::: " + JSON.stringify(transaction),
    );
    const merchant: User = transaction["merchant"];
    const existingUser: User = transaction["user"];
    const giftCard: GiftCard = transaction["giftCard"];
    console.log("Gift Card Dealing with is ::: " + JSON.stringify(giftCard));
    const giftCardRate: GiftCardRate = transaction["giftCardRate"];
    const bankDetails: BankDetails = transaction["bankDetails"];
    const emailToUser: EmailModel = {
      body: {
        username: existingUser.username,
        transactionReference: transaction.referenceNo,
      },
      template: "new-transaction-feedback",
      to: existingUser.email,
      from: this.configService.get("MAIL_SENDER"),
      subject: "Transaction Posted",
    };

    const emailToMerchant: EmailModel = {
      body: {
        username: merchant.username,
        name: merchant.username,
        transactionReference: transaction.referenceNo,
        cardType: transaction.cardType,
        cardIssuer: transaction.cardIssuer,
        quantity: transaction.quantity,
        pricePerUnit: giftCard.cardValue,
        total: transaction.amount,
        cardCurrency: giftCard.currency,
        paymentCurrency: bankDetails.currency,
        link: giftCard.screenshots.url[0],
      },
      template: "gift-card-transaction.html",
      to: merchant.email,
      from: this.configService.get("MAIL_SENDER"),
      subject: "Gift Card Transaction",
    };

    const telegramToUser = existingUser.telegramChatId && {
      chatId: existingUser.telegramChatId,
      message: "requestToBecomeMerchantSent",
    };

    const telegramToMerchant = existingUser.telegramChatId && {
      chatId: merchant.telegramChatId,
      message: "requestToBecomeMerchant",
    };

    const queue: QueueMessage = {
      emailToUser: emailToUser,
      emailToMerchant: emailToMerchant,
      telegramToUser: telegramToUser ? telegramToUser : null,
      telegramToMerchant: telegramToMerchant ? telegramToMerchant : null,
    };

    await this.rabbitmq.sendMessage(
      queue,
      "notification_exchange",
      "notification_routing_key",
    );
  };

  async sendApprovedBecomeMerchantRequestMessage(existingUser: User) {
    const emailToUser: EmailModel = {
      body: {
        username: existingUser.username,
      },
      template: "become-a-merchant-request-accepted",
      to: existingUser.email,
      from: this.configService.get("MAIL_SENDER"),
      subject: "Request Approved",
    };

    const telegramToUser = existingUser.telegramChatId && {
      chatId: existingUser.telegramChatId,
      message: "requestToBecomeMerchantSent",
    };

    const queue: QueueMessage = {
      emailToUser: emailToUser,
      telegramToUser: telegramToUser ? telegramToUser : null,
    };

    await this.rabbitmq.sendMessage(
      queue,
      "notification_exchange",
      "notification_routing_key",
    );
  }

  async sendNewBankDetailsAddedMessage(existingUser: User) {
    const emailToUser: EmailModel = {
      body: {
        name: existingUser.username,
      },
      template: "new-bank-details",
      to: existingUser.email,
      from: this.configService.get("MAIL_SENDER"),
      subject: "New Bank Details Added",
    };

    const telegramToUser = existingUser.telegramChatId && {
      chatId: existingUser.telegramChatId,
      message: "requestToBecomeMerchantSent",
    };

    const queue: QueueMessage = {
      emailToUser: emailToUser,
      telegramToUser: telegramToUser ? telegramToUser : null,
    };

    await this.rabbitmq.sendMessage(
      queue,
      "notification_exchange",
      "notification_routing_key",
    );
  }

  async sendAcceptedTransactionMessage(transaction: GiftCardTransaction) {
    const merchant: User = transaction["merchant"];
    const existingUser: User = transaction["user"];
    console.log(
      "USER username:::::::::::::::::::::::::::::" + existingUser.username,
    );
    const emailToUser: EmailModel = {
      body: {
        username: existingUser.username,
        merchantName: merchant.username,
        transactionReference: transaction.referenceNo,
      },
      template: "transaction-accepted",
      to: existingUser.email,
      from: this.configService.get("MAIL_SENDER"),
      subject: "Transaction Accepted",
    };

    const emailToMerchant: EmailModel = {
      body: {
        username: merchant.username,
        name: merchant.username,
        transactionReference: transaction.referenceNo,
      },
      template: "transaction-accepted-feedback",
      to: merchant.email,
      from: this.configService.get("MAIL_SENDER"),
      subject: "Transaction Acceptance Confirmation",
    };

    const telegramToUser = existingUser.telegramChatId && {
      chatId: existingUser.telegramChatId,
      message: "requestToBecomeMerchantSent",
    };

    const telegramToMerchant = existingUser.telegramChatId && {
      chatId: merchant.telegramChatId,
      message: "requestToBecomeMerchant",
    };

    const queue: QueueMessage = {
      emailToUser: emailToUser,
      emailToMerchant: emailToMerchant,
      telegramToUser: telegramToUser ? telegramToUser : null,
      telegramToMerchant: telegramToMerchant ? telegramToMerchant : null,
    };

    await this.rabbitmq.sendMessage(
      queue,
      "notification_exchange",
      "notification_routing_key",
    );
  }
}
