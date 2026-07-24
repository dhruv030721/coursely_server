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
const homePageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCount = yield yayinstocks_shared_module_1.User.countDocuments({ role: 'user' });
        const discountTexts = yield yayinstocks_shared_module_1.Discount.find({ status: "active" }).select("offerText code");
        const discounts = discountTexts.map(discount => `${discount.code} ${discount.offerText}`);
        const CustomerReviews = yield yayinstocks_shared_module_1.CustomerReview.find({ isOnScreen: true }).populate({
            path: "userId",
            select: "name"
        }).populate({
            path: "courseId",
            select: "title"
        }).lean();
        res.status(200).json({ success: true, message: "Homepage data fetched successfully", data: { userCount, discounts, reviews: CustomerReviews } });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [homePageController]:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
});
exports.default = homePageController;
