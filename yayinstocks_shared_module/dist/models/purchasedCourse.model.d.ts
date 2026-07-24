import mongoose from "mongoose";
interface PurchasedCourseDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    items: mongoose.Schema.Types.ObjectId[];
}
declare const purchasedCourseSchema: mongoose.Schema<PurchasedCourseDocument, mongoose.Model<PurchasedCourseDocument, any, any, any, mongoose.Document<unknown, any, PurchasedCourseDocument, any, {}> & PurchasedCourseDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, PurchasedCourseDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<PurchasedCourseDocument>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<PurchasedCourseDocument> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export { purchasedCourseSchema, PurchasedCourseDocument };
