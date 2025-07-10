import e, { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { logger, User } from "yayinstocks_shared_module";

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authToken = req.headers.authorization?.split(' ')[1];

        if (!authToken) {
            logger.error('Permission denied, Token validation failed!');
            res.status(401).json({ success: false, message: 'Permission denied! Token not found' });
            return;
        }


        if (authToken) {
            let decoded;
            try {
                decoded = jwt.verify(authToken, process.env.JWT_SECRET as string) as { email: string };
            } catch (error: any) {
                if (error.name === 'TokenExpiredError') {
                    logger.error('Token expired!');
                    res.status(401).json({ success: false, message: 'Token expired' });
                    return;
                }
                logger.error('Invalid token!');
                res.status(401).json({ success: false, message: 'Invalid token' });
                return;
            }
            if (!decoded) {
                logger.error('Permission denied, Auth token validation failed!');
                res.status(401).json({ success: false, message: 'Permission denied! You are not authorized to access this resource.' });
                return;
            }
            req.body.email = decoded.email;
        }

        const userObject = await User.findOne({ email: req.body.email });

        if (!userObject) {
            logger.error('Permission denied, User not found!');
            res.status(401).json({ success: false, message: 'Permission denied! User not found' });
            return;
        }

        req.body.userObject = userObject;

        if (!userObject.refreshToken) {
            logger.error('Permission denied, Token validation failed!');
            res.status(401).json({ success: false, message: 'Permission denied! Token not found' });
            return;
        }

        if (userObject.refreshToken) {
            try {
                jwt.verify(userObject.refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
            } catch (error) {
                logger.error('Permission denied, Refresh token validation failed!');
                res.status(401).json({ success: false, message: 'Permission denied! You are not authorized to access this resource.' });
                return;
            }
        }

        next();
    } catch (error) {
        logger.error('Error in [auth middleware]:', error);
        res.status(500).json({ success: false, message: 'Internal server error!' });
        return;
    }
}

export default authMiddleware;