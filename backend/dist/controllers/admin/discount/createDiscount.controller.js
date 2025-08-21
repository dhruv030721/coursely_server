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
Object.defineProperty(exports, "__esModule", { value: true });
const yayinstocks_shared_module_1 = require("yayinstocks_shared_module");
const createDiscount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, offerText, discount, status } = req.body;
        if (!code || !offerText || !discount) {
            res
                .status(400)
                .json({ success: false, message: "All fields are required." });
            return;
        }
        const existingDiscount = yield yayinstocks_shared_module_1.Discount.findOne({ code });
        if (existingDiscount) {
            res
                .status(400)
                .json({ success: false, message: "Coupon code already exists." });
            return;
        }
        const newDiscount = yield yayinstocks_shared_module_1.Discount.create({
            code,
            offerText,
            discount,
            status,
        });
        res.status(201).json({
            success: true,
            message: "Coupon added successfully.",
            data: newDiscount,
        });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error creating discount:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
        return;
    }
});
exports.default = createDiscount;
