import mongoose from "mongoose"

interface ContactUsDocument extends mongoose.Document {
    name: string;
    email: string;
    contact: string;
    subject: string;
    message: string;
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
    }
}, {
    timestamps: true,
});


export { contactUsSchema, ContactUsDocument };