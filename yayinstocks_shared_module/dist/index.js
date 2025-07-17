"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initalizeDBPackage = exports.coursePurchase = exports.courseReview = exports.Course = exports.Discount = exports.Subscribe = exports.ContactUs = exports.OTP = exports.User = void 0;
const user_model_1 = require("./models/user.model");
const otp_model_1 = require("./models/otp.model");
const contactUs_model_1 = require("./models/contactUs.model");
const subscribe_model_1 = require("./models/subscribe.model");
const discount_model_1 = require("./models/discount.model");
const course_model_1 = require("./models/course.model");
const courseReview_model_1 = __importDefault(require("./models/courseReview.model"));
exports.courseReview = courseReview_model_1.default;
const coursePurchase_model_1 = __importDefault(require("./models/coursePurchase.model"));
exports.coursePurchase = coursePurchase_model_1.default;
const mongodb_1 = require("./config/mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
let User;
let OTP;
let Subscribe;
let ContactUs;
let Discount;
let Course;
const initalizeDBPackage = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongodb_1.connectDB)();
    exports.User = User = mongoose_1.default.model("User", user_model_1.userSchema);
    exports.OTP = OTP = mongoose_1.default.model("OTP", otp_model_1.otpSchema);
    exports.Subscribe = Subscribe = mongoose_1.default.model("Subscribe", subscribe_model_1.subscribeSchema);
    exports.ContactUs = ContactUs = mongoose_1.default.model("ContactUs", contactUs_model_1.contactUsSchema);
    exports.Discount = Discount = mongoose_1.default.model("Discount", discount_model_1.discountSchema);
    exports.Course = Course = mongoose_1.default.model("Course", course_model_1.courseSchema);
});
exports.initalizeDBPackage = initalizeDBPackage;
__exportStar(require("./utility"), exports);
__exportStar(require("./config"), exports);
__exportStar(require("./models/enums"), exports);
