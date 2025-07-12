"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discountSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enums_1 = require("./enums");
const discountSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    offerText: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    status: {
        type: String,
        enum: enums_1.discountCoupenStatusEnum,
        default: enums_1.discountCoupenStatusEnum.ACTIVE,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
exports.discountSchema = discountSchema;
