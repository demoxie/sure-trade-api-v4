import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";
import { Wallet } from "./wallet.model";
import { BankDetails } from "./bank-details";
import { GiftCardRate } from "./gift-card-rate.model";
import { GiftCard } from "./gift-card.model";
import {
  CardIssuer,
  CardType,
  PaymentMethod,
  TransactionStatus,
  TransactionType,
} from "../enums/enum";

@Table
export class GiftCardTransaction extends Model<GiftCardTransaction> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  })
  id: number;

  @ForeignKey(() => GiftCard)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  giftCardId: number;

  @ForeignKey(() => GiftCardRate)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  giftCardRateId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  userId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  merchantId: number;

  @Column({
    type: DataType.ENUM(TransactionType.BUY, TransactionType.SELL),
    allowNull: false,
  })
  transactionType: TransactionType;

  @Column({
    type: DataType.ENUM(CardType.PHYSICAL, CardType.VIRTUAL),
  })
  cardType: CardType;

  @Column({
    type: DataType.ENUM(CardIssuer.AMAZON, CardIssuer.OTHER),
  })
  cardIssuer: CardIssuer;

  @Column({
    type: DataType.ENUM(PaymentMethod.PAYPAL, PaymentMethod.BANK_TRANSFER),
  })
  paymentMethod: PaymentMethod;

  @ForeignKey(() => BankDetails)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  bankDetailsId: number;

  @ForeignKey(() => Wallet)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  walletAddressId: number;

  @BelongsTo(() => BankDetails)
  bankDetails: BankDetails;

  @BelongsTo(() => User, { foreignKey: "merchantId", as: "merchant" })
  merchant: User;

  @BelongsTo(() => User, { foreignKey: "userId", as: "user" })
  user: User;

  @BelongsTo(() => GiftCardRate)
  giftCardRate: GiftCardRate;

  @BelongsTo(() => Wallet)
  wallet: Wallet;

  @BelongsTo(() => GiftCard)
  giftCard: GiftCard;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  fee: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currency: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  referenceNo: string;

  @Column({
    type: DataType.ENUM(
      TransactionStatus.NEW,
      TransactionStatus.COMPLETED,
      TransactionStatus.COMPLETED,
    ),
    allowNull: false,
  })
  status: TransactionStatus;

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
