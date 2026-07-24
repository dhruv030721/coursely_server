import mongoose from 'mongoose';
interface OtpDocument extends mongoose.Document {
    email: string;
    otp: string;
    createdAt: Date;
    expiresAt: Date;
}
declare const otpSchema: mongoose.Schema<OtpDocument, mongoose.Model<OtpDocument, any, any, any, mongoose.Document<unknown, any, OtpDocument, any, {}> & OtpDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, OtpDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<OtpDocument>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<OtpDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export { otpSchema, OtpDocument };
