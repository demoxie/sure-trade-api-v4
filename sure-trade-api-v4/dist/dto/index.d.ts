import { BecomeAMerchantRequestStatus, CardIssuer, CardStatus, CardType, GiftCardType, PaymentMethod, Role, SortDirection, TransactionStatus, TransactionType } from "../enums/enum";
export declare class APIResponse {
    message: string;
}
export declare class UserDeviceDetailsDTO {
    id: number;
    userId: number;
    role?: string;
    deviceToken: string;
    ip?: string;
    userAgent?: string;
    createdAt: Date;
    updatedAt?: Date;
}
export declare class SignupDTO {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    username: string;
    email: string;
    password: string;
    country: string;
    userDeviceDetails?: UserDeviceDetailsDTO;
}
export declare class SignUpPayload {
    firstName: string;
    lastName: string;
    createdAt: Date;
    password: string;
    phoneNumber: string;
    role: Role;
    tierId: number;
    isSuspended: boolean;
    isVerified: boolean;
    otp: string;
    isActive: boolean;
    email: string;
    username: string;
}
export declare class EmailQueuePayload {
    to: string;
    subject?: string;
    template: string;
    body?: object;
}
export declare class SmsPayload {
    notification: {
        title: string;
        body: string;
        sound: string;
        color: string;
        priority: string;
    };
    data: {
        title: string;
        body: string;
        type: string;
        transactionId: string;
    };
    android: {
        notification: {
            title: string;
            body: string;
            sound: string;
            color: string;
            priority: string;
        };
    };
    apns: {
        headers: {
            apnsPriority: string;
        };
    };
    token: string;
}
export declare class VerifyOtpDTO {
    otp: string;
}
export declare class JwtPayload {
    id: number;
    email: string;
    role: Role;
}
export declare class OtpVerificationResponse {
    token: string;
}
export declare class RequestIdentityDTO {
    userAgent: string;
    ipAddress: string;
    time: string;
}
export declare class LoginDto {
    email: string;
    password: string;
    requestIdentity?: RequestIdentityDTO;
}
export declare class UserResponse {
    id?: number;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    role: Role;
    otp?: string;
    isVerified: boolean;
    isActive: boolean;
    isSuspended: boolean;
    middleName?: string;
    token?: string;
    transactionPin?: string;
    walletAddress?: string;
    nonce?: string;
    telegram?: string;
    profilePicture?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    gender?: string;
    tierId?: number;
    transactionProfileId?: number;
    referralCodes?: any;
    telegramChatId?: string;
    updatedAt?: Date;
    createdAt: Date;
}
export declare class UpdateDTO {
    firstName?: string;
    lastName?: string;
    username?: string;
    phoneNumber?: string;
    middleName?: string;
    walletAddress?: string;
    telegram?: string;
    profilePicture?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    gender?: string;
    referralCodes?: any;
}
export declare class PasswordResetDTO {
    password: string;
    confirmPassword: string;
}
export declare class TransactionPinDTO {
    transactionPin: string;
    confirmTransactionPin: string;
}
export declare class ProfilePictureUpdateDTO {
    profileImage: string;
}
export declare class BecomeMerchantRequestDTO {
    amount: number;
    currency: string;
    userWalletAddress: string;
    email: string;
    phoneNumber?: string;
    transactionHashId?: string;
    country?: string;
    username?: string;
    lastName?: string;
    firstName?: string;
    status?: BecomeAMerchantRequestStatus;
    userId?: number;
}
export declare class RegisterTelegramDTO {
    username: string;
    chatId?: string;
}
export declare class GiftCardTransactionDTO {
    cardType?: CardType;
    cardIssuer?: CardIssuer;
    giftCardRateId?: number;
    giftCardId?: number;
    transactionType?: TransactionType;
    merchantId?: number;
    paymentMethod?: PaymentMethod;
    bankDetailsId?: number;
    referenceNo?: string;
    amount?: number;
    quantity?: number;
    currency?: string;
    cardValue?: number;
    cardCurrency?: string;
    paymentCurrency?: string;
    screenshots: {
        url: string[];
    };
    userId?: number;
    status?: TransactionStatus;
    createdAt?: Date;
    fee?: number;
}
export declare class GiftCardVO {
    id: number;
    userId: number;
    cardCode: string;
    cardPin: string;
    cardType: CardType;
    cardIssuer: string;
    currency: string;
    amount: number;
    quantity: number;
    cardValue: number;
    discount: number;
    expiryDate: Date;
    status: CardStatus;
    screenshots: any;
    createdAt: Date;
    updatedAt: Date;
}
export declare class GiftCardResponse {
    data?: GiftCardVO;
    message: string;
}
export declare class GiftCardsResponse {
    data?: GiftCardVO[];
    message: string;
}
export declare class BankDetailsDTO {
    id?: number;
    bankName: string;
    accountName: string;
    accountNumber: string;
    currency?: string;
    accountType?: string;
    bankCode?: string;
    bankCountry?: string;
    userId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class GiftCardTransactionResponse {
    id: number;
    giftCardId: number;
    giftCardRateId?: number;
    userId?: number;
    merchantId?: number;
    transactionType: string;
    cardType?: CardType;
    cardIssuer?: CardIssuer;
    paymentMethod?: PaymentMethod;
    bankDetailsId?: number;
    walletAddressId?: number;
    amount: number;
    quantity: number;
    fee: number;
    currency: string;
    referenceNo?: string;
    status: string;
    user: UserResponse;
    merchant: UserResponse;
    giftCard: GiftCardResponse;
    bankDetails: BankDetailsDTO;
    createdAt: Date;
    updatedAt?: Date;
}
export declare class GiftCardRateDTO {
    cardName?: string;
    merchantId?: number;
    currency: string;
    giftCardCurrency?: string;
    giftCardType: GiftCardType;
    transactionType: TransactionType;
    paymentMethod: string;
    bankDetailsId: number;
    walletAddressId?: number;
    maxLimit: number;
    minLimit: number;
    rate: number;
    status?: string;
    screenshots?: any;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class GiftCardDTO {
    userId?: number;
    cardCode?: string;
    cardPin?: string;
    cardType?: CardType;
    cardIssuer: string;
    currency: string;
    amount?: number;
    quantity: number;
    cardValue: number;
    discount?: number;
    expiryDate?: string;
    status?: CardStatus;
    screenshots?: any;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class SearchGiftCardQueryParams {
    currency: string;
    name: string;
}
export declare class ChatDTO {
    senderId?: number;
    receiverId: number;
    transactionId?: number;
    giftCardId?: number;
    cryptoCoinId?: number;
    assetName?: string;
    message?: string;
    screenshots?: any;
    isRead?: boolean;
}
export declare class ChatResponse {
    id?: number;
    senderId?: number;
    receiverId: number;
    transactionId?: number;
    giftCardId?: number;
    cryptoCoinId?: number;
    assetName?: string;
    message?: string;
    screenshots?: any;
    isRead?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class PageRequest {
    page: number;
    limit: number;
    sortBy: string;
    sortDirection: SortDirection;
}
export declare class AcceptRejectTransactionDTO {
    status: TransactionStatus;
    reason?: string;
}
export declare class ApproveBecomeMerchantRequestDTO {
    adminId: number;
}
export declare class SupportedGiftCard {
    id: string;
    name: string;
    image: string;
    currency: string[];
}
