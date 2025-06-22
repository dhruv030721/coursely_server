import { Request, Response, NextFunction } from 'express';
import { User } from 'yayinstocks_shared_module';
import { logger } from 'yayinstocks_shared_module';

const userMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({ message: 'User not found!' });
            return;
        }

        if (user.role !== "admin") {
            res.status(401).json({ message: 'Permission denied! You are not authorized to access this resource.' });
            return;
        }
    } catch (error) {
        logger.error('Error in [admin middleware]:', error);
        res.status(500).json({ message: 'Internal server error!' });
        return;
    } finally {
        next();
    }

}

export default userMiddleware;