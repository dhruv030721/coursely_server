import { Request, Response } from 'express';
import { logger } from 'yayinstocks_shared_module/utility/logger';
import User  from 'yayinstocks_shared_module/models/user.model';

export const loginController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }   

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({
            message: 'Login successful',    
        });
        logger.info(`User ${user.email} logged in successfully`);
        return;
        
    } catch (error) {
        logger.error('Error in [login controller]:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
}