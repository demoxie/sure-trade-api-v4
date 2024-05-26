import { ConfigService } from "@nestjs/config";
import { RabbitmqProducer } from "../config/rabbitmq/service/rabbitmq-producer";
import { RequestIdentityDTO } from "../dto";
import { BecomeMerchantRequests } from "../models/become-a-merchant-request.model";
import { GiftCardTransaction } from "../models/gift-card-transaction.model";
import { User } from "../models/user.model";
export declare class MessageSenderService {
    private readonly configService;
    private readonly rabbitmq;
    constructor(configService: ConfigService, rabbitmq: RabbitmqProducer);
    sendAccountVerificationMessage: (otp: string, newUser: User) => Promise<void>;
    sendLoginNoticeMessage: (requestIdentity: RequestIdentityDTO, user: User) => Promise<void>;
    sendForgotPasswordMessage: (otp: string, existingUser: User, requestIdentity: RequestIdentityDTO) => Promise<void>;
    sendTransactionPinSetupMessage: (transactionPin: string, existingUser: User, requestIdentity: RequestIdentityDTO) => Promise<void>;
    sendBecomeMerchantRequestMessage(existingUser: User, request: BecomeMerchantRequests, activeAdmin: User): Promise<void>;
    sendGiftCardTransactionMessage: (transaction: GiftCardTransaction) => Promise<void>;
    sendApprovedBecomeMerchantRequestMessage(existingUser: User): Promise<void>;
    sendNewBankDetailsAddedMessage(existingUser: User): Promise<void>;
    sendAcceptedTransactionMessage(transaction: GiftCardTransaction): Promise<void>;
}
