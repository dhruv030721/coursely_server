import { UserDocument, userSchema } from "./models/user.model";
import { OtpDocument, otpSchema } from "./models/otp.model";
import { ContactUsDocument, contactUsSchema } from "./models/contactUs.model";
import { SubscribeDocument, subscribeSchema } from "./models/subscribe.model";
import { DiscountDocument, discountSchema } from "./models/discount.model";
import { CourseDocument, courseSchema } from "./models/course.model";
import { CartDocument, cartSchema } from "./models/cart.model"
import { PaymentHistoryDocument, paymentHistorySchema } from "./models/paymentHistory.model"
import { PurchasedCourseDocument, purchasedCourseSchema } from "./models/purchasedCourse.model"
import { customerReviewDocument, customerReviewSchema } from "./models/courseReview.model"
import { connectDB } from "./config/mongodb";
import mongoose from "mongoose";

let User: mongoose.Model<UserDocument>;
let OTP: mongoose.Model<OtpDocument>;
let Subscribe: mongoose.Model<SubscribeDocument>;
let ContactUs: mongoose.Model<ContactUsDocument>;
let Discount: mongoose.Model<DiscountDocument>;
let Course: mongoose.Model<CourseDocument>;
let Cart: mongoose.Model<CartDocument>;
let PaymentHistory: mongoose.Model<PaymentHistoryDocument>;
let PurchasedCourse: mongoose.Model<PurchasedCourseDocument>;
let CustomerReview: mongoose.Model<customerReviewDocument>;

const initalizeDBPackage = async () => {
  await connectDB();

  User = mongoose.model("User", userSchema);
  OTP = mongoose.model("OTP", otpSchema);
  Subscribe = mongoose.model("Subscribe", subscribeSchema);
  ContactUs = mongoose.model("ContactUs", contactUsSchema);
  Discount = mongoose.model("Discount", discountSchema);
  Course = mongoose.model("Course", courseSchema);
  Cart = mongoose.model("Cart", cartSchema);
  PaymentHistory = mongoose.model("PaymentHistory", paymentHistorySchema);
  PurchasedCourse = mongoose.model("PurchasedCourse", purchasedCourseSchema);
  CustomerReview = mongoose.model("CustomerReview", customerReviewSchema);
};

export {
  User,
  OTP,
  ContactUs,
  Subscribe,
  Discount,
  Course,
  Cart,
  PaymentHistory,
  PurchasedCourse,
  CustomerReview,
  initalizeDBPackage,
  mongoose
};

export * from "./utility";
export * from "./config";
export * from "./models/enums";
