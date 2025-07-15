import mongoose from "mongoose";
declare const CourseVideo: mongoose.Model<{
    description: string;
    title: string;
    sequence: number;
    video_playback_time: string;
    video_url: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    description: string;
    title: string;
    sequence: number;
    video_playback_time: string;
    video_url: string;
}, {}> & {
    description: string;
    title: string;
    sequence: number;
    video_playback_time: string;
    video_url: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    description: string;
    title: string;
    sequence: number;
    video_playback_time: string;
    video_url: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    description: string;
    title: string;
    sequence: number;
    video_playback_time: string;
    video_url: string;
}>, {}> & mongoose.FlatRecord<{
    description: string;
    title: string;
    sequence: number;
    video_playback_time: string;
    video_url: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default CourseVideo;
