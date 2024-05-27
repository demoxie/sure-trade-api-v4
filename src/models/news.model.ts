import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class News extends Model<News> {
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
  title: string;

  @Column({
    type: DataType.TEXT,
  })
  subTitle: string;

  @Column({
    type: DataType.TEXT(),
  })
  content: string;

  @Column({
    type: DataType.TEXT(),
  })
  subContent: string;

  @Column({
    type: DataType.JSON,
  })
  images: any;

  @Column({
    type: DataType.JSON,
  })
  video: any;

  @Column({
    type: DataType.BIGINT,
  })
  userId: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  isRead: boolean;

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
