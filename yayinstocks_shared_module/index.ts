import { userSchema, UserDocument } from "./models/user.model";
import { otpSchema, OtpDocument } from "./models/otp.model";
import { contactUsSchema, ContactUsDocument } from "./models/contactUs.model";
import { subscribeSchema, SubscribeDocument } from "./models/subscribe.model";
import courseVideo from "./models/courseVideo.model";
import { DiscountDocument, discountSchema } from "./models/discount.model";
import course from "./models/course.model";
import courseReview from "./models/courseReview.model";
import coursePurchase from "./models/coursePurchase.model";
import { connectDB } from "./config/mongodb";
import mongoose from "mongoose";

let User: mongoose.Model<UserDocument>;
let OTP: mongoose.Model<OtpDocument>;
let Subscribe: mongoose.Model<SubscribeDocument>;
let ContactUs: mongoose.Model<ContactUsDocument>;
let Discount: mongoose.Model<DiscountDocument>;

const initalizeDBPackage = async () => {
  await connectDB();

  User = mongoose.model("User", userSchema);
  OTP = mongoose.model("OTP", otpSchema);
  Subscribe = mongoose.model("Subscribe", subscribeSchema);
  ContactUs = mongoose.model("ContactUs", contactUsSchema);
  Discount = mongoose.model("Discount", discountSchema);
};

export {
  User,
  OTP,
  ContactUs,
  Subscribe,
  courseVideo,
  Discount,
  course,
  courseReview,
  coursePurchase,
  initalizeDBPackage,
};

export * from "./utility";
export * from "./config";
export * from "./models/enums";
