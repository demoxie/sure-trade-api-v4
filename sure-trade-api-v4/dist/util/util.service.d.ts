import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../dto";
import { ConfigService } from "@nestjs/config";
export declare class UtilService {
    private readonly jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    generateOtp: () => number;
    generateToken: (user: JwtPayload) => Promise<string>;
    generateGiftCardTxReferenceNo: () => Promise<string>;
}
