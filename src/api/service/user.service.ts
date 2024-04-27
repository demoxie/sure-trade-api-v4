import { HttpException, Inject, Injectable } from "@nestjs/common";
import { User } from "../models/user.model";
import { ConfigService } from "@nestjs/config";
import { RabbitmqProducer } from "../config/rabbitmq/rabbitmq-producer";
import { EmailQueuePayload, SignUpDto, SignUpPayload } from "../dto/SignUpDto";
import { Tier } from "../models/tier.model";
import bcrypt from "bcrypt";
import { RedisService } from "nestjs-redis";
import Redis from "ioredis";

@Injectable()
export class UserService {
  private redisClient: Redis;

  //JWT_SECRET, JWT_EXPIRATION_TIME, JWT_ALGORITHM, OTP_EXPIRATION_TIME

  constructor(
    @Inject() private config: ConfigService,
    @Inject() private rabbitmqProducer: RabbitmqProducer,
    @Inject() private readonly redisService: RedisService,
    @Inject() private readonly userRepository: typeof User,
  ) {
    this.redisClient = redisService.getClient();
  }

  createUser = async (user: SignUpDto) => {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });
    if (existingUser) {
      throw new HttpException("User already exists", 409);
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const otp = this.generateOtp().toString();
    console.info("OTP: " + otp);
    this.redisClient.setex(otp, 900, user.email);

    const userTier = await Tier.findOne({ where: { id: 5 } })
      .then((tiers) => {
        return tiers;
      })
      .catch((error) => {
        throw new HttpException(error, 500);
      });

    const payload: SignUpPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: hashedPassword,
      phoneNumber: user.phoneNumber,
      role: "USER",
      tierId: userTier.id,
      otp: otp,
      isVerified: false,
      isActive: false,
      isSuspended: false,
      createdAt: new Date(),
    };
    const newUser: User = await this.userRepository.create<User>(payload);

    const email: EmailQueuePayload = {
      body: {
        name: newUser.firstName,
        otp: otp,
      },
      template: "sign-up",
      to: newUser.email,
      subject: "Account Verification",
    };
    // const sms: SmsPayload = {};

    await this.rabbitmqProducer.sendMessage(
      JSON.stringify(email),
      "email_exchange",
      "email_routing_key",
    );
    return newUser;
  };

  generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };
}
