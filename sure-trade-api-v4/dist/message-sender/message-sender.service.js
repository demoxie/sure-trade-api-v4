"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSenderService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rabbitmq_producer_1 = require("../config/rabbitmq/service/rabbitmq-producer");
let MessageSenderService = class MessageSenderService {
    constructor(configService, rabbitmq) {
        this.configService = configService;
        this.rabbitmq = rabbitmq;
        this.sendAccountVerificationMessage = async (otp, newUser) => {
            const email = {
                body: {
                    name: newUser.firstName,
                    otp: otp,
                },
                template: "account-verification",
                to: newUser.email,
                from: this.configService.get("MAIL_SENDER"),
                subject: "Account Verification",
            };
            const queue = {
                emailToUser: email,
            };
            await this.rabbitmq.sendMessage(queue, "notification_exchange", "notification_routing_key");
        };
        this.sendLoginNoticeMessage = async (requestIdentity, user) => {
            const email = {
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
            const queue = {
                emailToUser: email,
            };
            await this.rabbitmq.sendMessage(queue, "notification_exchange", "notification_routing_key");
        };
        this.sendForgotPasswordMessage = async (otp, existingUser, requestIdentity) => {
            const email = {
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
            const queue = {
                emailToUser: email,
            };
            await this.rabbitmq.sendMessage(queue, "notification_exchange", "notification_routing_key");
        };
        this.sendTransactionPinSetupMessage = async (transactionPin, existingUser, requestIdentity) => {
            const email = {
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
            const sms = {
                to: existingUser.phoneNumber,
                from: this.configService.get("TWILIO_PHONE_NUMBER"),
            };
            const queue = {
                emailToUser: email,
                smsToUser: sms,
            };
            await this.rabbitmq.sendMessage(queue, "notification_exchange", "notification_routing_key");
        };
        this.sendGiftCardTransactionMessage = async (transaction) => {
            console.log("Transaction Dealing with is ::: " + JSON.stringify(transaction));
            const merchant = transaction["merchant"];
            const existingUser = transaction["user"];
            const giftCard = transaction["giftCard"];
            console.log("Gift Card Dealing with is ::: " + JSON.stringify(giftCard));
            const giftCardRate = transaction["giftCardRate"];
            const bankDetails = transaction["bankDetails"];
            const emailToUser = {
                body: {
                    username: existingUser.username,
                    transactionReference: transaction.referenceNo,
                },
                template: "new-transaction-feedback",
                to: existingUser.email,
                from: this.configService.get("MAIL_SENDER"),
                subject: "Transaction Posted",
            };
            const emailToMerchant = {
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
            const queue = {
                emailToUser: emailToUser,
                emailToMerchant: emailToMerchant,
                telegramToUser: telegramToUser ? telegramToUser : null,
                telegramToMerchant: telegramToMerchant ? telegramToMerchant : null,
            };
            await this.rabbitmq.sendMessage(queue, "notification_exchange", "notification_routing_key");
        };
    }
    async sendBecomeMerchantRequestMessage(existingUser, request, activeAdmin) {
        const emailToUser = {
            body: {
                username: existingUser.username,
            },
            template: "become-a-merchant-request-sent",
            to: existingUser.email,
            from: this.configService.get("MAIL_SENDER"),
            subject: "Request Sent",
        };
        const emailToAdmin = {
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
        const queue = {
            emailToUser: emailToUser,
            emailToAdmin: emailToAdmin,
            telegramToUser: telegramToUser ? telegramToUser : null,
            telegramToAdmin: telegramToAdmin ? telegramToAdmin : null,
        };
        await this.rabbitmq.sendMessage(queue, "notification_exchange", "notification_routing_key");
    }
    async sendApprovedBecomeMerchantRequestMessage(existingUser) {
        const emailToUser = {
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
        const queue = {
            emailToUser: emailToUser,
            telegramToUser: telegramToUser ? telegramToUser : null,
        };
        await this.rabbitmq.sendMessage(queue, "notification_exchange", "notification_routing_key");
    }
    async sendNewBankDetailsAddedMessage(existingUser) {
        const emailToUser = {
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
        const queue = {
            emailToUser: emailToUser,
            telegramToUser: telegramToUser ? telegramToUser : null,
        };
        await this.rabbitmq.sendMessage(queue, "notification_exchange", "notification_routing_key");
    }
    async sendAcceptedTransactionMessage(transaction) {
        const merchant = transaction["merchant"];
        const existingUser = transaction["user"];
        console.log("USER username:::::::::::::::::::::::::::::" + existingUser.username);
        const emailToUser = {
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
        const emailToMerchant = {
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
        const queue = {
            emailToUser: emailToUser,
            emailToMerchant: emailToMerchant,
            telegramToUser: telegramToUser ? telegramToUser : null,
            telegramToMerchant: telegramToMerchant ? telegramToMerchant : null,
        };
        await this.rabbitmq.sendMessage(queue, "notification_exchange", "notification_routing_key");
    }
};
exports.MessageSenderService = MessageSenderService;
exports.MessageSenderService = MessageSenderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        rabbitmq_producer_1.RabbitmqProducer])
], MessageSenderService);
//# sourceMappingURL=message-sender.service.js.map