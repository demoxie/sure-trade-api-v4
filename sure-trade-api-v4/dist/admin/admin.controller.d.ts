import { AdminService } from "./admin.service";
import { Request } from "express";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    approveRequestToBecomeMerchant(reqId: number, req: Request): Promise<import("../models/staked-asset.model").StakedAsset>;
}
