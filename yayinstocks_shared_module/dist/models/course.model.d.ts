import mongoose from "mongoose";
interface CourseDocument extends mongoose.Document {
    title: string;
    price: number;
    description: string;
    thumbnail: string;
    sections: {
        title: string;
        lectures: {
            title: string;
            sequence: number;
            video_playback_time: string;
            description: string;
            video_url: string;
        }[];
    }[];
    status: "draft" | "published";
    featured: boolean;
}
declare const courseSchema: mongoose.Schema<CourseDocument, mongoose.Model<CourseDocument, any, any, any, mongoose.Document<unknown, any, CourseDocument, any> & CourseDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CourseDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<CourseDocument>, {}> & mongoose.FlatRecord<CourseDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export { CourseDocument, courseSchema };
