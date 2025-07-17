"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const courseSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    sections: {
        type: [
            {
                title: {
                    type: String,
                    required: true,
                },
                lectures: [
                    {
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
                        },
                    },
                ],
            },
        ],
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },
    featured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.courseSchema = courseSchema;
