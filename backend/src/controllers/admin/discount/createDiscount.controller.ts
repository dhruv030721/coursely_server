import { Request, Response } from 'express';
import { logger, Discount } from 'yayinstocks_shared_module';

const createDiscount = async (req: Request, res: Response): Promise<void> => {
    try {
        const { code, offerText, startDate, endDate, discountPercentage } = req.body;

        if (!code || !offerText || !discountPercentage || !startDate || !endDate) {
            res.status(400).json({ message: "All fields are required." });
            return;
        }

        const newDiscount = await Discount.create({
            code,
            offerText,
            discountPercentage,
            startDate,
            endDate,
        });

        res.status(201).json(newDiscount);
        return;
    } catch (error) {
        logger.error("Error creating discount:", error);
        res.status(500).json({ message: "Internal server error." });
        return;
    }
}

export default createDiscount;