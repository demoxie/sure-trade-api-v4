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
exports.BankDetailsService = void 0;
const common_1 = require("@nestjs/common");
const bank_details_1 = require("../models/bank-details");
const message_sender_service_1 = require("../message-sender/message-sender.service");
const user_model_1 = require("../models/user.model");
let BankDetailsService = class BankDetailsService {
    constructor(messageSender) {
        this.messageSender = messageSender;
        this.getAllBankDetails = async () => await bank_details_1.BankDetails.findAll({ include: { all: true } });
        this.getBankDetailById = async (id) => await bank_details_1.BankDetails.findByPk(id, { include: { all: true } });
        this.getMyBankDetails = async (jwtUser) => await bank_details_1.BankDetails.findAll({
            where: { id: jwtUser.id },
            include: { all: true },
        });
        this.getUserBankDetails = async (userId) => await bank_details_1.BankDetails.findAll({
            where: { userId: userId },
            include: { all: true },
        });
        this.getBankDetailsByAccountNumber = async (accountNumber) => await bank_details_1.BankDetails.findOne({
            where: { accountNumber: accountNumber },
            include: { all: true },
        });
    }
    async addBankDetails(jwtUser, dto) {
        const existingBankDetail = await bank_details_1.BankDetails.findOne({
            where: {
                accountNumber: dto.accountNumber,
            },
        }).catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        if (existingBankDetail) {
            throw new common_1.HttpException("Bank details already exist", common_1.HttpStatus.CONFLICT);
        }
        dto.userId = jwtUser.id;
        return await bank_details_1.BankDetails.create(dto)
            .then(async (res) => {
            await this.messageSender.sendNewBankDetailsAddedMessage(await user_model_1.User.findByPk(jwtUser.id));
            return res.toJSON();
        })
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async updateBankDetail(id, bankDetailDto) {
        return await bank_details_1.BankDetails.update(bankDetailDto, {
            where: { id: id },
        });
    }
    async deleteBankDetail(id) {
        return await bank_details_1.BankDetails.destroy({ where: { id: id } });
    }
    async deleteBankDetailByAccountNumber(accountNumber) {
        return await bank_details_1.BankDetails.destroy({ where: { where: accountNumber } });
    }
};
exports.BankDetailsService = BankDetailsService;
exports.BankDetailsService = BankDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [message_sender_service_1.MessageSenderService])
], BankDetailsService);
//# sourceMappingURL=bank-details.service.js.map