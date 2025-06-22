import express from 'express';
import { loginController } from './login.controller';
import { userMiddleware, adminMiddleware, authMiddleware } from '../../middlewares';
import logoutController from './logout.controller';

const authRouter = express.Router();

authRouter.post('/login', userMiddleware, loginController);
authRouter.post('/logout', authMiddleware, logoutController);
authRouter.post('/admin/login', adminMiddleware, loginController);

export default authRouter;