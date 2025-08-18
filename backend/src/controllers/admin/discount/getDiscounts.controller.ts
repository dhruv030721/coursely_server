import { Request, Response } from "express";
import { logger, Discount } from "yayinstocks_shared_module";

const getDiscounts = async (req: Request, res: Response): Promise<void> => {
    try {
        let discountData: any;
        discountData = await Discount.find({});
        if (!discountData || discountData.length === 0) {
            res.status(404).json({
                success: false,
                message: "No discounts found.",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Discount fetched successfully.",
            data: discountData,
        });
        return;
    } catch (error) {
        logger.error("Error fetching discount:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export default getDiscounts;
