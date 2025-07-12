import mongoose from "mongoose";
interface SubscribeDocument extends mongoose.Document {
    email: string;
}
declare const subscribeSchema: mongoose.Schema<SubscribeDocument, mongoose.Model<SubscribeDocument, any, any, any, mongoose.Document<unknown, any, SubscribeDocument, any> & SubscribeDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, SubscribeDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<SubscribeDocument>, {}> & mongoose.FlatRecord<SubscribeDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export { subscribeSchema, SubscribeDocument };
