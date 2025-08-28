import mongoose from "mongoose";

interface PaymentHistoryDocument extends mongoose.Document {
    _id: mongoose.ObjectId;
    email: string;
    items: mongoose.Schema.Types.ObjectId[];
    razorpayPaymentId: string;
    razorpayOrderId: string;
    receiptId: string
    amount: number;
    discount?: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const paymentHistorySchema = new mongoose.Schema<PaymentHistoryDocument>(
    {
        email: { type: String, required: true },
        items: [
            {
                type: mongoose.Schema.Types.ObjectId,
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
    },
    {
        timestamps: true,
    }
)

export { PaymentHistoryDocument, paymentHistorySchema };