import { Request, Response } from "express";
import { logger, CustomerReview } from "yayinstocks_shared_module"

const createCustomerReviewController = async (req: Request, res: Response) => {
    try {

        const { courseId, userId, rating, message } = req.body;

        if (!courseId || !userId || !rating || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingReview = await CustomerReview.findOne({ courseId, userId });
        if (existingReview) {
            return res.status(400).json({ success: false, message: "You have already reviewed this course" });
        }

        const review = await CustomerReview.create({ courseId, userId, rating, message });
        res.status(201).json({ success: true, data: review, message: "Review created successfully!" });
        return;

    } catch (error) {
        logger.error("Error creating [createCustomerReviewController] : ", { error });
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
}

export default createCustomerReviewController;