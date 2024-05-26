import { BankDetailsService } from "./bank-details.service";
import { BankDetailsDTO } from "../dto";
import { Request } from "express";
export declare class BankDetailsController {
    private readonly bankDetailsService;
    constructor(bankDetailsService: BankDetailsService);
    addBankDetails(dto: BankDetailsDTO, req: Request): Promise<import("../models/bank-details").BankDetails>;
    getAllBankDetails(): Promise<import("../models/bank-details").BankDetails[]>;
    getBankDetailById(id: number): Promise<import("../models/bank-details").BankDetails>;
    getMyBankDetails(req: Request): Promise<import("../models/bank-details").BankDetails[]>;
    getUserBankDetails(id: number): Promise<import("../models/bank-details").BankDetails[]>;
    getBankDetailsByAccountNumber(accountNumber: string): Promise<import("../models/bank-details").BankDetails>;
    updateBankDetail(id: number, bankDetailDto: BankDetailsDTO): Promise<[affectedCount: number]>;
    deleteBankDetail(id: number): Promise<number>;
    deleteBankDetailByAccountNumber(accountNumber: string): Promise<number>;
}
