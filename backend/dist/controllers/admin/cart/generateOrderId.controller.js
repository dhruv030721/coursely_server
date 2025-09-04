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
const yayinstocks_shared_module_1 = require("yayinstocks_shared_module");
const razorpay_1 = __importDefault(require("razorpay"));
const generateReceiptId = () => {
    return `receipt_${Date.now()}`;
};
const generateOrderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount } = req.body;
        if (!amount) {
            res.status(400).json({ success: false, message: "Amount is required" });
            return;
        }
        const cart = yield yayinstocks_shared_module_1.Cart.findOne({ email: req.body.email });
        if (!cart) {
            res.status(404).json({ success: false, message: "Cart not found" });
            return;
        }
        if (cart.items.length == 0) {
            res.status(400).json({ success: false, message: "Cart is empty" });
            return;
        }
        const razorpay = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const receiptId = generateReceiptId();
        const options = {
            amount: parseInt(amount.toString()) * 100,
            currency: "INR",
            receipt: receiptId,
            payment_capture: 1,
        };
        const order = yield razorpay.orders.create(options);
        res.status(200).json({
            success: true,
            message: "Order ID generated successfully",
            data: {
                orderId: order.id,
                receiptId: receiptId
            }
        });
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [generateOrderId]:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.default = generateOrderId;
