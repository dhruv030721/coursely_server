import e, { Request, Response } from 'express';
import { logger } from 'yayinstocks_shared_module';
import { User } from 'yayinstocks_shared_module';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateAuthToken = (payload: { email: string }): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '15m' });
};

const generateRefreshToken = (payload: { email: string }): string => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });
};

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

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ success: false, message: 'Invalid password' });
            return;
        }

        const payload = {
            email: user.email
        };

        const authToken = generateAuthToken(payload);
        const refreshToken = generateRefreshToken(payload);

        if (!authToken || !refreshToken) {
            res.status(500).json({ success: false, message: 'Failed to generate tokens' });
            return;
        }

        res.cookie("auth_token", authToken, {
            maxAge: 900000,
            sameSite: process.env.ENV_MODE === 'PROD' ? 'none' : 'lax',
            secure: process.env.ENV_MODE === 'PROD' ? true : false,
            httpOnly: false,
        }).cookie("refresh_token", refreshToken, {
            maxAge: 7 * 24 * 3600000,
            sameSite: process.env.ENV_MODE === 'PROD' ? 'none' : 'lax',
            secure: process.env.ENV_MODE === 'PROD' ? true : false,
            httpOnly: true,
        }).status(200).json({
            success: true,
            message: 'Login successful',
            token: authToken
        });
        logger.info(`User ${user.email} logged in successfully`);
        return;

    } catch (error) {
        logger.error('Error in [login controller]:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
}