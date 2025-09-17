"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchasedCourseSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const purchasedCourseSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true, ref: "user" },
    items: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            required: true,
            ref: "Course"
        }
    ],
}, { timestamps: true });
exports.purchasedCourseSchema = purchasedCourseSchema;
