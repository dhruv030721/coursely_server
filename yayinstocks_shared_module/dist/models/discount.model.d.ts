import mongoose from "mongoose";
interface DiscountDocument extends mongoose.Document {
    code: string;
    offerText: string;
    discount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const discountSchema: mongoose.Schema<DiscountDocument, mongoose.Model<DiscountDocument, any, any, any, mongoose.Document<unknown, any, DiscountDocument, any> & DiscountDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, DiscountDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<DiscountDocument>, {}> & mongoose.FlatRecord<DiscountDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export { DiscountDocument, discountSchema };
