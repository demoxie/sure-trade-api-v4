import { BankDetailsDTO, JwtPayload } from "../dto";
import { BankDetails } from "../models/bank-details";
import { MessageSenderService } from "../message-sender/message-sender.service";
export declare class BankDetailsService {
    private readonly messageSender;
    constructor(messageSender: MessageSenderService);
    addBankDetails(jwtUser: JwtPayload, dto: BankDetailsDTO): Promise<BankDetails>;
    getAllBankDetails: () => Promise<BankDetails[]>;
    getBankDetailById: (id: number) => Promise<BankDetails>;
    getMyBankDetails: (jwtUser: JwtPayload) => Promise<BankDetails[]>;
    getUserBankDetails: (userId: number) => Promise<BankDetails[]>;
    getBankDetailsByAccountNumber: (accountNumber: string) => Promise<BankDetails>;
    updateBankDetail(id: number, bankDetailDto: BankDetailsDTO): Promise<[affectedCount: number]>;
    deleteBankDetail(id: number): Promise<number>;
    deleteBankDetailByAccountNumber(accountNumber: string): Promise<number>;
}
