import { Request, Response } from "express";
import { logger, CustomerReview } from "yayinstocks_shared_module"

const removeCustomerReviewController = async (req: Request, res: Response) => {
    try {
        const { reviewId } = req.params;
        
        if (!reviewId) {
            res.status(400).json({
                success: false,
                message: "Review ID is required",
            });
            return;
        }

        const review = await CustomerReview.findById(reviewId);
        if (!review) {
            res.status(404).json({
                success: false,
                message: "Review not found",
            });
            return;
        }

        await CustomerReview.findByIdAndDelete(reviewId);

        res.status(200).json({
            success: true,
            message: "Review removed successfully",
        });
        return;
    } catch (error) {
        logger.error("Error in [removeCustomerReviewController]:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
}

export default removeCustomerReviewController;