import mongoose from "mongoose";
import { Course } from "../index";
import { purchaseStatusEnum } from "./enums";

const coursePurchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
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
    enum: purchaseStatusEnum,
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

const CoursePurchase = mongoose.model("CoursePurchase", coursePurchaseSchema);
export default CoursePurchase;
