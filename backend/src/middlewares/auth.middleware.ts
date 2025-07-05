import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { logger } from "yayinstocks_shared_module";

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const refreshToken = req.cookies.refresh_token;
        const authToken = req.headers.authorization?.split(' ')[1];

        if (!refreshToken || !authToken) {
            logger.error('Permission denied, Token validation failed!');
            res.status(401).json({ message: 'Permission denied! You are not authorized to access this resource.' });
            return;
        }

        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { email: string };
            // TODO - Handle the case where the auth token is not valid or expired
            if (!decoded) {
                logger.error('Permission denied, Refresh token validation failed!');
                res.status(401).json({ message: 'Permission denied! You are not authorized to access this resource.' });
                return;
            }
            req.body.email = decoded.email;
        }

        if (authToken) {
            const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string) as { email: string };
            // TODO - Handle the case where the auth token is not valid or expired
            if (!decoded) {
                logger.error('Permission denied, Auth token validation failed!');
                res.status(401).json({ message: 'Permission denied! You are not authorized to access this resource.' });
                return;
            }
            req.body.email = decoded.email;
        }
        next();
    } catch (error) {
        logger.error('Error in [auth middleware]:', error);
        res.status(500).json({ message: 'Internal server error!' });
        return;
    }
}

export default authMiddleware;