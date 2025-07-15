"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const courseVideoSchema = new mongoose_1.default.Schema({
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
const CourseVideo = mongoose_1.default.model("CourseVideo", courseVideoSchema);
exports.default = CourseVideo;
