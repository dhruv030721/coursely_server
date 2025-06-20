import userSchema from './models/user.model';
import { otpSchema, OtpDocument } from './models/otp.model';
import courseVideo from './models/courseVideo.model';
import contactUs from './models/contactUs.model';
import subscribe from './models/subscribe.model';
import discount from './models/discount.model';
import course from './models/course.model';
import courseReview from './models/courseReview.model';
import coursePurchase from './models/coursePurchase.model';
import { connectDB } from './config/mongodb';
import mongoose from 'mongoose';

let User: mongoose.Model<any>;
let OTP: mongoose.Model<OtpDocument>;

const initalizeDBPackage = async () => {
    await connectDB()

    User = mongoose.model('User', userSchema)
    OTP = mongoose.model('OTP', otpSchema)
}

export {
    User,
    OTP,
    courseVideo,
    contactUs,
    subscribe,
    discount,
    course,
    courseReview,
    coursePurchase,
    initalizeDBPackage
}