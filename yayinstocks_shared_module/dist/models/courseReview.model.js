"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerReviewSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const customerReviewSchema = new mongoose_1.default.Schema({
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    isOnScreen: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });
exports.customerReviewSchema = customerReviewSchema;
