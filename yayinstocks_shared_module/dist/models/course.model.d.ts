import mongoose from "mongoose";
interface CourseDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    price: number;
    description: string;
    thumbnail: string;
    sections: {
        _id?: mongoose.Types.ObjectId;
        title: string;
        lectures: {
            _id?: mongoose.Types.ObjectId;
            title: string;
            video_playback_time: string;
            video_url: string;
        }[];
    }[];
    status: "draft" | "published";
    featured: boolean;
}
declare const courseSchema: mongoose.Schema<CourseDocument, mongoose.Model<CourseDocument, any, any, any, mongoose.Document<unknown, any, CourseDocument, any> & CourseDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CourseDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<CourseDocument>, {}> & mongoose.FlatRecord<CourseDocument> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export { CourseDocument, courseSchema };
