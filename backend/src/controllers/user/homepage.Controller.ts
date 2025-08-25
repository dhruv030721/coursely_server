import { Request, Response } from "express";
import { Discount, logger, User } from "yayinstocks_shared_module"

const homePageController = async (req: Request, res: Response) => {
    try {

        const userCount = await User.countDocuments({ role: 'user' });

        const discountTexts = await Discount.find({ status: "active" }).select("offerText code");

        const discounts = discountTexts.map(discount => `${discount.code} ${discount.offerText}`);

        res.status(200).json({ success: true, message: "Homepage data fetched successfully", data: { userCount, discounts } });
        return;

    } catch (error) {
        logger.error("Error in [homePageController]:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
}

export default homePageController;