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
exports.SupportedGiftCard = exports.ApproveBecomeMerchantRequestDTO = exports.AcceptRejectTransactionDTO = exports.PageRequest = exports.ChatResponse = exports.ChatDTO = exports.SearchGiftCardQueryParams = exports.GiftCardDTO = exports.GiftCardRateDTO = exports.GiftCardTransactionResponse = exports.BankDetailsDTO = exports.GiftCardsResponse = exports.GiftCardResponse = exports.GiftCardVO = exports.GiftCardTransactionDTO = exports.RegisterTelegramDTO = exports.BecomeMerchantRequestDTO = exports.ProfilePictureUpdateDTO = exports.TransactionPinDTO = exports.PasswordResetDTO = exports.UpdateDTO = exports.UserResponse = exports.LoginDto = exports.RequestIdentityDTO = exports.OtpVerificationResponse = exports.JwtPayload = exports.VerifyOtpDTO = exports.SmsPayload = exports.EmailQueuePayload = exports.SignUpPayload = exports.SignupDTO = exports.UserDeviceDetailsDTO = exports.APIResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enum_1 = require("../enums/enum");
class APIResponse {
}
exports.APIResponse = APIResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ type: "string", example: "Success" }),
    __metadata("design:type", String)
], APIResponse.prototype, "message", void 0);
class UserDeviceDetailsDTO {
}
exports.UserDeviceDetailsDTO = UserDeviceDetailsDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserDeviceDetailsDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserDeviceDetailsDTO.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDeviceDetailsDTO.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDeviceDetailsDTO.prototype, "deviceToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDeviceDetailsDTO.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDeviceDetailsDTO.prototype, "userAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "string", format: "date-time" }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], UserDeviceDetailsDTO.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "string", format: "date-time" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], UserDeviceDetailsDTO.prototype, "updatedAt", void 0);
class SignupDTO {
}
exports.SignupDTO = SignupDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)({ message: "First name is required" }),
    __metadata("design:type", String)
], SignupDTO.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)({ message: "Last name is required" }),
    __metadata("design:type", String)
], SignupDTO.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)({ message: "Phone number is required" }),
    __metadata("design:type", String)
], SignupDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)({ message: "Username is required" }),
    __metadata("design:type", String)
], SignupDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)({ message: "Email is required" }),
    (0, class_validator_1.IsEmail)({}, { message: "Invalid email format" }),
    __metadata("design:type", String)
], SignupDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)({ message: "Password is required" }),
    __metadata("design:type", String)
], SignupDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)({ message: "Country is required" }),
    __metadata("design:type", String)
], SignupDTO.prototype, "country", void 0);
class SignUpPayload {
}
exports.SignUpPayload = SignUpPayload;
class EmailQueuePayload {
}
exports.EmailQueuePayload = EmailQueuePayload;
class SmsPayload {
}
exports.SmsPayload = SmsPayload;
class VerifyOtpDTO {
}
exports.VerifyOtpDTO = VerifyOtpDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: "1234" }),
    __metadata("design:type", String)
], VerifyOtpDTO.prototype, "otp", void 0);
class JwtPayload {
}
exports.JwtPayload = JwtPayload;
class OtpVerificationResponse {
}
exports.OtpVerificationResponse = OtpVerificationResponse;
class RequestIdentityDTO {
}
exports.RequestIdentityDTO = RequestIdentityDTO;
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    (0, class_validator_1.IsNotEmpty)({ message: "Email is required" }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    (0, class_validator_1.IsNotEmpty)({ message: "Password is required" }),
    (0, class_validator_1.IsStrongPassword)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class UserResponse {
}
exports.UserResponse = UserResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UserResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserResponse.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enum_1.Role }),
    (0, class_validator_1.IsEnum)(enum_1.Role),
    __metadata("design:type", String)
], UserResponse.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserResponse.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserResponse.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserResponse.prototype, "isSuspended", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "middleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "transactionPin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "walletAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "nonce", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "telegram", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UserResponse.prototype, "tierId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UserResponse.prototype, "transactionProfileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UserResponse.prototype, "referralCodes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserResponse.prototype, "telegramChatId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UserResponse.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UserResponse.prototype, "createdAt", void 0);
class UpdateDTO {
}
exports.UpdateDTO = UpdateDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDTO.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDTO.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDTO.prototype, "middleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDTO.prototype, "walletAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDTO.prototype, "telegram", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDTO.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDTO.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDTO.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDTO.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDTO.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDTO.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateDTO.prototype, "referralCodes", void 0);
class PasswordResetDTO {
}
exports.PasswordResetDTO = PasswordResetDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String, minLength: 8 }),
    (0, class_validator_1.IsStrongPassword)({ minLength: 8 }, { message: "Password is not Strong" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Password Is Required" }),
    __metadata("design:type", String)
], PasswordResetDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    (0, class_validator_1.IsNotEmpty)({ message: "Confirm Password Is Required" }),
    __metadata("design:type", String)
], PasswordResetDTO.prototype, "confirmPassword", void 0);
class TransactionPinDTO {
}
exports.TransactionPinDTO = TransactionPinDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, maxLength: 4 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TransactionPinDTO.prototype, "transactionPin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, maxLength: 4 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TransactionPinDTO.prototype, "confirmTransactionPin", void 0);
class ProfilePictureUpdateDTO {
}
exports.ProfilePictureUpdateDTO = ProfilePictureUpdateDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProfilePictureUpdateDTO.prototype, "profileImage", void 0);
class BecomeMerchantRequestDTO {
}
exports.BecomeMerchantRequestDTO = BecomeMerchantRequestDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BecomeMerchantRequestDTO.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BecomeMerchantRequestDTO.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BecomeMerchantRequestDTO.prototype, "userWalletAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BecomeMerchantRequestDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BecomeMerchantRequestDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BecomeMerchantRequestDTO.prototype, "transactionHashId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BecomeMerchantRequestDTO.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BecomeMerchantRequestDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BecomeMerchantRequestDTO.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BecomeMerchantRequestDTO.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BecomeMerchantRequestDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], BecomeMerchantRequestDTO.prototype, "userId", void 0);
class RegisterTelegramDTO {
}
exports.RegisterTelegramDTO = RegisterTelegramDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterTelegramDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterTelegramDTO.prototype, "chatId", void 0);
class GiftCardTransactionDTO {
}
exports.GiftCardTransactionDTO = GiftCardTransactionDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enum_1.CardType, example: "VIRTUAL" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.CardType),
    __metadata("design:type", String)
], GiftCardTransactionDTO.prototype, "cardType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enum_1.CardIssuer, example: "AMAZON" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.CardIssuer),
    __metadata("design:type", String)
], GiftCardTransactionDTO.prototype, "cardIssuer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer", example: 26 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], GiftCardTransactionDTO.prototype, "giftCardRateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer", example: 93 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], GiftCardTransactionDTO.prototype, "giftCardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enum_1.TransactionType, example: "SELL" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.TransactionType),
    __metadata("design:type", String)
], GiftCardTransactionDTO.prototype, "transactionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer", example: 73 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], GiftCardTransactionDTO.prototype, "merchantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enum_1.PaymentMethod, example: "BANK_TRANSFER" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.PaymentMethod),
    __metadata("design:type", String)
], GiftCardTransactionDTO.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer", example: 9 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], GiftCardTransactionDTO.prototype, "bankDetailsId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "GC-409864697" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardTransactionDTO.prototype, "referenceNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "number", example: 200.0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], GiftCardTransactionDTO.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer", example: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], GiftCardTransactionDTO.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "NGN" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardTransactionDTO.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "123456789" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardTransactionDTO.prototype, "cardValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "USD" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardTransactionDTO.prototype, "cardCurrency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "USD" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardTransactionDTO.prototype, "paymentCurrency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "10" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardTransactionDTO.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardTransactionDTO.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], GiftCardTransactionDTO.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "number", example: "10.00" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardTransactionDTO.prototype, "fee", void 0);
class GiftCardVO {
}
exports.GiftCardVO = GiftCardVO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the gift card',
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardVO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identifier for the user associated with the gift card',
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardVO.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Code of the gift card',
        example: 'ABCD-1234-EFGH-5678',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardVO.prototype, "cardCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'PIN of the gift card',
        example: '1234',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardVO.prototype, "cardPin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Type of the gift card',
        example: enum_1.CardType.VIRTUAL,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.CardType),
    __metadata("design:type", String)
], GiftCardVO.prototype, "cardType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Issuer of the gift card',
        example: 'Amazon',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardVO.prototype, "cardIssuer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Currency of the gift card',
        example: 'USD',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardVO.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Amount loaded on the gift card',
        example: 100.00,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDecimal)(),
    __metadata("design:type", Number)
], GiftCardVO.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantity of gift cards',
        example: 1,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GiftCardVO.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Value of the gift card',
        example: 100.00,
    }),
    (0, class_validator_1.IsDecimal)(),
    __metadata("design:type", Number)
], GiftCardVO.prototype, "cardValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Discount on the gift card',
        example: 10.00,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDecimal)(),
    __metadata("design:type", Number)
], GiftCardVO.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Expiry date of the gift card',
        example: '2023-12-31',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], GiftCardVO.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Status of the gift card',
        example: enum_1.CardStatus.NEW,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.CardStatus),
    __metadata("design:type", String)
], GiftCardVO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Screenshots related to the gift card',
        example: [{ url: 'http://example.com/screenshot1.png' }],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], GiftCardVO.prototype, "screenshots", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation date of the gift card',
        example: '2023-01-01T00:00:00.000Z',
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], GiftCardVO.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Last update date of the gift card',
        example: '2023-01-02T00:00:00.000Z',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], GiftCardVO.prototype, "updatedAt", void 0);
