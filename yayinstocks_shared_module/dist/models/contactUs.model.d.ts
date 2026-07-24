import mongoose from "mongoose";
interface ContactUsDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    contact: string;
    subject: string;
    message: string;
    status: "pending" | "resolved" | "rejected";
}
declare const contactUsSchema: mongoose.Schema<ContactUsDocument, mongoose.Model<ContactUsDocument, any, any, any, mongoose.Document<unknown, any, ContactUsDocument, any, {}> & ContactUsDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ContactUsDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<ContactUsDocument>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<ContactUsDocument> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export { contactUsSchema, ContactUsDocument };
