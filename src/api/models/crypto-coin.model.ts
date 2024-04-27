import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class CryptoCoin extends Model<CryptoCoin> {
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
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  symbol: string;

  @Column({
    type: DataType.FLOAT,
  })
  marketPrice: number;

  @Column({
    type: DataType.FLOAT,
  })
  price: number;

  @Column({
    type: DataType.FLOAT,
  })
  quantity: number;

  @Column({
    type: DataType.FLOAT,
  })
  margin: number;

  @Column({
    type: DataType.FLOAT,
  })
  discount: number;

  @Column({
    type: DataType.FLOAT,
  })
  amount: number;

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
