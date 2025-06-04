import mongoose from "mongoose";
import { endianness } from "os";
import { start } from "repl";
import { discountCoupenStatusEnum } from "./enums";

const discountSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    status: {
        type: String,
        enum: discountCoupenStatusEnum,
        default: "active",
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

const Discount = mongoose.model("Discount", discountSchema);
export default Discount;