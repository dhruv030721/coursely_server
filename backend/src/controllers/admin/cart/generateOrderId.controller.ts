import { logger, Cart } from "yayinstocks_shared_module";
import { Request, Response } from "express"
import Razorpay from "razorpay";

const generateReceiptId = () => {
    return `receipt_${Date.now()}`;
}

const generateOrderId = async (req: Request, res: Response) => {
    try {

        const { amount } = req.body;

        if (!amount) {
            res.status(400).json({ success: false, message: "Amount is required" });
            return;
        }

        const cart = await Cart.findOne({ email: req.body.email });
        if (!cart) {
            res.status(404).json({ success: false, message: "Cart not found" });
            return;
        }
        if (cart.items.length == 0) {
            res.status(400).json({ success: false, message: "Cart is empty" });
            return;
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const receiptId = generateReceiptId();

        const options = {
            amount: parseInt(amount.toString()) * 100,
            currency: "INR",
            receipt: receiptId,
            payment_capture: 1,
        }

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            message: "Order ID generated successfully",
            data: {
                orderId: order.id,
                receiptId: receiptId
            }
        });
    } catch (error) {
        logger.error("Error in [generateOrderId]:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export default generateOrderId;