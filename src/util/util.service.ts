import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../api/dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UtilService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  public generateToken = async (user: JwtPayload) => {
    return await this.jwtService.signAsync(user, {
      secret: this.configService.get("JWT_SECRET"),
    });
  };

  generateGiftCardTxReferenceNo = async () => {
    const prefix = "GC-";
    const min = 10000000;
    const max = 99999999;
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    return prefix + result;
  };
}
