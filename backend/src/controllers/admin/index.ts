import express from 'express';
import { loginController } from './login.controller';

const userRouter = express.Router();

userRouter.post('/login', loginController);

export default userRouter ;