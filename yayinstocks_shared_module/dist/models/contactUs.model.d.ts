import mongoose from "mongoose";
interface ContactUsDocument extends mongoose.Document {
    name: string;
    email: string;
    contact: string;
    subject: string;
    message: string;
    status: "pending" | "resolved" | "rejected";
}
declare const contactUsSchema: mongoose.Schema<ContactUsDocument, mongoose.Model<ContactUsDocument, any, any, any, mongoose.Document<unknown, any, ContactUsDocument, any> & ContactUsDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ContactUsDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<ContactUsDocument>, {}> & mongoose.FlatRecord<ContactUsDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export { contactUsSchema, ContactUsDocument };
