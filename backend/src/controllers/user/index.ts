import express from 'express';
import homePageController from './homepage.Controller';
import { forgotPasswordController, changePasswordController } from './forgotPassword.controller';
import signupController from './signup.controller';
import getUserController from './getUser.controller';
import getUserPurchasedCoursesController from './getUserPurchasedCourses.controller';
import { getDiscount } from '../admin/discount';
import { addToCart, removeFromCart, getCart, generateOrderId } from "../admin/cart";
import { paymentController } from '../admin/payment';
import { authMiddleware } from "../../middlewares";
import updateUserDetailsController from './updateUserDetails.controller';
import createCustomerReviewController from './createCustomerReview.controller';

const userRouter = express.Router();

userRouter.get('/homepage', homePageController);
userRouter.post('/signup', signupController);
userRouter.post('/forgot_password', forgotPasswordController);
userRouter.post('/change_password', changePasswordController);
userRouter.get('/get_user/:email', authMiddleware, getUserController);
userRouter.get('/my_courses/:email', authMiddleware, getUserPurchasedCoursesController);
userRouter.put('/update_user', authMiddleware, updateUserDetailsController)
userRouter.get('/apply_discount', authMiddleware, getDiscount);
userRouter.get('/discount', getDiscount);

// ---------------------------------- Cart Routes ----------------------------------
userRouter.post("/cart", authMiddleware, addToCart);
userRouter.delete("/cart", authMiddleware, removeFromCart);
userRouter.get("/cart", authMiddleware, getCart);

// ---------------------------------- Payment Routes ----------------------------------
userRouter.post("/payment/create_order", authMiddleware, generateOrderId);
userRouter.post("/payment", authMiddleware, paymentController);

// ---------------------------------- Custom Review Routes ----------------------------------
userRouter.post("/create_review", authMiddleware, createCustomerReviewController);

export default userRouter;

