import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Tier } from "./tier.model";
import { TransactionProfile } from "./transaction-profile.model";

@Table({
  tableName: "user",
})
export class User extends Model<User> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  otp: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isVerified: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isActive: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isSuspended: boolean;

  // Optional fields with default values
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "",
  })
  middleName?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: "",
  })
  token?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "",
  })
  transactionPin?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "",
  })
  walletAddress?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "",
  })
  nonce?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "",
  })
  telegram?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "",
  })
  profilePicture?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: "",
  })
  address?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "",
  })
  city?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "",
  })
  state?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "",
  })
  country?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "",
  })
  gender?: string;

  @ForeignKey(() => Tier)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    defaultValue: null,
  })
  tierId?: number;

  @ForeignKey(() => TransactionProfile)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    defaultValue: null,
  })
  transactionProfileId?: number;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    defaultValue: null,
  })
  referralCodes?: any;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "",
  })
  telegramChatId?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;
}
