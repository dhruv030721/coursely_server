import mongoose from "mongoose";
import { roleENum } from "./enums";

interface UserDocument extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    age: number;
    role: string;
    contact: string;
    refreshToken: string;
    authToken: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: roleENum,
        default: "user",
    },
    refreshToken: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

export {userSchema, UserDocument};
