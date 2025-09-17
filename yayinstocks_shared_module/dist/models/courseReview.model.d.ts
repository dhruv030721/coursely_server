import mongoose from "mongoose";
interface customerReviewDocument extends mongoose.Document {
    courseId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    rating: number;
    message: string;
    isOnScreen: boolean;
}
declare const customerReviewSchema: mongoose.Schema<customerReviewDocument, mongoose.Model<customerReviewDocument, any, any, any, mongoose.Document<unknown, any, customerReviewDocument, any> & customerReviewDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, customerReviewDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<customerReviewDocument>, {}> & mongoose.FlatRecord<customerReviewDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export { customerReviewSchema, customerReviewDocument };
