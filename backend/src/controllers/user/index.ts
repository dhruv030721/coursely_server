import express from 'express';
import { forgotPasswordController, changePasswordController } from './forgotPassword.controller';
import signupController from './signup.controller';
import getUserController from './getUser.controller';

const userRouter = express.Router();

userRouter.post('/signup', signupController);
userRouter.post('/forgot_password', forgotPasswordController);
userRouter.post('/change_password', changePasswordController);
userRouter.get('/get_user/:email', getUserController);

export default userRouter;

