import mongoose from "mongoose";
declare const courseProgressModel: mongoose.Model<{
    updatedAt: NativeDate;
    courseId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    videoProgress: number;
    completedVideos: mongoose.Types.ObjectId[];
    lastWatchedVideo?: mongoose.Types.ObjectId | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    updatedAt: NativeDate;
    courseId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    videoProgress: number;
    completedVideos: mongoose.Types.ObjectId[];
    lastWatchedVideo?: mongoose.Types.ObjectId | null | undefined;
}, {}> & {
    updatedAt: NativeDate;
    courseId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    videoProgress: number;
    completedVideos: mongoose.Types.ObjectId[];
    lastWatchedVideo?: mongoose.Types.ObjectId | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    updatedAt: NativeDate;
    courseId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    videoProgress: number;
    completedVideos: mongoose.Types.ObjectId[];
    lastWatchedVideo?: mongoose.Types.ObjectId | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    updatedAt: NativeDate;
    courseId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    videoProgress: number;
    completedVideos: mongoose.Types.ObjectId[];
    lastWatchedVideo?: mongoose.Types.ObjectId | null | undefined;
}>, {}> & mongoose.FlatRecord<{
    updatedAt: NativeDate;
    courseId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    videoProgress: number;
    completedVideos: mongoose.Types.ObjectId[];
    lastWatchedVideo?: mongoose.Types.ObjectId | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default courseProgressModel;
