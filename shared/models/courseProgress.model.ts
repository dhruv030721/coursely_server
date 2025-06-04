import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    lastWatchedVideo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseVideo",
    },
    videoProgress: {
        type: Number,
        default: 0,
    },
    completedVideos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseVideo",
            default: [],
        },
    ],
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const courseProgressModel = mongoose.model("CourseProgress", courseProgressSchema);
export default courseProgressModel
