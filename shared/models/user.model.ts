import mongoose from "mongoose";
import { genderEnum, roleENum } from "./enums";

const userSchema = new mongoose.Schema({
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
    gender: {
        type: String,
        enum: genderEnum,
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
    createdAt: {
        type: Date,
        default: Date.now,
    },  
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

// const User = mongoose.model('User', userSchema);
export default userSchema;
