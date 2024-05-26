import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";
import {BecomeAMerchantRequestStatus} from "../enums/enum";

@Table
export class BecomeMerchantRequests extends Model<BecomeMerchantRequests> {
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

  @Column({
    type: DataType.TEXT("long"),
  })
  userWalletAddress: string;

  @Column({
    type: DataType.TEXT("long"),
  })
  transactionHashId: string;

  @Column({
    type: DataType.DOUBLE,
  })
  amount: number;

  @Column({
    type: DataType.STRING,
  })
  currency: string;

  @Column({
    type: DataType.STRING,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING,
  })
  username: string;

  @Column({
    type: DataType.STRING,
  })
  country: string;

  @Column({
    type: DataType.ENUM(
      BecomeAMerchantRequestStatus.APPROVED,
      BecomeAMerchantRequestStatus.PROCESSING,
      BecomeAMerchantRequestStatus.DISAPPROVED,
    ),
  })
  status: BecomeAMerchantRequestStatus;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt: Date;
}
