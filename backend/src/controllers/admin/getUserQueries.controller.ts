import { Request, Response } from "express";
import { ContactUs, logger } from "yayinstocks_shared_module";

const getUserQueries = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        // Fetch total count
        const total = await ContactUs.countDocuments();

        // Fetch paginated data
        const queries = await ContactUs.find({})
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // optional: sort latest first

        res.status(200).json({
            success: true,
            message: "User queries fetched successfully.",
            data: queries,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        logger.error("Error fetching user queries:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export default getUserQueries;
