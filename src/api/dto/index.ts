import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  IsStrongPassword,
} from "class-validator";
import {
  BecomeAMerchantRequestStatus,
  CardIssuer,
  CardType,
  GiftCardType,
  PaymentMethod,
  Role,
  SortDirection,
  TransactionStatus,
  TransactionType,
} from "../../enums/enum";

export class UserDeviceDetailsDTO {
  @ApiProperty({ type: "integer" })
  @IsNumber()
  id: number;

  @ApiProperty({ type: "integer" })
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty()
  @IsString()
  deviceToken: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  ip?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  userAgent?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

export class SignupDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: "First name is required" })
  firstName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: "Last name is required" })
  lastName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: "Phone number is required" })
  phoneNumber: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: "Username is required" })
  username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: "Password is required" })
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: "Country is required" })
  country: string;

  userDeviceDetails?: UserDeviceDetailsDTO;
}

export class SignUpPayload {
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

export class EmailQueuePayload {
  to: string;
  subject?: string;
  template: string;
  body?: object;
}

export class SmsPayload {
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

export class VerifyOtpDTO {
  @ApiProperty({ required: true, example: "1234" })
  otp: string;
}

export class JwtPayload {
  id: number;
  email: string;
  role: Role;
}

export class OtpVerificationResponse {
  token: string;
}

export class RequestIdentityDTO {
  userAgent: string;
  ipAddress: string;
  time: string;
}

export class LoginDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail()
  email: string;
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty({ message: "Password is required" })
  @IsStrongPassword()
  password: string;
  requestIdentity?: RequestIdentityDTO;
}

export class UserResponse {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  id?: number;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsOptional()
  @IsString()
  otp?: string;

  @ApiProperty()
  @IsBoolean()
  isVerified: boolean;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsBoolean()
  isSuspended: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  token?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  transactionPin?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  walletAddress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nonce?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  telegram?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  tierId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  transactionProfileId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  referralCodes?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  telegramChatId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  updatedAt?: Date;

  @ApiProperty()
  @IsDateString()
  createdAt: Date;
}

export class UpdateDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  walletAddress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  telegram?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  referralCodes?: any;
}

export class PasswordResetDTO {
  @ApiProperty({ required: true, type: String, minLength: 8 })
  @IsStrongPassword({ minLength: 8 }, { message: "Password is not Strong" })
  @IsNotEmpty({ message: "Password Is Required" })
  password: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty({ message: "Confirm Password Is Required" })
  confirmPassword: string;
}

export class TransactionPinDTO {
  @ApiProperty({ required: true, maxLength: 4 })
  @IsString()
  @IsNotEmpty()
  transactionPin: string;

  @ApiProperty({ required: true, maxLength: 4 })
  @IsString()
  @IsNotEmpty()
  confirmTransactionPin: string;
}

export class ProfilePictureUpdateDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  profileImage: string;
}

export class BecomeMerchantRequestDTO {
  @ApiProperty({ required: true, type: Number })
  @IsNumber()
  amount: number;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsOptional()
  currency: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  userWalletAddress: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  transactionHashId?: string;
  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  country?: string;
  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  username?: string;
  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  lastName?: string;
  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  firstName?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  status?: BecomeAMerchantRequestStatus;
  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  userId?: number;
}

export class RegisterTelegramDTO {
  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  chatId?: string;
}

export class GiftCardTransactionDTO {
  @ApiProperty({ enum: CardType, example: "VIRTUAL" })
  @IsOptional()
  @IsEnum(CardType)
  cardType?: CardType;

  @ApiProperty({ enum: CardIssuer, example: "AMAZON" })
  @IsOptional()
  @IsEnum(CardIssuer)
  cardIssuer?: CardIssuer;

