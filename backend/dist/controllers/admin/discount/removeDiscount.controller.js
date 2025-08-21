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
const removeDiscount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const discountId = req.body.discountId;
        if (!(0, yayinstocks_shared_module_1.checkValidObjectId)(discountId)) {
            res.status(403).json({
                success: false,
                message: "Invalid ID!",
            });
            return;
        }
        if (!discountId) {
            res.status(403).json({
                success: false,
                message: "Discount id is not found or not valid!",
            });
            return;
        }
        const discount = yield yayinstocks_shared_module_1.Discount.findById(discountId);
        if (!discount) {
            res.status(404).json({ success: false, message: "Discount not found." });
            return;
        }
        yield discount.deleteOne();
        res.status(200).json({
            success: true,
            message: `Discount coupen ${discount.code} is deleted successfully!`,
        });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error fetching discount:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
        return;
    }
});
exports.default = removeDiscount;
