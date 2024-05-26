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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftCardRateService = void 0;
const common_1 = require("@nestjs/common");
const gift_card_rate_model_1 = require("../../models/gift-card-rate.model");
const user_model_1 = require("../../models/user.model");
let GiftCardRateService = class GiftCardRateService {
    constructor(giftCardRate, userRepository) {
        this.giftCardRate = giftCardRate;
        this.userRepository = userRepository;
        this.addRate = async (merchantId, rate) => {
            const existingRate = await gift_card_rate_model_1.GiftCardRate.findOne({
                where: {
                    currency: rate.currency,
                    rate: rate.rate,
                    cardName: rate.cardName,
                    merchantId: merchantId,
                },
            });
            if (existingRate) {
                throw new common_1.HttpException("Gift card rate already exists", common_1.HttpStatus.CONFLICT);
            }
            rate.createdAt = new Date();
            rate.status = "NEW";
            rate.screenshots = {
                urls: [],
            };
            rate.merchantId = merchantId;
            return await gift_card_rate_model_1.GiftCardRate.create(rate).then(async (res) => {
                return res.toJSON();
            });
        };
        this.getRateById = async (id) => {
            const rate = await gift_card_rate_model_1.GiftCardRate.findOne({
                where: {
                    id: id,
                },
                include: {
                    all: true,
                },
            });
            if (!rate) {
                throw new common_1.HttpException("Gift card rate not found", common_1.HttpStatus.NOT_FOUND);
            }
            return rate;
        };
        this.getAllRates = async () => {
            return await gift_card_rate_model_1.GiftCardRate.findAll({ include: { all: true } });
        };
        this.updateRate = async (id, rate) => {
            const existingRate = await gift_card_rate_model_1.GiftCardRate.findOne({
                where: {
                    id: id,
                },
                include: {
                    all: true,
                },
            });
            if (!existingRate) {
                throw new common_1.HttpException("Gift card rate not found", common_1.HttpStatus.NOT_FOUND);
            }
            rate.updatedAt = new Date();
            await gift_card_rate_model_1.GiftCardRate.update(rate, {
                where: {
                    id: id,
                },
            });
            return await gift_card_rate_model_1.GiftCardRate.findOne({
                where: {
                    id: id,
                },
                include: {
                    all: true,
                },
            });
        };
        this.deleteRate = async (id) => {
            const existingRate = await gift_card_rate_model_1.GiftCardRate.findOne({
                where: {
                    id: id,
                },
            });
            if (!existingRate) {
                throw new common_1.HttpException("Gift card rate not found", common_1.HttpStatus.NOT_FOUND);
            }
            return await gift_card_rate_model_1.GiftCardRate.destroy({
                where: {
                    id: id,
                },
            });
        };
        this.getRatesByMerchantId = async (merchantId) => {
            const merchant = await user_model_1.User.findByPk(merchantId);
            if (!merchant) {
                throw new common_1.HttpException("Merchant not found", common_1.HttpStatus.NOT_FOUND);
            }
            return await gift_card_rate_model_1.GiftCardRate.findAll({
                where: {
                    merchantId: merchantId,
                },
                include: { all: true },
            });
        };
        this.getRatesByFromCurrency = async (fromCurrency) => {
            return await gift_card_rate_model_1.GiftCardRate.findAll({
                where: {
                    currency: fromCurrency,
                },
                include: { all: true },
            });
        };
        this.getRatesByToCurrency = async (toCurrency) => {
            return await gift_card_rate_model_1.GiftCardRate.findAll({
                where: {
                    currency: toCurrency,
                },
                include: {
                    all: true,
                },
            });
        };
        this.getRatesByStatus = async (status) => {
            return await gift_card_rate_model_1.GiftCardRate.findAll({
                where: {
                    status: status,
                },
            });
        };
        this.getMyRates = async (userId) => {
            return await gift_card_rate_model_1.GiftCardRate.findAll({
                where: {
                    merchantId: userId,
                },
                include: {
                    all: true,
                },
            });
        };
    }
};
exports.GiftCardRateService = GiftCardRateService;
exports.GiftCardRateService = GiftCardRateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("GIFT_CARD_RATE_REPOSITORY")),
    __param(1, (0, common_1.Inject)("USER_REPOSITORY")),
    __metadata("design:paramtypes", [Object, Object])
], GiftCardRateService);
//# sourceMappingURL=gift-card-rate.service.js.map