import { Request, Response } from "express"
import { logger, PaymentHistory } from "yayinstocks_shared_module"

const getPaymentHistory = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        // Fetch total count
        const total = await PaymentHistory.countDocuments();

        // Fetch paginated data
        const paymentHistory = await PaymentHistory.find({})
            .populate("items", "title price")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Payment history fetched successfully.",
            data: paymentHistory,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        logger.error("Error in [getPaymentHistory Controller]", { error })
        res.status(500).json({ error: "Internal server error" })
        return;
    }
}

export default getPaymentHistory;