import mongoose from "mongoose";
declare const CourseReview: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    comment: string;
    courseId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    rating: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    comment: string;
    courseId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    rating: number;
}, {}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    comment: string;
    courseId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    rating: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    comment: string;
    courseId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    rating: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    comment: string;
    courseId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    rating: number;
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    comment: string;
    courseId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    rating: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default CourseReview;
