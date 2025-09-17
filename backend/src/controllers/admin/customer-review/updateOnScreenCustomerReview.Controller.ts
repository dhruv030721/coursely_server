import { Request, Response } from "express"
import { CustomerReview, logger } from "yayinstocks_shared_module"

const updateOnScreenCustomerReview = async (req: Request, res: Response) => {
    try {

        const { reviewIds } = req.body;

        if (!reviewIds || !Array.isArray(reviewIds)) {
            return res.status(400).json({ success: false, message: "Invalid reviews data" });
        }

        await CustomerReview.updateMany(
            { isOnScreen: true },
            { $set: { isOnScreen: false } }
        );

        const updatedReviews = await CustomerReview.updateMany(
            { _id: { $in: reviewIds.map((r: any) => r) } },
            { $set: { isOnScreen: true } }
        );

        res.status(200).json({ success: true, data: updatedReviews, message: "Reviews updated successfully!" });
        return;

    } catch (error) {
        logger.error("Error updating [updateOnScreenCustomerReview] : ", { error });
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
}

export default updateOnScreenCustomerReview;