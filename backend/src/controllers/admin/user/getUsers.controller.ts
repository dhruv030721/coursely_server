import { Request, Response } from "express";
import { logger, User } from "yayinstocks_shared_module";

const getUsersController = async (req: Request, res: Response): Promise<void> => {
    try {
        // ✅ pagination params from query
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        // ✅ total user count
        const total = await User.countDocuments();

        // ✅ fetch paginated users
        const users = await User.find({})
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // optional: latest first
            
        if (!users || users.length === 0) {
            res.status(404).json({
                success: false,
                message: "No users found",
            });
            return;
        }


        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: users,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
        return;
    } catch (error) {
        logger.error("Error in [getUsersController]:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
};

export default getUsersController;
