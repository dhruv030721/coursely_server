import express from 'express';
import { forgotPasswordController, changePasswordController } from './forgotPassword.controller';
import { refreshTokenController } from '../auth/refreshToken.controller';

const userRouter = express.Router();
userRouter.post('/forgot_password', forgotPasswordController);
userRouter.post('/change_password', changePasswordController);
userRouter.post('/refresh_token', refreshTokenController);

export default userRouter;

export * from './signup.controller';
export * from './forgotPassword.controller';
