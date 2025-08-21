import express from 'express';
import { forgotPasswordController, changePasswordController } from './forgotPassword.controller';
import signupController from './signup.controller';
import getUserController from './getUser.controller';
import { getDiscount } from '../admin/discount';
import { addToCart, removeFromCart, getCart } from "../admin/cart"
import { authMiddleware } from "../../middlewares"

const userRouter = express.Router();

userRouter.post('/signup', signupController);
userRouter.post('/forgot_password', forgotPasswordController);
userRouter.post('/change_password', changePasswordController);
userRouter.get('/get_user/:email', authMiddleware, getUserController);

userRouter.get('/apply_discount', authMiddleware, getDiscount);
userRouter.get('/discount', getDiscount);

// ---------------------------------- Cart Routes ----------------------------------
userRouter.post("/cart", authMiddleware, addToCart);
userRouter.delete("/cart", authMiddleware, removeFromCart);
userRouter.get("/cart", authMiddleware, getCart);

export default userRouter;

