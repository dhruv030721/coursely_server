import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { logger } from "yayinstocks_shared_module";

const verifyTokenController = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ success: true, message: 'Token verified successfully!', data: { email: req.body.email }});
        return;
    } catch (error) {
        logger.error('Error in [verifyTokenController]:', error);
        return;
    }
}

export default verifyTokenController;