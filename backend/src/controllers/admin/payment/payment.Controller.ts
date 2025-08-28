import { Request, Response } from "express"
import mongoose from "mongoose";
import { logger, PaymentHistory, PurchasedCourse, Cart } from "yayinstocks_shared_module"

const paymentController = async (req: Request, res: Response) => {
    try {

        const { email, items, razorpayPaymentId, razorpayOrderId, receiptId, amount, discount, status } = req.body;

        if (!email || !items || !razorpayPaymentId || !razorpayOrderId || !receiptId || !amount || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        await PaymentHistory.create({
            email,
            items: items.map((item: string) => new mongoose.Types.ObjectId(item)),
            razorpayPaymentId,
            razorpayOrderId,
            receiptId,
            amount,
            status,
            discount
        });
        
        await PurchasedCourse.findOneAndUpdate(
            { email },
            { $addToSet: { items: items.map((item: string) => new mongoose.Types.ObjectId(item)) } },
            { upsert: true, new: true }
        );

        await Cart.findOneAndDelete({ email });

        res.status(201).json({
            success: true,
            message: "Course purchased successfully!"
        });
    } catch (error) {
        logger.error("Error occurred in [paymentController]: ", error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}


export default paymentController