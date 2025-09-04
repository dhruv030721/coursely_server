"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homepage_Controller_1 = __importDefault(require("./homepage.Controller"));
const forgotPassword_controller_1 = require("./forgotPassword.controller");
const signup_controller_1 = __importDefault(require("./signup.controller"));
const getUser_controller_1 = __importDefault(require("./getUser.controller"));
const getUserPurchasedCourses_controller_1 = __importDefault(require("./getUserPurchasedCourses.controller"));
const discount_1 = require("../admin/discount");
const cart_1 = require("../admin/cart");
const payment_1 = require("../admin/payment");
const middlewares_1 = require("../../middlewares");
const userRouter = express_1.default.Router();
userRouter.get('/homepage', homepage_Controller_1.default);
userRouter.post('/signup', signup_controller_1.default);
userRouter.post('/forgot_password', forgotPassword_controller_1.forgotPasswordController);
userRouter.post('/change_password', forgotPassword_controller_1.changePasswordController);
userRouter.get('/get_user/:email', middlewares_1.authMiddleware, getUser_controller_1.default);
userRouter.get('/my_courses/:email', middlewares_1.authMiddleware, getUserPurchasedCourses_controller_1.default);
userRouter.get('/apply_discount', middlewares_1.authMiddleware, discount_1.getDiscount);
userRouter.get('/discount', discount_1.getDiscount);
// ---------------------------------- Cart Routes ----------------------------------
userRouter.post("/cart", middlewares_1.authMiddleware, cart_1.addToCart);
userRouter.delete("/cart", middlewares_1.authMiddleware, cart_1.removeFromCart);
userRouter.get("/cart", middlewares_1.authMiddleware, cart_1.getCart);
// ---------------------------------- Payment Routes ----------------------------------
userRouter.post("/payment/create_order", middlewares_1.authMiddleware, cart_1.generateOrderId);
userRouter.post("/payment", middlewares_1.authMiddleware, payment_1.paymentController);
exports.default = userRouter;
