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
const createCustomerReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, userId, rating, message } = req.body;
        if (!courseId || !userId || !rating || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const existingReview = yield yayinstocks_shared_module_1.CustomerReview.findOne({ courseId, userId });
        if (existingReview) {
            return res.status(400).json({ success: false, message: "You have already reviewed this course" });
        }
        const review = yield yayinstocks_shared_module_1.CustomerReview.create({ courseId, userId, rating, message });
        res.status(201).json({ success: true, data: review, message: "Review created successfully!" });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error creating [createCustomerReviewController] : ", { error });
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
});
exports.default = createCustomerReviewController;
