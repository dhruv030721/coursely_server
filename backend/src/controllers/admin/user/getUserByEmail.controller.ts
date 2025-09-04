import { Request, Response } from "express";
import { logger, User } from "yayinstocks_shared_module";


const getUserByEmail = async (req: Request, res: Response) => {
    try {

        const { email } = req.params;

        const user = await User.findOne({ email }, { name: 1, email: 1, contact: 1, createdAt: 1 });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully.",
            data: user,
        });

    } catch (error) {
        logger.error("Error in [getUserByEmail]:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
        return;
    }

}

export default getUserByEmail;