class GiftCardResponse {
}
exports.GiftCardResponse = GiftCardResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", GiftCardVO)
], GiftCardResponse.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GiftCardResponse.prototype, "message", void 0);
class GiftCardsResponse {
}
exports.GiftCardsResponse = GiftCardsResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], GiftCardsResponse.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GiftCardsResponse.prototype, "message", void 0);
class BankDetailsDTO {
}
exports.BankDetailsDTO = BankDetailsDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], BankDetailsDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BankDetailsDTO.prototype, "bankName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BankDetailsDTO.prototype, "accountName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BankDetailsDTO.prototype, "accountNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BankDetailsDTO.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BankDetailsDTO.prototype, "accountType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BankDetailsDTO.prototype, "bankCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BankDetailsDTO.prototype, "bankCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BankDetailsDTO.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "string", format: "date-time" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], BankDetailsDTO.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "string", format: "date-time" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], BankDetailsDTO.prototype, "updatedAt", void 0);
class GiftCardTransactionResponse {
}
exports.GiftCardTransactionResponse = GiftCardTransactionResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardTransactionResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardTransactionResponse.prototype, "giftCardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardTransactionResponse.prototype, "giftCardRateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardTransactionResponse.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardTransactionResponse.prototype, "merchantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardTransactionResponse.prototype, "transactionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.CardType),
    __metadata("design:type", String)
], GiftCardTransactionResponse.prototype, "cardType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.CardIssuer),
    __metadata("design:type", String)
], GiftCardTransactionResponse.prototype, "cardIssuer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.PaymentMethod),
    __metadata("design:type", String)
], GiftCardTransactionResponse.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardTransactionResponse.prototype, "bankDetailsId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardTransactionResponse.prototype, "walletAddressId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "number" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardTransactionResponse.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], GiftCardTransactionResponse.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "number" }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], GiftCardTransactionResponse.prototype, "fee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardTransactionResponse.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardTransactionResponse.prototype, "referenceNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardTransactionResponse.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", UserResponse)
], GiftCardTransactionResponse.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", UserResponse)
], GiftCardTransactionResponse.prototype, "merchant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", GiftCardResponse)
], GiftCardTransactionResponse.prototype, "giftCard", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", BankDetailsDTO)
], GiftCardTransactionResponse.prototype, "bankDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "string", format: "date-time" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Date)
], GiftCardTransactionResponse.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "string", format: "date-time" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Date)
], GiftCardTransactionResponse.prototype, "updatedAt", void 0);
class GiftCardRateDTO {
}
exports.GiftCardRateDTO = GiftCardRateDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardRateDTO.prototype, "cardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardRateDTO.prototype, "merchantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardRateDTO.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardRateDTO.prototype, "giftCardCurrency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enum_1.GiftCardType),
    __metadata("design:type", String)
], GiftCardRateDTO.prototype, "giftCardType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardRateDTO.prototype, "transactionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardRateDTO.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardRateDTO.prototype, "bankDetailsId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardRateDTO.prototype, "walletAddressId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "number" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardRateDTO.prototype, "maxLimit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "number" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardRateDTO.prototype, "minLimit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "number" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardRateDTO.prototype, "rate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardRateDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], GiftCardRateDTO.prototype, "screenshots", void 0);
class GiftCardDTO {
}
exports.GiftCardDTO = GiftCardDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardDTO.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardDTO.prototype, "cardCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardDTO.prototype, "cardPin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.CardType),
    __metadata("design:type", String)
], GiftCardDTO.prototype, "cardType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardDTO.prototype, "cardIssuer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GiftCardDTO.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "number" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardDTO.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], GiftCardDTO.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "number" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardDTO.prototype, "cardValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "number" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GiftCardDTO.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GiftCardDTO.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: enum_1.CardStatus.NEW }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.CardStatus),
    __metadata("design:type", String)
], GiftCardDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], GiftCardDTO.prototype, "screenshots", void 0);
class SearchGiftCardQueryParams {
}
exports.SearchGiftCardQueryParams = SearchGiftCardQueryParams;
__decorate([
    (0, swagger_1.ApiProperty)({ type: "string" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchGiftCardQueryParams.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "string" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchGiftCardQueryParams.prototype, "name", void 0);
class ChatDTO {
}
exports.ChatDTO = ChatDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChatDTO.prototype, "senderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChatDTO.prototype, "receiverId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChatDTO.prototype, "transactionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChatDTO.prototype, "giftCardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChatDTO.prototype, "cryptoCoinId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatDTO.prototype, "assetName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatDTO.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ChatDTO.prototype, "screenshots", void 0);
class ChatResponse {
}
exports.ChatResponse = ChatResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChatResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChatResponse.prototype, "senderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChatResponse.prototype, "receiverId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChatResponse.prototype, "transactionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChatResponse.prototype, "giftCardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ChatResponse.prototype, "cryptoCoinId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatResponse.prototype, "assetName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ChatResponse.prototype, "screenshots", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ChatResponse.prototype, "isRead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "string", format: "date-time" }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ChatResponse.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "string", format: "date-time" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ChatResponse.prototype, "updatedAt", void 0);
class PageRequest {
}
exports.PageRequest = PageRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer", required: true, example: 1 }),
    __metadata("design:type", Number)
], PageRequest.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer", required: true, example: 10 }),
    __metadata("design:type", Number)
], PageRequest.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "string", required: true, example: "createdAt" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PageRequest.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: enum_1.SortDirection,
        required: true,
        example: enum_1.SortDirection.ASCENDING,
    }),
    (0, class_validator_1.IsEnum)(enum_1.SortDirection),
    __metadata("design:type", String)
], PageRequest.prototype, "sortDirection", void 0);
class AcceptRejectTransactionDTO {
}
exports.AcceptRejectTransactionDTO = AcceptRejectTransactionDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enum_1.TransactionStatus),
    __metadata("design:type", String)
], AcceptRejectTransactionDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AcceptRejectTransactionDTO.prototype, "reason", void 0);
class ApproveBecomeMerchantRequestDTO {
}
exports.ApproveBecomeMerchantRequestDTO = ApproveBecomeMerchantRequestDTO;
class SupportedGiftCard {
}
exports.SupportedGiftCard = SupportedGiftCard;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identifier for the gift card issuer',
        example: 'AMAZON',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SupportedGiftCard.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the gift card issuer',
        example: 'Amazon',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SupportedGiftCard.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Image URL of the gift card issuer',
        example: 'https://firebasestorage.googleapis.com/v0/b/sure-trade-b1a6b.appspot.com/o/Giftcards%2Famazon_image.png?alt=media&token=f354ae5d-b4fd-466c-b08a-883a71e0abb0',
    }),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], SupportedGiftCard.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of supported currencies by the gift card issuer',
        example: ['USD', 'GBP', 'EUR', 'JPY', 'CAD', 'AUD', 'CNY', 'MXN', 'INR', 'BRL'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], SupportedGiftCard.prototype, "currency", void 0);
//# sourceMappingURL=index.js.map