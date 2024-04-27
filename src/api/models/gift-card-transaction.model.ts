import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";
import { Wallet } from "./wallet.model";
import { BankDetails } from "./bank-details";
import { GiftCardRate } from "./gift-card-rate.model";
import { GiftCard } from "./gift-card.model";

@Table
export class GiftCardTransaction extends Model<GiftCardTransaction> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  })
  id: number;

  @ForeignKey(() => GiftCard)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  giftCardId: number;

  @ForeignKey(() => GiftCardRate)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  giftCardRateId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  userId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  merchantId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  transactionType: string;

  @Column({
    type: DataType.STRING,
  })
  cardType: string;

  @Column({
    type: DataType.STRING,
  })
  cardIssuer: string;

  @Column({
    type: DataType.STRING,
  })
  paymentMethod: string;

  @ForeignKey(() => BankDetails)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  bankDetailsId: number;

  @ForeignKey(() => Wallet)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  walletAddressId: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  fee: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currency: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  referenceNo: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

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
