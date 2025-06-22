import { Request, Response } from "express";
import { User } from "yayinstocks_shared_module";

const logoutController = async (req: Request, res: Response): Promise<void> => {
    try {
        const email = req.body.email;
        req.cookies.refreshToken = null;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'User not found!' });
            return;
        }
        await User.updateOne({ email: user.email }, { $set: { refreshToken: null } });
        res.status(200).json({ message: 'Logged out successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error!' });
        return;
    }
}

export default logoutController;