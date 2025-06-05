import userSchema from './models/user.model';
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

const initalizeDBPackage = async () => {
    await connectDB()

    User = mongoose.model('User', userSchema)
}

export {
    User,
    courseVideo,
    contactUs,
    subscribe,
    discount,
    course,
    courseReview,
    coursePurchase,
    initalizeDBPackage
}