  @ApiProperty({ type: "integer", example: 26 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  giftCardRateId?: number;

  @ApiProperty({ type: "integer", example: 93 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  giftCardId?: number;

  @ApiProperty({ enum: TransactionType, example: "SELL" })
  @IsOptional()
  @IsEnum(TransactionType)
  transactionType?: TransactionType;

  @ApiProperty({ type: "integer", example: 73 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  merchantId?: number;

  @ApiProperty({ enum: PaymentMethod, example: "BANK_TRANSFER" })
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @ApiProperty({ type: "integer", example: 9 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  bankDetailsId?: number;

  @ApiProperty({ example: "GC-409864697" })
  @IsOptional()
  @IsString()
  referenceNo?: string;

  @ApiProperty({ type: "number", example: 200.0 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount?: number;

  @ApiProperty({ type: "integer", example: 10 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @ApiProperty({ example: "NGN" })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ example: "123456789" })
  @IsOptional()
  @IsNumber()
  cardValue?: number;

  @ApiProperty({ example: "USD" })
  @IsOptional()
  @IsString()
  cardCurrency?: string;

  @ApiProperty({ example: "USD" })
  @IsOptional()
  @IsString()
  paymentCurrency?: string;

  screenshots: {
    url: string[];
  };

  @ApiProperty({ example: "10" })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsString()
  status?: TransactionStatus;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @ApiProperty({ type: "number", example: "10.00" })
  @IsOptional()
  @IsNumber()
  fee?: number;
}

export class GiftCardResponse {
  @ApiProperty({ type: "integer" })
  @IsNumber()
  id: number;

  @ApiProperty({ type: "integer" })
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cardCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cardPin?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(CardType)
  cardType?: CardType;

  @ApiProperty()
  @IsString()
  cardIssuer: string;

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty({ type: "number" })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ type: "integer" })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({ type: "number" })
  @IsNumber()
  cardValue: number;

  @ApiProperty({ type: "number" })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiProperty({ type: "string", format: "date" })
  @IsOptional()
  @IsDate()
  expiryDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty()
  @IsOptional()
  screenshots?: any;

  @ApiProperty({ type: "string", format: "date-time" })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

export class BankDetailsDTO {
  @ApiProperty({ type: "integer" })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsString()
  bankName: string;

  @ApiProperty()
  @IsString()
  accountName: string;

  @ApiProperty()
  @IsString()
  accountNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  accountType?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bankCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bankCountry?: string;

  @ApiProperty({ type: "integer" })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiProperty({ type: "string", format: "date-time" })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

export class GiftCardTransactionResponse {
  @ApiProperty({ type: "integer" })
  @IsNumber()
  id: number;

  @ApiProperty({ type: "integer" })
  @IsNumber()
  giftCardId: number;

  @ApiProperty({ type: "integer" })
  @IsOptional()
  @IsNumber()
  giftCardRateId?: number;

  @ApiProperty({ type: "integer" })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiProperty({ type: "integer" })
  @IsOptional()
  @IsNumber()
  merchantId?: number;

  @ApiProperty()
  @IsString()
  transactionType: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(CardType)
  cardType?: CardType;

  @ApiProperty()
  @IsOptional()
  @IsEnum(CardIssuer)
  cardIssuer?: CardIssuer;

  @ApiProperty()
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @ApiProperty({ type: "integer" })
  @IsOptional()
  @IsNumber()
  bankDetailsId?: number;

  @ApiProperty({ type: "integer" })
  @IsOptional()
  @IsNumber()
  walletAddressId?: number;

  @ApiProperty({ type: "number" })
  @IsNumber()
  amount: number;

  @ApiProperty({ type: "integer" })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({ type: "number" })
  @IsNumber()
  @IsPositive()
  fee: number;

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  referenceNo?: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  user: UserResponse;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  merchant: UserResponse;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  giftCard: GiftCardResponse;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  bankDetails: BankDetailsDTO;

  @ApiProperty({ type: "string", format: "date-time" })
  @IsString()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  @IsOptional()
  @IsString()
  updatedAt?: Date;
}

export class GiftCardRateDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  cardName?: string;

  @ApiProperty({ type: "integer" })
  @IsOptional()
  @IsNumber()
  merchantId?: number;

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  giftCardCurrency?: string;

  @ApiProperty()
  @IsEnum(GiftCardType)
  giftCardType: GiftCardType;

  @ApiProperty()
  @IsString()
  transactionType: TransactionType;

  @ApiProperty()
  @IsString()
  paymentMethod: string;

  @ApiProperty({ type: "integer" })
  @IsNumber()
  bankDetailsId: number;

  @ApiProperty({ type: "integer" })
  @IsOptional()
  @IsNumber()
  walletAddressId?: number;

  @ApiProperty({ type: "number" })
  @IsNumber()
  maxLimit: number;

  @ApiProperty({ type: "number" })
  @IsNumber()
  minLimit: number;

  @ApiProperty({ type: "number" })
  @IsNumber()
  rate: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty()
  @IsOptional()
  screenshots?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export class GiftCardDTO {
  @ApiProperty({ type: "integer" })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cardCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cardPin?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(CardType)
  cardType?: CardType;

  @ApiProperty()
  @IsString()
  cardIssuer: string;

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty({ type: "number" })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ type: "integer" })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({ type: "number" })
  @IsNumber()
  cardValue: number;

  @ApiProperty({ type: "number" })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiProperty()
  @IsOptional()
  expiryDate?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty()
  @IsOptional()
  screenshots?: any;

  createdAt?: Date;
  updatedAt?: Date;
}

export class SearchGiftCardQueryParams {
  @ApiProperty({ type: "string" })
  @IsOptional()
  @IsString()
  currency: string;

  @ApiProperty({ type: "string" })
  @IsOptional()
  @IsString()
  name: string;
}

export class ChatDTO {
  @ApiProperty({ type: "integer" })
  @IsNumber()
  senderId?: number;

  @ApiProperty({ type: "integer" })
  @IsNumber()
  receiverId: number;

  @ApiProperty({ type: "integer" })
  @IsOptional()
  @IsNumber()
  transactionId?: number;

  @ApiProperty({ type: "integer" })
  @IsOptional()
  @IsNumber()
  giftCardId?: number;

  @ApiProperty({ type: "integer" })
  @IsOptional()
  @IsNumber()
  cryptoCoinId?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  assetName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty()
  @IsOptional()
  screenshots?: any;

  isRead?: boolean;
}

export class ChatResponse {
  @ApiProperty({ type: "integer" })
  @IsNumber()
  id?: number;

  @ApiProperty({ type: "integer" })
  @IsNumber()
  senderId?: number;

  @ApiProperty({ type: "integer" })
  @IsNumber()
  receiverId: number;

  @ApiProperty({ type: "integer" })
  @IsOptional()
  @IsNumber()
  transactionId?: number;

  @ApiProperty({ type: "integer" })
  @IsOptional()
  @IsNumber()
  giftCardId?: number;

  @ApiProperty({ type: "integer" })
  @IsOptional()
  @IsNumber()
  cryptoCoinId?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  assetName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty()
  @IsOptional()
  screenshots?: any;

  @ApiProperty()
  @IsBoolean()
  isRead?: boolean;

  @ApiProperty({ type: "string", format: "date-time" })
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

export class PageRequest {
  @ApiProperty({ type: "integer", required: true, example: 1 })
  page: number;

  @ApiProperty({ type: "integer", required: true, example: 10 })
  limit: number;

  @ApiProperty({ type: "string", required: true, example: "createdAt" })
  @IsString()
  sortBy: string;

  @ApiProperty({
    type: SortDirection,
    required: true,
    example: SortDirection.ASCENDING,
  })
  @IsEnum(SortDirection)
  sortDirection: SortDirection;
}

export class AcceptRejectTransactionDTO {
  @ApiProperty()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @ApiProperty()
  @IsString()
  @IsOptional()
  reason?: string;
}

export class APIResponse<D> {
  data: D;
  message: string;
}

export class ApproveBecomeMerchantRequestDTO {
  adminId: number;
}
