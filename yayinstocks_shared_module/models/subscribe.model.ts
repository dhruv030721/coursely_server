import mongoose from "mongoose";

interface SubscribeDocument extends mongoose.Document {
    email: string;
}

const subscribeSchema = new mongoose.Schema<SubscribeDocument>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
});

export { subscribeSchema, SubscribeDocument };