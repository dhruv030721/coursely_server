import express from 'express';
import { userMiddleware, adminMiddleware, authMiddleware } from '../../middlewares';
import loginController from './login.controller';
import logoutController from './logout.controller';
import verifyTokenController from './verifyToken.controller';

const  authRouter = express.Router();

authRouter.post('/login', userMiddleware, loginController);
authRouter.post('/logout', authMiddleware, logoutController);
authRouter.post('/admin/login', adminMiddleware, loginController);
authRouter.get('/verify_token', authMiddleware, verifyTokenController);

export default authRouter;