import { User } from "./user.model";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

@Table
export class BankDetails extends Model<BankDetails> {
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
  bankName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  accountName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  accountNumber: string;

  @Column({
    type: DataType.STRING,
  })
  currency: string;

  @Column({
    type: DataType.STRING,
  })
  accountType: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bankCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bankCountry: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

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
