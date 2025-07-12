import mongoose from 'mongoose';

interface OtpDocument extends mongoose.Document {
    email: string;
    otp: string;
    createdAt: Date;
    expiresAt: Date;
}

const otpSchema = new mongoose.Schema<OtpDocument>({
    email: { type: String, required: true, index: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '60' },
});


export { otpSchema, OtpDocument } 