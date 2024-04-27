import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";

@Table
export class GiftCardRate extends Model<GiftCardRate> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  cardName: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  merchantId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currency: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  giftCardCurrency: string;

  @Column({
    type: DataType.STRING,
  })
  giftCardType: string;

  @Column({
    type: DataType.STRING,
  })
  transactionType: string;

  @Column({
    type: DataType.STRING,
  })
  paymentMethod: string;

  @Column({
    type: DataType.BIGINT,
  })
  bankDetailsId: number;

  @Column({
    type: DataType.BIGINT,
  })
  walletAddressId: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  maxLimit: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  minLimit: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  rate: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  screenshots: any;

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
