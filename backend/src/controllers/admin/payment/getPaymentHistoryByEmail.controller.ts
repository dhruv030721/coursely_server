import { Request, Response } from "express"
import { logger, PaymentHistory } from "yayinstocks_shared_module"

const getPaymentHistoryByEmail = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const paymentHistory = await PaymentHistory.find({ email })
            .populate("items", "title price");

        if (!paymentHistory) {
            res.status(404).json({ success: false, message: "Payment history not found." });
            return;
        }

        res.status(200).json({ success: true, message: "Payment history retrieved successfully.", data: paymentHistory });
        return;
    } catch (error) {
        logger.error("Error in [getPaymentHistoryByEmail]:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
        return;
    }
}

export default getPaymentHistoryByEmail;