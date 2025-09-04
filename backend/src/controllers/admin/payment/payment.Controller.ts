import e, { Request, Response } from "express"
import mongoose from "mongoose";
import { logger, PaymentHistory, PurchasedCourse, Cart, COMPANY_CONFIG, User, Course, sendMail } from "yayinstocks_shared_module"
import path from "path"
import ejs from "ejs"

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

        const user = await User.findOne({ email });

        const populatedItems = await Course.find({
            _id: { $in: items.map((id: string) => new mongoose.Types.ObjectId(id)) }
        }).select("title price");

        const emailTemplatePath = path.join(__dirname, "../../../emails/purchase.template.ejs")
        const emailTemplate = await ejs.renderFile(emailTemplatePath, {
            companyName: COMPANY_CONFIG.companyName,
            logoUrl: COMPANY_CONFIG.logoUrl,
            receiptId,
            userName: user?.name,
            cartItems: populatedItems.map(item => ({
                name: item.title,
                price: item.price
            })),
            discount,
            totalAmount: amount,
            razorpayPaymentId,
            razorpayOrderId,
            purchaseDate: new Date().toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            accountUrl: "",
            supportUrl: "",
            websiteUrl: "",
            linkedinUrl: "",
            youtubeUrl: "",
            telegramUrl: "",
            invoiceUrl: "",
            privacyUrl: ""
        });

        const mailOptions = {
            from: process.env.MAIL_OPTION_FROM as string,
            to: email,
            subject: "Purchase Confirmation 🥳 - YayInStocks ",
            html: emailTemplate
        }

        sendMail(mailOptions)

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