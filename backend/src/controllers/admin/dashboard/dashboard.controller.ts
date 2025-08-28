import { Request, Response } from "express"
import { logger, User } from "yayinstocks_shared_module"

const dashboardController = async (req: Request, res: Response) => {
    try {

        //TODO: today earning
        //TODO: total earning
        //TODO: last month earning
        //TODO: top 3 high users courses

        const todayNewUsers = await User.countDocuments({
            createdAt: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                $lt: new Date(new Date().setHours(23, 59, 59, 999)),
            },
        });

        const totalUsers = await User.countDocuments();

        const lastMonthUsers = await User.countDocuments({
            createdAt: {
                $gte: new Date(new Date().setDate(1)),
                $lt: new Date(new Date().setDate(1)).setMonth(new Date().getMonth() + 1),
            },
        });

        res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully.",
            data: {
                userMetrics: {
                    todayNewUsers,
                    totalUsers,
                    lastMonthUsers
                }
            },
        });

    } catch (error) {
        logger.error("Error in [dashboard]:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export default dashboardController;