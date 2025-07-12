import mongoose from "mongoose";

const courseVideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    sequence: {
        type: Number,
        required: true,
    },
    video_playback_time: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    video_url: {
        type: String,
        required: true,
    }
});

const CourseVideo = mongoose.model("CourseVideo", courseVideoSchema);
export default CourseVideo;