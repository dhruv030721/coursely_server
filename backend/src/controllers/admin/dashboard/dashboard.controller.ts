import { Request, Response } from "express"
import { logger } from "yayinstocks_shared_module"

const dashboardController = async (req: Request, res: Response) => {
    try {

        //TODO: today new users
        //TODO: total users
        //TODO: last month users
        //TODO: today earning
        //TODO: total earning
        //TODO: last month earning
        //TODO: top 3 high users courses


    } catch (error) {
        logger.error("Error in [dashboard]:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export default dashboardController;