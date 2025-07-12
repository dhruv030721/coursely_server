import mongoose from "mongoose";
import { discountCoupenStatusEnum } from "./enums";

interface DiscountDocument extends mongoose.Document {
  code: string;
  offerText: string;
  discount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const discountSchema = new mongoose.Schema<DiscountDocument>({
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
    enum: discountCoupenStatusEnum,
    default: discountCoupenStatusEnum.ACTIVE,
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

export { DiscountDocument, discountSchema };
