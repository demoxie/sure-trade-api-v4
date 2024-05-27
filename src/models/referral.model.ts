import { User } from "./user.model";
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

@Table
export class Referral extends Model<Referral> {
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
  referrer: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  referee: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  referralCode: string;

  @Column({
    type: DataType.STRING,
  })
  referralLink: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  referralType: string;

  @Column({
    type: DataType.DECIMAL(16, 3),
    allowNull: true,
  })
  referralValue: number;

  @Column({
    type: DataType.DATEONLY,
  })
  expiryDate: Date;

  @Column({
    type: DataType.STRING,
  })
  status: string;

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
