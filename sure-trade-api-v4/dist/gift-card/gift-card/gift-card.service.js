"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftCardService = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("../../dto");
const sequelize_1 = require("sequelize");
const gift_cards_1 = require("../../constants/gift-cards");
const enum_1 = require("../../enums/enum");
const modelmapper_service_1 = require("../../util/modelmapper/modelmapper.service");
const gift_card_model_1 = require("../../models/gift-card.model");
let GiftCardService = class GiftCardService {
    constructor() {
        this.getGiftCards = async () => await gift_card_model_1.GiftCard.findAll({ include: { all: true } })
            .then((res) => {
            return res.map((g) => g.toJSON());
        })
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        this.searchGiftCards = async (searchParams) => gift_cards_1.supportedGiftCards.filter((card) => {
            const nameMatch = searchParams.name
                ? card.name.toLowerCase().includes(searchParams.name.toLowerCase())
                : true;
            const currencyMatch = searchParams.currency
                ? card.currency.includes(searchParams.currency.toUpperCase())
                : true;
            return nameMatch && currencyMatch;
        });
    }
    async getAllMyGiftCards(jwtUser) {
        const myGIftCards = await gift_card_model_1.GiftCard.findAll({
            where: {
                userId: jwtUser.id,
            },
            include: { all: true },
        })
            .then((res) => res.map((g) => g.toJSON()))
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        console.log("Gift Cards found", myGIftCards);
        const mapper = new modelmapper_service_1.ModelMapper();
        return myGIftCards.map((g) => mapper.map(g));
    }
    async getGiftCardById(id) {
        return await gift_card_model_1.GiftCard.findByPk(id, { include: { all: true } })
            .then((g) => g.toJSON())
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async getGiftCardByCardCode(cardCode) {
        return await gift_card_model_1.GiftCard.findOne({
            where: {
                cardCode: cardCode,
            },
            include: { all: true },
        });
    }
    async getGiftCardsByUserId(userId) {
        return await gift_card_model_1.GiftCard.findAll({
            where: {
                userId: userId,
            },
            include: { all: true },
        });
    }
    async getGiftCardByStatus(status) {
        return await gift_card_model_1.GiftCard.findAll({
            where: {
                status: status,
            },
            include: { all: true },
        });
    }
    async getGiftCardsByType(type) {
        return await gift_card_model_1.GiftCard.findAll({
            where: {
                cardType: type,
            },
            include: { all: true },
        });
    }
    async createGiftCard(body, jwtUser) {
        body.status = enum_1.CardStatus.NEW;
        body.userId = jwtUser.id;
        const giftCard = {
            ...body,
            expiryDate: new Date(body.expiryDate),
            createdAt: new Date(),
            updatedAt: new Date(),
            status: enum_1.CardStatus.NEW,
        };
        return await gift_card_model_1.GiftCard.create(giftCard)
            .then((result) => {
            return result.toJSON();
        })
            .catch((error) => {
            throw new sequelize_1.DatabaseError(error);
        });
    }
    async updateGiftCardById(id, body) {
        const existingGiftCard = await gift_card_model_1.GiftCard.findOne({
            where: {
                id: id,
            },
            include: { all: true },
        });
        if (!existingGiftCard) {
            throw new common_1.HttpException("Gift card not found", common_1.HttpStatus.NOT_FOUND);
        }
        const giftCardToUpdate = {
            ...body,
            expiryDate: new Date(body.expiryDate),
            updatedAt: new Date(),
        };
        await gift_card_model_1.GiftCard.update(giftCardToUpdate, {
            where: {
                id: id,
            },
        })
            .then((result) => {
            console.log("Result: " + JSON.stringify(result));
        })
            .catch((error) => {
            throw new Error(error);
        });
        return await gift_card_model_1.GiftCard.findOne({
            where: {
                id: id,
            },
            include: { all: true },
        });
    }
    async deleteGiftCard(id) {
        return await gift_card_model_1.GiftCard.destroy({
            where: {
                id: id,
            },
        });
    }
    async uploadGiftCardScreenshots(id, body) {
        const existingGiftCard = await gift_card_model_1.GiftCard.findOne({
            where: {
                id: id,
            },
            include: { all: true },
        });
        if (!existingGiftCard) {
            throw new common_1.HttpException("Gift card not found", common_1.HttpStatus.NOT_FOUND);
        }
        const giftCardToUpdate = {
            ...body,
            expiryDate: new Date(body.expiryDate),
            updatedAt: new Date(),
        };
        await gift_card_model_1.GiftCard.update(giftCardToUpdate, {
            where: {
                id: id,
            },
        });
        return await gift_card_model_1.GiftCard.findOne({
            where: {
                id: id,
            },
            include: { all: true },
        });
    }
    getSupportedGiftCards() {
        const mapper = new modelmapper_service_1.ModelMapper();
        return gift_cards_1.supportedGiftCards.map((o) => mapper.map(dto_1.SupportedGiftCard));
    }
    async updateMyGiftCardById(id, jwtUser, body) {
        const existingGiftCard = await gift_card_model_1.GiftCard.findOne({
            where: {
                id: id,
            },
            include: { all: true },
        });
        if (!existingGiftCard) {
            throw new common_1.HttpException("Gift card not found", common_1.HttpStatus.NOT_FOUND);
        }
        body.updatedAt = new Date();
        const giftCardToUpdate = {
            ...body,
            expiryDate: new Date(body.expiryDate),
            updatedAt: new Date(),
        };
        await gift_card_model_1.GiftCard.update(giftCardToUpdate, {
            where: {
                id: id,
            },
        });
        return await gift_card_model_1.GiftCard.findOne({
            where: {
                id: id,
            },
            include: { all: true },
        });
    }
};
exports.GiftCardService = GiftCardService;
exports.GiftCardService = GiftCardService = __decorate([
    (0, common_1.Injectable)()
], GiftCardService);
//# sourceMappingURL=gift-card.service.js.map