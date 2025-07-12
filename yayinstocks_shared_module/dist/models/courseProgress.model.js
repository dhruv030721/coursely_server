"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const courseProgressSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    lastWatchedVideo: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "CourseVideo",
    },
    videoProgress: {
        type: Number,
        default: 0,
    },
    completedVideos: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "CourseVideo",
            default: [],
        },
    ],
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
const courseProgressModel = mongoose_1.default.model("CourseProgress", courseProgressSchema);
exports.default = courseProgressModel;
