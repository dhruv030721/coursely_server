import { Request, Response } from "express";
import { logger, User } from "yayinstocks_shared_module";

const getUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.params;
        if (!email) {
            res.status(400).json({ success: false, message: 'Email is required' });
            return;
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'User fetched successfully!', data: user });
        return;
    } catch (error) {
        logger.error('Error in [getUserController]:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
}

export default getUserController;