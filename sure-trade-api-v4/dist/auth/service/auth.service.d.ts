import { JwtPayload, LoginDto, OtpVerificationResponse, PasswordResetDTO, RequestIdentityDTO, SignupDTO, TransactionPinDTO, UserResponse, VerifyOtpDTO } from "../../dto";
import { User } from "../../models/user.model";
import { RabbitmqProducer } from "../../config/rabbitmq/service/rabbitmq-producer";
import Redis from "ioredis";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../../user/service/user.service";
import { MessageSenderService } from "../../message-sender/message-sender.service";
import { UtilService } from "../../util/util.service";
export declare class AuthService {
    private readonly rabbitmq;
    private readonly redis;
    private readonly configService;
    private readonly utilService;
    private readonly messageSender;
    private readonly userService;
    private userRepository;
    constructor(rabbitmq: RabbitmqProducer, redis: Redis, configService: ConfigService, utilService: UtilService, messageSender: MessageSenderService, userService: UserService, userRepository: typeof User);
    login: (dto: LoginDto) => Promise<User>;
    createUser: (user: SignupDTO) => Promise<User>;
    verifyOtp: (dto: VerifyOtpDTO) => Promise<OtpVerificationResponse>;
    resetPassword: (otp: string, body: PasswordResetDTO) => Promise<UserResponse>;
    setupTransactionPin(body: TransactionPinDTO, jwtUser: JwtPayload, requestIdentity: RequestIdentityDTO): Promise<UserResponse>;
    confirmTransactionPin: (pin: string, jwtUser: JwtPayload) => Promise<UserResponse>;
}
