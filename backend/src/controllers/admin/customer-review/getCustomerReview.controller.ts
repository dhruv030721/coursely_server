import { Request, Response } from "express";
import { logger, CustomerReview } from "yayinstocks_shared_module"

const getCustomerReviewController = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const total = await CustomerReview.countDocuments();

        const review = await CustomerReview.find({}).populate({
            path: "userId",
            select: "name"
        }).populate({
            path: "courseId",
            select: "title"
        }).skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }).lean();

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({
            success: true, data: review, pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        logger.error("Error occurred in [getCustomerReviewController]: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default getCustomerReviewController;