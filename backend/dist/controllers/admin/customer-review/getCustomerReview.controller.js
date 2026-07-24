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
const getCustomerReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const total = yield yayinstocks_shared_module_1.CustomerReview.countDocuments();
        const review = yield yayinstocks_shared_module_1.CustomerReview.find({}).populate({
            path: "userId",
            select: "name"
        }).populate({
            path: "courseId",
            select: "title"
        }).skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }).lean();
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({
            success: true, data: review, pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error occurred in [getCustomerReviewController]: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.default = getCustomerReviewController;
