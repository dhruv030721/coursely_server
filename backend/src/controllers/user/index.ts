import express from 'express';
import { loginController } from './login.controller';
import { signupController } from './signup.controller';
import { forgotPasswordController, changePasswordController } from './forgotPassword.controller';

const userRouter = express.Router();

userRouter.post('/login', loginController);
userRouter.post('/signup', signupController);
userRouter.post('/forgot_password', forgotPasswordController)
userRouter.post('/change_password', changePasswordController)

export { userRouter };