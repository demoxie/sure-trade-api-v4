import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Tier extends Model<Tier> {
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
    allowNull: false,
  })
  tierName: string;

  @Column({
    type: DataType.STRING,
  })
  tierDescription: string;

  @Column({
    type: DataType.STRING,
  })
  stakedAmountRange: string;

  @Column({
    type: DataType.JSON,
    defaultValue: {
      perDay: 0,
      perMonth: 0,
      perYear: 0,
    },
  })
  noOfTransactions: { perDay: number; perMonth: number; perYear: number };

  @Column({
    type: DataType.INTEGER,
  })
  noOfReferrals: number;

  @Column({
    type: DataType.FLOAT,
  })
  referralBonus: number;

  @Column({
    type: DataType.STRING,
  })
  referralBonusType: string;

  @Column({
    type: DataType.FLOAT,
  })
  referralBonusAmount: number;

  @Column({
    type: DataType.FLOAT,
  })
  referralBonusPercentage: number;
}
