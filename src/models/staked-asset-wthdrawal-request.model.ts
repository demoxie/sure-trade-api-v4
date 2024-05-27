import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";

@Table
export class StakeWithdrawalRequest extends Model<StakeWithdrawalRequest> {
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
    type: DataType.BIGINT,
  })
  stakedAssetId: number;

  @Column({
    type: DataType.STRING,
  })
  paymentCurrency: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.STRING,
  })
  reasonForWithdrawal: string;

  @Column({
    type: DataType.FLOAT,
  })
  withdrawalFee: number;

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
