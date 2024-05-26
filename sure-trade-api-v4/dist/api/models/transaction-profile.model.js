"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionProfile = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let TransactionProfile = class TransactionProfile extends sequelize_typescript_1.Model {
};
exports.TransactionProfile = TransactionProfile;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", Number)
], TransactionProfile.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BIGINT,
    }),
    __metadata("design:type", Number)
], TransactionProfile.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
    }),
    __metadata("design:type", Number)
], TransactionProfile.prototype, "transactionLimit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], TransactionProfile.prototype, "range", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        defaultValue: {
            perDay: 0,
            perMonth: 0,
            perYear: 0,
        },
    }),
    __metadata("design:type", Object)
], TransactionProfile.prototype, "noOfStakings", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], TransactionProfile.prototype, "totalNoOfStakings", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        defaultValue: {
            perDay: 0,
            perMonth: 0,
            perYear: 0,
        },
    }),
    __metadata("design:type", Object)
], TransactionProfile.prototype, "noOfTransactions", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], TransactionProfile.prototype, "totalTransactions", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        defaultValue: {
            perDay: 0,
            perMonth: 0,
            perYear: 0,
        },
    }),
    __metadata("design:type", Object)
], TransactionProfile.prototype, "noOfCompletedTransactions", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], TransactionProfile.prototype, "totalNoOfCompletedTransactions", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        defaultValue: {
            perDay: 0,
            perMonth: 0,
            perYear: 0,
        },
    }),
    __metadata("design:type", Object)
], TransactionProfile.prototype, "noOfCancelledTransactions", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], TransactionProfile.prototype, "totalNoOfCancelledTransactions", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        defaultValue: {
            perDay: 0,
            perMonth: 0,
            perYear: 0,
        },
    }),
    __metadata("design:type", Object)
], TransactionProfile.prototype, "noOfFailedTransactions", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], TransactionProfile.prototype, "totalNoOfFailedTransactions", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        defaultValue: {
            perDay: 0,
            perMonth: 0,
            perYear: 0,
        },
    }),
    __metadata("design:type", Object)
], TransactionProfile.prototype, "noOfPendingTransactions", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], TransactionProfile.prototype, "totalNoOfPendingTransactions", void 0);
exports.TransactionProfile = TransactionProfile = __decorate([
    sequelize_typescript_1.Table
], TransactionProfile);
//# sourceMappingURL=transaction-profile.model.js.map