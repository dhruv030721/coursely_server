import express from 'express';
import { loginController } from './login.controller';
import { signupController } from './signup.controller';


const userRouter = express.Router();

userRouter.post('/login', loginController);
userRouter.post('/signup', signupController);

export { userRouter };