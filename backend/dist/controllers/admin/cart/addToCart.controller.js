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
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, courseId } = req.body;
        if (!email || !courseId) {
            return res.status(400).json({ success: false, message: "Missing email or courseId." });
        }
        const [user, course] = yield Promise.all([
            yayinstocks_shared_module_1.User.findOne({ email }),
            yayinstocks_shared_module_1.Course.findById(courseId),
        ]);
        if (!user)
            return res.status(404).json({ success: false, message: "User not found." });
        if (!course)
            return res.status(404).json({ success: false, message: "Course not found." });
        const courseObjectId = course._id;
        yield yayinstocks_shared_module_1.Cart.findOneAndUpdate({ email }, { $addToSet: { items: courseObjectId } }, { new: true, upsert: true });
        return res.status(200).json({
            success: true,
            message: "Course added to cart successfully.",
        });
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [addToCart]:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
exports.default = addToCart;
