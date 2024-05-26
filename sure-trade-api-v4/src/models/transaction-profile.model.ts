import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class TransactionProfile extends Model<TransactionProfile> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.BIGINT,
  })
  userId: number;

  @Column({
    type: DataType.FLOAT,
  })
  transactionLimit: number;

  @Column({
    type: DataType.STRING,
  })
  range: string;

  @Column({
    type: DataType.JSON,
    defaultValue: {
      perDay: 0,
      perMonth: 0,
      perYear: 0,
    },
  })
  noOfStakings: { perDay: number; perMonth: number; perYear: number };

  @Column({
    type: DataType.INTEGER,
  })
  totalNoOfStakings: number;

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
  totalTransactions: number;

  @Column({
    type: DataType.JSON,
    defaultValue: {
      perDay: 0,
      perMonth: 0,
      perYear: 0,
    },
  })
  noOfCompletedTransactions: {
    perDay: number;
    perMonth: number;
    perYear: number;
  };

  @Column({
    type: DataType.INTEGER,
  })
  totalNoOfCompletedTransactions: number;

  @Column({
    type: DataType.JSON,
    defaultValue: {
      perDay: 0,
      perMonth: 0,
      perYear: 0,
    },
  })
  noOfCancelledTransactions: {
    perDay: number;
    perMonth: number;
    perYear: number;
  };

  @Column({
    type: DataType.INTEGER,
  })
  totalNoOfCancelledTransactions: number;

  @Column({
    type: DataType.JSON,
    defaultValue: {
      perDay: 0,
      perMonth: 0,
      perYear: 0,
    },
  })
  noOfFailedTransactions: { perDay: number; perMonth: number; perYear: number };

  @Column({
    type: DataType.INTEGER,
  })
  totalNoOfFailedTransactions: number;

  @Column({
    type: DataType.JSON,
    defaultValue: {
      perDay: 0,
      perMonth: 0,
      perYear: 0,
    },
  })
  noOfPendingTransactions: {
    perDay: number;
    perMonth: number;
    perYear: number;
  };

  @Column({
    type: DataType.INTEGER,
  })
  totalNoOfPendingTransactions: number;
}
