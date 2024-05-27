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
import { Rate } from "./rate.model";

@Table
export class Transaction extends Model<Transaction> {
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
    allowNull: true,
  })
  userId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  merchantId: number;

  @ForeignKey(() => Rate)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  rateId: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  assetName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  currency: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  amount: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  unitPrice: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  quantity: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  transactionFee: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  transactionType: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  productName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
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
    type: DataType.STRING,
    allowNull: true,
  })
  userTransactionHash: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  merchantTransactionHash: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  discount: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  type: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  status: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  screenshots: any;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  referenceNo: string;

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
