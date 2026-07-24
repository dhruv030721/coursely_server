import mongoose from "mongoose";
interface CartDocument extends mongoose.Document {
    email: string;
    items: mongoose.Schema.Types.ObjectId[];
}
declare const cartSchema: mongoose.Schema<CartDocument, mongoose.Model<CartDocument, any, any, any, mongoose.Document<unknown, any, CartDocument, any, {}> & CartDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CartDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<CartDocument>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<CartDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export { CartDocument, cartSchema };
