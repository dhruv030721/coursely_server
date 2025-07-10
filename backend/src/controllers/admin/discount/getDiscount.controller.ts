import { Request, Response } from "express";
import { logger, Discount } from "yayinstocks_shared_module";

const getDiscount = async (req: Request, res: Response): Promise<void> => {
    try {
        const discount = await Discount.find({});

        if (!discount) {
            res.status(404).json({ success: false, message: "Discount not found." });
            return;
        }

        res.status(200).json({ success: true, data: discount });
        return;
    } catch (error) {
        logger.error("Error fetching discount:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
        return;
    }
}

export default getDiscount;