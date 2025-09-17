import { Request, Response } from "express";
import { Discount, logger, User, CustomerReview } from "yayinstocks_shared_module"

const homePageController = async (req: Request, res: Response) => {
    try {

        const userCount = await User.countDocuments({ role: 'user' });

        const discountTexts = await Discount.find({ status: "active" }).select("offerText code");

        const discounts = discountTexts.map(discount => `${discount.code} ${discount.offerText}`);

        const CustomerReviews = await CustomerReview.find({ isOnScreen: true }).populate({
            path: "userId",
            select: "name"
        }).populate({
            path: "courseId",
            select: "title"
        }).lean();

        res.status(200).json({ success: true, message: "Homepage data fetched successfully", data: { userCount, discounts, reviews: CustomerReviews } });
        return;

    } catch (error) {
        logger.error("Error in [homePageController]:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
}

export default homePageController;