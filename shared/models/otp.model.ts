import { Schema, Document } from 'mongoose';

interface OtpDocument extends Document {
    email: string;
    otp: string;
    createdAt: Date;
    expiresAt: Date;
}

const otpSchema = new Schema<OtpDocument>({
    email: { type: String, required: true, index: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '60' },
});


export { otpSchema, OtpDocument } 