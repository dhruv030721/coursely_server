"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentHistorySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paymentHistorySchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    items: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            required: true,
            ref: "Course"
        }
    ],
    razorpayPaymentId: { type: String, required: true },
    razorpayOrderId: { type: String, required: true },
    receiptId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, enum: ["pending", "completed", "failed"] },
    discount: { type: String }
}, {
    timestamps: true,
});
exports.paymentHistorySchema = paymentHistorySchema;
