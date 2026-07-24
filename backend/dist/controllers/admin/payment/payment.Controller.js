"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const yayinstocks_shared_module_1 = require("yayinstocks_shared_module");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const paymentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, items, razorpayPaymentId, razorpayOrderId, receiptId, amount, discount, status } = req.body;
        if (!email || !items || !razorpayPaymentId || !razorpayOrderId || !receiptId || !amount || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }
        yield yayinstocks_shared_module_1.PaymentHistory.create({
            email,
            items: items.map((item) => new mongoose_1.default.Types.ObjectId(item)),
            razorpayPaymentId,
            razorpayOrderId,
            receiptId,
            amount,
            status,
            discount
        });
        yield yayinstocks_shared_module_1.PurchasedCourse.findOneAndUpdate({ email }, { $addToSet: { items: items.map((item) => new mongoose_1.default.Types.ObjectId(item)) } }, { upsert: true, new: true });
        yield yayinstocks_shared_module_1.Cart.findOneAndDelete({ email });
        const user = yield yayinstocks_shared_module_1.User.findOne({ email });
        const populatedItems = yield yayinstocks_shared_module_1.Course.find({
            _id: { $in: items.map((id) => new mongoose_1.default.Types.ObjectId(id)) }
        }).select("title price");
        const emailTemplatePath = path_1.default.join(__dirname, "../../../emails/purchase.template.ejs");
        const emailTemplate = yield ejs_1.default.renderFile(emailTemplatePath, {
            companyName: yayinstocks_shared_module_1.COMPANY_CONFIG.companyName,
            logoUrl: yayinstocks_shared_module_1.COMPANY_CONFIG.logoUrl,
            receiptId,
            userName: user === null || user === void 0 ? void 0 : user.name,
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
            supportUrl: yayinstocks_shared_module_1.COMPANY_CONFIG.supportEmail,
            websiteUrl: yayinstocks_shared_module_1.COMPANY_CONFIG.websiteUrl,
            youtubeUrl: "",
        });
        const mailOptions = {
            from: process.env.MAIL_OPTION_FROM,
            to: email,
            subject: "Purchase Confirmation 🥳 - YayInStocks ",
            html: emailTemplate
        };
        (0, yayinstocks_shared_module_1.sendMail)(mailOptions);
        res.status(201).json({
            success: true,
            message: "Course purchased successfully!"
        });
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error occurred in [paymentController]: ", error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.default = paymentController;
