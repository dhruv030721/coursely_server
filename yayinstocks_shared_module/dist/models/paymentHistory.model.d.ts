import mongoose from "mongoose";
interface PaymentHistoryDocument extends mongoose.Document {
    _id: mongoose.ObjectId;
    email: string;
    items: mongoose.Schema.Types.ObjectId[];
    razorpayPaymentId: string;
    razorpayOrderId: string;
    receiptId: string;
    amount: number;
    discount?: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const paymentHistorySchema: mongoose.Schema<PaymentHistoryDocument, mongoose.Model<PaymentHistoryDocument, any, any, any, mongoose.Document<unknown, any, PaymentHistoryDocument, any, {}> & PaymentHistoryDocument & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, PaymentHistoryDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<PaymentHistoryDocument>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<PaymentHistoryDocument> & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}> & {
    __v: number;
}>;
export { PaymentHistoryDocument, paymentHistorySchema };
