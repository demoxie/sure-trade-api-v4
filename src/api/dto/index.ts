import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "../../enums/enum";

export class SignUpDto {
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
}

export class SignUpPayload {
  firstName: string;
  lastName: string;
  createdAt: Date;
  password: string;
  phoneNumber: string;
  role: string;
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
  otp: string;
}

export class JwtPayload {
  id: number;
  email: string;
  role: Role;
}
