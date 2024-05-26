"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardStatus = exports.StakedAssetStatus = exports.BecomeAMerchantRequestStatus = exports.SortDirection = exports.TransactionStatus = exports.GiftCardType = exports.PaymentMethod = exports.TransactionType = exports.CardIssuer = exports.CardType = exports.Role = void 0;
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["MERCHANT"] = "MERCHANT";
    Role["ADMIN"] = "ADMIN";
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
})(Role || (exports.Role = Role = {}));
var CardType;
(function (CardType) {
    CardType["VIRTUAL"] = "VIRTUAL";
    CardType["PHYSICAL"] = "PHYSICAL";
})(CardType || (exports.CardType = CardType = {}));
var CardIssuer;
(function (CardIssuer) {
    CardIssuer["AMAZON"] = "AMAZON";
    CardIssuer["OTHER"] = "OTHER";
})(CardIssuer || (exports.CardIssuer = CardIssuer = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["SELL"] = "SELL";
    TransactionType["BUY"] = "BUY";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["BANK_TRANSFER"] = "BANK_TRANSFER";
    PaymentMethod["PAYPAL"] = "PAYPAL";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var GiftCardType;
(function (GiftCardType) {
    GiftCardType["PHYSICAL"] = "PHYSICAL";
    GiftCardType["VIRTUAL"] = "VIRTUAL";
})(GiftCardType || (exports.GiftCardType = GiftCardType = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["NEW"] = "NEW";
    TransactionStatus["PROCESSING"] = "PROCESSING";
    TransactionStatus["COMPLETED"] = "COMPLETED";
    TransactionStatus["DECLINED"] = "DECLINED";
    TransactionStatus["ACCEPTED"] = "ACCEPTED";
    TransactionStatus["ALL"] = "ALL";
    TransactionStatus["CANCELLED"] = "CANCELLED";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
var SortDirection;
(function (SortDirection) {
    SortDirection["ASCENDING"] = "ASC";
    SortDirection["DESCENDING"] = "DESC";
})(SortDirection || (exports.SortDirection = SortDirection = {}));
var BecomeAMerchantRequestStatus;
(function (BecomeAMerchantRequestStatus) {
    BecomeAMerchantRequestStatus["APPROVED"] = "APPROVED";
    BecomeAMerchantRequestStatus["PROCESSING"] = "PROCESSING";
    BecomeAMerchantRequestStatus["DISAPPROVED"] = "DISAPPROVED";
})(BecomeAMerchantRequestStatus || (exports.BecomeAMerchantRequestStatus = BecomeAMerchantRequestStatus = {}));
var StakedAssetStatus;
(function (StakedAssetStatus) {
    StakedAssetStatus["NEW"] = "NEW";
    StakedAssetStatus["LOW_BALANCE"] = "LOW_BALANCE";
    StakedAssetStatus["FREEZED"] = "FREEZED";
})(StakedAssetStatus || (exports.StakedAssetStatus = StakedAssetStatus = {}));
var CardStatus;
(function (CardStatus) {
    CardStatus["NEW"] = "NEW";
    CardStatus["SOLD"] = "SOLD";
    CardStatus["FLAGGED"] = "FLAGGED";
    CardStatus["ACTIVE"] = "ACTIVE";
})(CardStatus || (exports.CardStatus = CardStatus = {}));
//# sourceMappingURL=enum.js.map