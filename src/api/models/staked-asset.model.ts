import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";

@Table
export class StakedAsset extends Model<StakedAsset> {
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
    type: DataType.BIGINT,
  })
  tierId: number;

  @Column({
    type: DataType.BIGINT,
  })
  adminId: number;

  @Column({
    type: DataType.TEXT(),
  })
  transactionHashId: string;

  @Column({
    type: DataType.TEXT(),
  })
  userWalletAddress: string;

  @Column({
    type: DataType.TEXT(),
  })
  adminWalletAddress: string;

  @Column({
    type: DataType.STRING,
  })
  currency: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.DOUBLE,
  })
  balance: number;

  @Column({
    type: DataType.DOUBLE,
  })
  previousBalance: number;

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
