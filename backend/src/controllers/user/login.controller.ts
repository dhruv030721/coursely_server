import e, { Request, Response } from 'express';
import { logger } from 'yayinstocks_shared_module/utility/logger';
import { User } from 'yayinstocks_shared_module';
import jwt from 'jsonwebtoken';

export const loginController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ success: false, message: 'Email and password are required' });
            return;
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        const payload = {
            email: user.email
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        if (!token) {
            res.status(500).json({ success: false, message: 'Failed to generate token' });
            return;
        }

        res.cookie("auth_token", token).status(200).json({
            success: true,
            message: 'Login successful',
            token: token
        });
        logger.info(`User ${user.email} logged in successfully`);
        return;

    } catch (error) {
        logger.error('Error in [login controller]:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
}