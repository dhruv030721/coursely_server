import { Request, Response } from "express";
import path from "path";
import { CustomerReview, logger, User } from "yayinstocks_shared_module";

const getCustomerReviewByEmailController = async (req: Request, res: Response) => {
    try {

        const { email } = req.params;
        if (!email) {
            res.status(400).json({
                success: false,
                message: "Email is required",
            });
            return;
        }

        const user = await User.findOne({ email }).select("_id");
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }

        const reviews = await CustomerReview.find({ userId: user._id })
            .populate({ path: "userId", select: "name" })
            .populate({ path: "courseId", select: "title" })
            .lean();

        if (!reviews) {
            res.status(404).json({
                success: false,
                message: "No reviews found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews,
        });
        return;
    } catch (error) {
        logger.error("Error in [getCustomerReviewByEmailController]:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
}

export default getCustomerReviewByEmailController;