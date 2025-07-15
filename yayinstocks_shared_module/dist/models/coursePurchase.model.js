"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enums_1 = require("./enums");
const coursePurchaseSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courses: [
        {
            courseId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Course",
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            purchaseDate: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: enums_1.purchaseStatusEnum,
        default: "pending",
    },
    transactionId: {
        type: String,
        required: false,
    },
    orderId: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const CoursePurchase = mongoose_1.default.model("CoursePurchase", coursePurchaseSchema);
exports.default = CoursePurchase;
