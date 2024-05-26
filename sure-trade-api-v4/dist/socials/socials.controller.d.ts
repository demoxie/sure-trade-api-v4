import { SocialsService } from "./socials.service";
import { RegisterTelegramDTO } from "../dto";
export declare class SocialsController {
    private readonly socialService;
    constructor(socialService: SocialsService);
    registerTelegram(dto: RegisterTelegramDTO): Promise<string>;
}
