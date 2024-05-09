import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";

@Table
export class GiftCard extends Model<GiftCard> {
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
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  cardCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  cardPin: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  cardType: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cardIssuer: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currency: string;

  @Column({
    type: DataType.DECIMAL(16, 3),
    allowNull: true,
  })
  amount: number;

  @Column({
    type: DataType.INTEGER,
  })
  quantity: number;

  @Column({
    type: DataType.DECIMAL(16, 3),
  })
  cardValue: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  discount: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  expiryDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
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
