import { Request, Response } from "express";
import { logger, User } from "yayinstocks_shared_module"

const homeConfiguration = async (req: Request, res: Response) => {
    try {

        const userCount = await User.countDocuments({});

        

    } catch (error) {
        logger.error("Error in [homeConfiguration]:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
        return;
    }
}

export default homeConfiguration;