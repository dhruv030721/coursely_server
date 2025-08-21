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
const getDiscounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let discountData;
        discountData = yield yayinstocks_shared_module_1.Discount.find({});
        if (!discountData || discountData.length === 0) {
            res.status(404).json({
                success: false,
                message: "No discounts found.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Discount fetched successfully.",
            data: discountData,
        });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error fetching discount:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
});
exports.default = getDiscounts;
