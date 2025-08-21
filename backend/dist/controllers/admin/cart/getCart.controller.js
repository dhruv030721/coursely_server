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
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        if (req.body.userObject.email != email) {
            res.status(403).json({
                success: false,
                message: "Unauthorized access!"
            });
            return;
        }
        if (!email) {
            res.status(400).json({
                success: false,
                message: "Validation Error!"
            });
            return;
        }
        const user = yield yayinstocks_shared_module_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found!"
            });
            return;
        }
        const cartData = yield yayinstocks_shared_module_1.Cart.findOne({ email }).populate({ path: "items", select: "title price" });
        if (!cartData) {
            res.status(404).json({
                success: false,
                message: "Cart data not found!"
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Cart data fetched successfully!",
            data: cartData
        });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [getCart]:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});
exports.default = getCart;
