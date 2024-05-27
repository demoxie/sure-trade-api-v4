import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  GiftCardDTO, GiftCardVO,
  JwtPayload,
  SearchGiftCardQueryParams, SupportedGiftCard,
} from "../../dto";
import { DatabaseError } from "sequelize";
import { supportedGiftCards } from "../../constants/gift-cards";
import {CardStatus} from "../../enums/enum";
import {ModelMapper} from "../../util/modelmapper/modelmapper.service";
import {Model} from "sequelize-typescript";
import {object} from "joi";
import {GiftCard} from "../../models/gift-card.model";

@Injectable()
export class GiftCardService {
  getGiftCards = async () =>
    await GiftCard.findAll({ include: { all: true } })
      .then((res) => {
        return res.map((g) => g.toJSON());
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });

  async getAllMyGiftCards(jwtUser: JwtPayload) {
    const myGIftCards =  await GiftCard.findAll({
      where: {
        userId: jwtUser.id,
      },
      include: { all: true },
    })
      .then((res) => res.map((g) => g.toJSON()))
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    console.log("Gift Cards found", myGIftCards);
    const mapper = new ModelMapper<GiftCard, GiftCardVO>();
    return myGIftCards.map((g: GiftCard)=>mapper.map(g));
  }

  async getGiftCardById(id: number) {
    return await GiftCard.findByPk(id, { include: { all: true } })
      .then((g) => g.toJSON())
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async getGiftCardByCardCode(cardCode: string) {
    return await GiftCard.findOne({
      where: {
        cardCode: cardCode,
      },
      include: { all: true },
    });
  }

  async getGiftCardsByUserId(userId: number) {
    return await GiftCard.findAll({
      where: {
        userId: userId,
      },
      include: { all: true },
    });
  }

  async getGiftCardByStatus(status: string) {
    return await GiftCard.findAll({
      where: {
        status: status,
      },
      include: { all: true },
    });
  }

  async getGiftCardsByType(type: string) {
    return await GiftCard.findAll({
      where: {
        cardType: type,
      },
      include: { all: true },
    });
  }

  async createGiftCard(body: GiftCardDTO, jwtUser: JwtPayload) {
    body.status = CardStatus.NEW;
    body.userId = jwtUser.id;
    const giftCard = {
      ...body,
      expiryDate: new Date(body.expiryDate),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: CardStatus.NEW,
    };
    return await GiftCard.create(giftCard)
      .then((result) => {
        return result.toJSON();
      })
      .catch((error) => {
        throw new DatabaseError(error);
      });
  }

  async updateGiftCardById(id: number, body: GiftCardDTO) {
    const existingGiftCard = await GiftCard.findOne({
      where: {
        id: id,
      },
      include: { all: true },
    });

    if (!existingGiftCard) {
      throw new HttpException("Gift card not found", HttpStatus.NOT_FOUND);
    }
    const giftCardToUpdate = {
      ...body,
      expiryDate: new Date(body.expiryDate),
      updatedAt: new Date(),
    };

    await GiftCard.update(giftCardToUpdate, {
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
    return await GiftCard.findOne({
      where: {
        id: id,
      },
      include: { all: true },
    });
  }

  async deleteGiftCard(id: number) {
    return await GiftCard.destroy({
      where: {
        id: id,
      },
    });
  }

  async uploadGiftCardScreenshots(id: number, body: GiftCardDTO) {
    const existingGiftCard = await GiftCard.findOne({
      where: {
        id: id,
      },
      include: { all: true },
    });

    if (!existingGiftCard) {
      throw new HttpException("Gift card not found", HttpStatus.NOT_FOUND);
    }
    const giftCardToUpdate = {
      ...body,
      expiryDate: new Date(body.expiryDate),
      updatedAt: new Date(),
    };

    await GiftCard.update(giftCardToUpdate, {
      where: {
        id: id,
      },
    });

    return await GiftCard.findOne({
      where: {
        id: id,
      },
      include: { all: true },
    });
  }

  getSupportedGiftCards() {
    const mapper = new ModelMapper<object,SupportedGiftCard>();
    return supportedGiftCards.map((o)=>mapper.map(SupportedGiftCard));
  }

  async updateMyGiftCardById(
    id: number,
    jwtUser: JwtPayload,
    body: GiftCardDTO,
  ) {
    const existingGiftCard = await GiftCard.findOne({
      where: {
        id: id,
      },
      include: { all: true },
    });

    if (!existingGiftCard) {
      throw new HttpException("Gift card not found", HttpStatus.NOT_FOUND);
    }
    body.updatedAt = new Date();
    const giftCardToUpdate = {
      ...body,
      expiryDate: new Date(body.expiryDate),
      updatedAt: new Date(),
    };

    await GiftCard.update(giftCardToUpdate, {
      where: {
        id: id,
      },
    });
    return await GiftCard.findOne({
      where: {
        id: id,
      },
      include: { all: true },
    });
  }

  searchGiftCards = async (searchParams: SearchGiftCardQueryParams) => supportedGiftCards.filter((card) => {
    const nameMatch = searchParams.name
        ? card.name.toLowerCase().includes(searchParams.name.toLowerCase())
        : true;
    const currencyMatch = searchParams.currency
        ? card.currency.includes(searchParams.currency.toUpperCase())
        : true;
    return nameMatch && currencyMatch;
  });
}
