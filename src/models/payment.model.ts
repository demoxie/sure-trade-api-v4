import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";
import { Wallet } from "./wallet.model";
import { BankDetails } from "./bank-details";
import { Transaction } from "./transaction.model";

@Table
export class Payment extends Model<Payment> {
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

  @BelongsTo(() => User, "userId")
  user: User;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  transactionHashId: string;

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
  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  merchantId: number;

  @BelongsTo(() => User, "merchantId")
  merchant: User;

  @ForeignKey(() => Transaction)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  transactionId: number;

  @BelongsTo(() => Transaction)
  transaction: Transaction;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  screenshots: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currency: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  paymentMethod: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  paymentStatus: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  paymentDate: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  paymentReference: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  paymentDescription: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  paymentType: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  productType: string;

  @ForeignKey(() => BankDetails)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  bankDetailsId: number;

  @BelongsTo(() => BankDetails)
  bankDetails: BankDetails;
  @ForeignKey(() => Wallet)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  walletAddressId: number;

  @BelongsTo(() => Wallet)
  walletAddress: Wallet;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  giftCardId: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  paidFor: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  paidTo: any;

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
