import express from 'express';
import { loginController } from './login.controller';
import { signupController } from './signup.controller';
import { forgotPasswordController } from './forgotPassword.controller';

const userRouter = express.Router();

userRouter.post('/login', loginController);
userRouter.post('/signup', signupController);
userRouter.post('/forgotpassword', forgotPasswordController)

export { userRouter };