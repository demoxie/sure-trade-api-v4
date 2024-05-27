import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { BankDetailsDTO, JwtPayload } from "../dto";
import { BankDetails } from "../models/bank-details";
import { MessageSenderService } from "../message-sender/message-sender.service";
import { User } from "../models/user.model";

@Injectable()
export class BankDetailsService {
  constructor(private readonly messageSender: MessageSenderService) {}

  async addBankDetails(jwtUser: JwtPayload, dto: BankDetailsDTO) {
    const existingBankDetail = await BankDetails.findOne({
      where: {
        accountNumber: dto.accountNumber,
      },
    }).catch((err) => {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    if (existingBankDetail) {
      throw new HttpException(
        "Bank details already exist",
        HttpStatus.CONFLICT,
      );
    }
    dto.userId = jwtUser.id;
    return await BankDetails.create(dto)
      .then(async (res) => {
        await this.messageSender.sendNewBankDetailsAddedMessage(
          await User.findByPk(jwtUser.id),
        );
        return res.toJSON();
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  getAllBankDetails = async () =>
    await BankDetails.findAll({ include: { all: true } });

  getBankDetailById = async (id: number) =>
    await BankDetails.findByPk(id, { include: { all: true } });

  getMyBankDetails = async (jwtUser: JwtPayload) =>
    await BankDetails.findAll({
      where: { id: jwtUser.id },
      include: { all: true },
    });

  getUserBankDetails = async (userId: number) =>
    await BankDetails.findAll({
      where: { userId: userId },
      include: { all: true },
    });

  getBankDetailsByAccountNumber = async (accountNumber: string) =>
    await BankDetails.findOne({
      where: { accountNumber: accountNumber },
      include: { all: true },
    });

  async updateBankDetail(id: number, bankDetailDto: BankDetailsDTO) {
    return await BankDetails.update(bankDetailDto, {
      where: { id: id },
    });
  }

  async deleteBankDetail(id: number) {
    return await BankDetails.destroy({ where: { id: id } });
  }

  async deleteBankDetailByAccountNumber(accountNumber: string) {
    return await BankDetails.destroy({ where: { where: accountNumber } });
  }
}
