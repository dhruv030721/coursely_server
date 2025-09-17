import mongoose, { mongo } from "mongoose";

interface PurchasedCourseDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    items: mongoose.Schema.Types.ObjectId[];
}

const purchasedCourseSchema = new mongoose.Schema<PurchasedCourseDocument>({
    email: { type: String, required: true, unique: true, ref: "user" },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Course"
        }
    ],
}, { timestamps: true });

export { purchasedCourseSchema, PurchasedCourseDocument };