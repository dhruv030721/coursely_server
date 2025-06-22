import { Request, Response } from 'express';
import { logger } from 'yayinstocks_shared_module';
import { User } from 'yayinstocks_shared_module';
import jwt from 'jsonwebtoken';

const generateAuthToken = (payload: { email: string }): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '15m' });
};

const generateRefreshToken = (payload: { email: string }): string => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });
};

export const refreshTokenController = async (req: Request, res: Response): Promise<void> => {
    try {
        const refreshToken = req.cookies.refresh_token;

        if (!refreshToken) {
            res.status(401).json({ success: false, message: 'Refresh token not found' });
            return;
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { email: string };
            
            const user = await User.findOne({ email: decoded.email });
            if (!user) {
                res.status(404).json({ success: false, message: 'User not found' });
                return;
            }

            if (user.role !== "admin") {
                res.status(401).json({ success: false, message: 'Permission denied! You are not authorized to access this resource.' });
                return;
            }

            const payload = { email: decoded.email };
            const newAuthToken = generateAuthToken(payload);
            const newRefreshToken = generateRefreshToken(payload);

            await User.updateOne({ email: decoded.email }, { $set: { refreshToken: newRefreshToken } });

            res.cookie("auth_token", newAuthToken, {
                httpOnly: true,
                secure: true,
                maxAge: 900000, 
                sameSite: 'none'
            }).status(200).json({
                success: true,
                message: 'Auth token refreshed successfully',
                token: newAuthToken
            });

            logger.info(`Auth token refreshed successfully for user ${decoded.email}`);
            return;

        } catch (tokenError) {
            res.clearCookie('auth_token').clearCookie('refresh_token').status(401).json({
                success: false,
                message: 'Invalid or expired refresh token'
            });
            return;
        }

    } catch (error) {
        logger.error('Error in [refresh token controller]:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
}
