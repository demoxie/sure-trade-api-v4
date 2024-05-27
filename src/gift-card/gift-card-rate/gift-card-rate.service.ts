import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { GiftCardRate } from "../../models/gift-card-rate.model";
import { User } from "../../models/user.model";
import { GiftCardRateDTO } from "../../dto";

@Injectable()
export class GiftCardRateService {
  constructor(
    @Inject("GIFT_CARD_RATE_REPOSITORY")
    private giftCardRate: typeof GiftCardRate,
    @Inject("USER_REPOSITORY")
    private userRepository: typeof User,
  ) {}

  addRate = async (merchantId: number, rate: GiftCardRateDTO) => {
    const existingRate = await GiftCardRate.findOne({
      where: {
        currency: rate.currency,
        rate: rate.rate,
        cardName: rate.cardName,
        merchantId: merchantId,
      },
    });
    if (existingRate) {
      throw new HttpException(
        "Gift card rate already exists",
        HttpStatus.CONFLICT,
      );
    }

    rate.createdAt = new Date();
    rate.status = "NEW";
    rate.screenshots = {
      urls: [],
    };
    rate.merchantId = merchantId;

    return await GiftCardRate.create(rate).then(async (res) => {
      return res.toJSON();
    });
  };

  getRateById = async (id: number) => {
    const rate = await GiftCardRate.findOne({
      where: {
        id: id,
      },
      include: {
        all: true,
      },
    });

    if (!rate) {
      throw new HttpException("Gift card rate not found", HttpStatus.NOT_FOUND);
    }

    return rate;
  };

  getAllRates = async () => {
    return await GiftCardRate.findAll({ include: { all: true } });
  };

  updateRate = async (id: number, rate: GiftCardRateDTO) => {
    const existingRate = await GiftCardRate.findOne({
      where: {
        id: id,
      },
      include: {
        all: true,
      },
    });

    if (!existingRate) {
      throw new HttpException("Gift card rate not found", HttpStatus.NOT_FOUND);
    }

    rate.updatedAt = new Date();
    await GiftCardRate.update(rate, {
      where: {
        id: id,
      },
    });
    return await GiftCardRate.findOne({
      where: {
        id: id,
      },
      include: {
        all: true,
      },
    });
  };

  deleteRate = async (id: number) => {
    const existingRate = await GiftCardRate.findOne({
      where: {
        id: id,
      },
    });

    if (!existingRate) {
      throw new HttpException("Gift card rate not found", HttpStatus.NOT_FOUND);
    }
    return await GiftCardRate.destroy({
      where: {
        id: id,
      },
    });
  };

  getRatesByMerchantId = async (merchantId: number) => {
    const merchant = await User.findByPk(merchantId);
    if (!merchant) {
      throw new HttpException("Merchant not found", HttpStatus.NOT_FOUND);
    }
    return await GiftCardRate.findAll({
      where: {
        merchantId: merchantId,
      },
      include: { all: true },
    });
  };

  getRatesByFromCurrency = async (fromCurrency: string) => {
    return await GiftCardRate.findAll({
      where: {
        currency: fromCurrency,
      },
      include: { all: true },
    });
  };

  getRatesByToCurrency = async (toCurrency: string) => {
    return await GiftCardRate.findAll({
      where: {
        currency: toCurrency,
      },
      include: {
        all: true,
      },
    });
  };

  getRatesByStatus = async (status: string) => {
    return await GiftCardRate.findAll({
      where: {
        status: status,
      },
    });
  };
  getMyRates = async (userId: number) => {
    return await GiftCardRate.findAll({
      where: {
        merchantId: userId,
      },
      include: {
        all: true,
      },
    });
  };
}
