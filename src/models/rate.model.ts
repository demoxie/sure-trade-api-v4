import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";
import { BankDetails } from "./bank-details";
import { Wallet } from "./wallet.model";

@Table
export class Rate extends Model<Rate> {
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
  merchantId: number;

  @Column({
    type: DataType.STRING,
  })
  transactionType: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  maxLimit: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  minLimit: number;

  @Column({
    type: DataType.STRING,
  })
  currency: string;

  @Column({
    type: DataType.STRING,
  })
  assetName: string;

  @Column({
    type: DataType.FLOAT,
  })
  rate: number;

  @Column({
    type: DataType.FLOAT,
  })
  sellRate: number;

  @Column({
    type: DataType.FLOAT,
  })
  buyRate: number;

  @Column({
    type: DataType.FLOAT,
  })
  margin: number;

  @Column({
    type: DataType.FLOAT,
  })
  standardRate: number;

  @Column({
    type: DataType.STRING,
  })
  productName: string;

  @Column({
    type: DataType.FLOAT,
  })
  discount: number;

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
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;
}
