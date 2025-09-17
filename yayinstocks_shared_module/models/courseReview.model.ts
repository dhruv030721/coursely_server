import mongoose from "mongoose";

interface customerReviewDocument extends mongoose.Document {
    courseId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    rating: number;
    message: string;
    isOnScreen: boolean;
}

const customerReviewSchema = new mongoose.Schema<customerReviewDocument>({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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

export { customerReviewSchema, customerReviewDocument };
