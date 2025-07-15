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
const verifyDiscount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const discountId = req.query.discountId;
        if (!discountId) {
            res.status(400).json({
                success: true,
                message: "Discount ID is required.",
            });
            return;
        }
        const discountData = yield yayinstocks_shared_module_1.Discount.findById(discountId);
        if (!discountData) {
            res.status(404).json({ success: true, message: "Discount not found." });
            return;
        }
        if (discountData.status === yayinstocks_shared_module_1.discountCoupenStatusEnum.INACTIVE) {
            res.status(400).json({ success: true, message: "Discount is inactive." });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Discount verified successfully.",
        });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [verifyDiscount]:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});
exports.default = verifyDiscount;
