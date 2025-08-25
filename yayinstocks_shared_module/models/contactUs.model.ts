import mongoose from "mongoose"

interface ContactUsDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    contact: string;
    subject: string;
    message: string;
    status: "pending" | "resolved" | "rejected";
}

const contactUsSchema = new mongoose.Schema<ContactUsDocument>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "resolved", "rejected"],
        default: "pending"
    }
}, {
    timestamps: true,
});


export { contactUsSchema, ContactUsDocument };