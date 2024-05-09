import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";
import { GiftCard } from "./gift-card.model";
import { CryptoCoin } from "./crypto-coin.model";
import { Transaction } from "./transaction.model";

@Table
export class Chat extends Model<Chat> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  senderId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  receiverId: number;

  @ForeignKey(() => Transaction)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  transactionId: number;

  @ForeignKey(() => GiftCard)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  giftCardId: number;

  @ForeignKey(() => CryptoCoin)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  cryptoCoinId: number;

  @BelongsTo(() => GiftCard)
  giftCard: GiftCard;

  // @BelongsTo(() => GiftCardTransaction)
  // giftCardTransaction: GiftCard;

  @BelongsTo(() => User)
  sender: User;

  @BelongsTo(() => User)
  receiver: User;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  assetName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  message: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  screenshots: any;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isRead: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt: Date;
}
