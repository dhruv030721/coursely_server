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
const getCustomerReviewByEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        if (!email) {
            res.status(400).json({
                success: false,
                message: "Email is required",
            });
            return;
        }
        const user = yield yayinstocks_shared_module_1.User.findOne({ email }).select("_id");
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        const reviews = yield yayinstocks_shared_module_1.CustomerReview.find({ userId: user._id })
            .populate({ path: "userId", select: "name" })
            .populate({ path: "courseId", select: "title" })
            .lean();
        if (!reviews) {
            res.status(404).json({
                success: false,
                message: "No reviews found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews,
        });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [getCustomerReviewByEmailController]:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
});
exports.default = getCustomerReviewByEmailController;
