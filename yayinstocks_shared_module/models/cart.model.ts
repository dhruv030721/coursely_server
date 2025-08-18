import mongoose, { mongo } from "mongoose";
import { ref } from "process";

interface CartDocument extends mongoose.Document {
    email: string;
    items: mongoose.Schema.Types.ObjectId[]
}

const cartSchema = new mongoose.Schema<CartDocument>(
    {
        email: { type: String, required: true, unique: true },
        items: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Course"
            }]
    },
    { timestamps: true }
)


export { CartDocument, cartSchema };