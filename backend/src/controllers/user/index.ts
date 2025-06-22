import express from 'express';
import { loginController } from './login.controller';
import { signupController } from './signup.controller';
import { forgotPasswordController, changePasswordController } from './forgotPassword.controller';
import { refreshTokenController } from './refreshToken.controller';

const userRouter = express.Router();

userRouter.post('/login', loginController);
userRouter.post('/signup', signupController);
userRouter.post('/forgot_password', forgotPasswordController);
userRouter.post('/change_password', changePasswordController);
userRouter.post('/refresh_token', refreshTokenController);

export default userRouter;

export * from './login.controller';
export * from './signup.controller';
export * from './forgotPassword.controller';
export * from './refreshToken.controller';