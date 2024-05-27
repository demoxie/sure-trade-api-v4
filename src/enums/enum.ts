export enum Role {
  USER = "USER",
  MERCHANT = "MERCHANT",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export enum CardType {
  VIRTUAL = "VIRTUAL",
  PHYSICAL = "PHYSICAL",
}

export enum CardIssuer {
  AMAZON = "AMAZON",
  OTHER = "OTHER",
}

export enum TransactionType {
  SELL = "SELL",
  BUY = "BUY",
}

export enum PaymentMethod {
  BANK_TRANSFER = "BANK_TRANSFER",
  PAYPAL = "PAYPAL",
}

export enum GiftCardType {
  PHYSICAL = "PHYSICAL",
  VIRTUAL = "VIRTUAL",
}

export enum TransactionStatus {
  NEW = "NEW",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  DECLINED = "DECLINED",
  ACCEPTED = "ACCEPTED",
  ALL = "ALL",
  CANCELLED = "CANCELLED",
}

export enum SortDirection {
  ASCENDING = "ASC",
  DESCENDING = "DESC",
}

export enum BecomeAMerchantRequestStatus {
  APPROVED = "APPROVED",
  PROCESSING = "PROCESSING",
  DISAPPROVED = "DISAPPROVED",
}

export enum StakedAssetStatus {
  NEW = "NEW",
  LOW_BALANCE = "LOW_BALANCE",
  FREEZED = "FREEZED",
}

export enum CardStatus{
  NEW="NEW",
  SOLD="SOLD",
  FLAGGED="FLAGGED",
  ACTIVE="ACTIVE"
}
