import { userSchema, UserDocument } from "./models/user.model";
import { otpSchema, OtpDocument } from "./models/otp.model";
import { contactUsSchema, ContactUsDocument } from "./models/contactUs.model";
import { subscribeSchema, SubscribeDocument } from "./models/subscribe.model";
import { DiscountDocument, discountSchema } from "./models/discount.model";
import { CourseDocument, courseSchema } from "./models/course.model";
import { CartDocument, cartSchema } from "./models/cart.model"
import courseReview from "./models/courseReview.model";
import coursePurchase from "./models/coursePurchase.model";
import { connectDB } from "./config/mongodb";
import mongoose from "mongoose";

let User: mongoose.Model<UserDocument>;
let OTP: mongoose.Model<OtpDocument>;
let Subscribe: mongoose.Model<SubscribeDocument>;
let ContactUs: mongoose.Model<ContactUsDocument>;
let Discount: mongoose.Model<DiscountDocument>;
let Course: mongoose.Model<CourseDocument>;
let Cart: mongoose.Model<CartDocument>;

const initalizeDBPackage = async () => {
  await connectDB();

  User = mongoose.model("User", userSchema);
  OTP = mongoose.model("OTP", otpSchema);
  Subscribe = mongoose.model("Subscribe", subscribeSchema);
  ContactUs = mongoose.model("ContactUs", contactUsSchema);
  Discount = mongoose.model("Discount", discountSchema);
  Course = mongoose.model("Course", courseSchema);
  Cart = mongoose.model("Cart", cartSchema);
};

export {
  User,
  OTP,
  ContactUs,
  Subscribe,
  Discount,
  Course,
  Cart,
  courseReview,
  coursePurchase,
  initalizeDBPackage,
};

export * from "./utility";
export * from "./config";
export * from "./models/enums";
