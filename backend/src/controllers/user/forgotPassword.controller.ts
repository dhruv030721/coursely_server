import { logger } from 'yayinstocks_shared_module/utility/logger';
import { Request, Response } from 'express';

export const forgotPassword = (req: Request, res: Response) => {
    try {
        const { email } = req.body

        if (!email || email == "") {
            res.status(400).json({ success: false, message: 'Email is required' });
            return;
        }


    } catch (error) {
        logger.error(error)
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }

}