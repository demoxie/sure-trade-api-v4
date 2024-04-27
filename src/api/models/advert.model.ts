import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Advert extends Model<Advert> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  imageUrls: string;

  @Column({
    type: DataType.STRING,
  })
  url: string;

  @Column({
    type: DataType.STRING,
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
    allowNull: false,
  })
  updatedAt: Date;
}
