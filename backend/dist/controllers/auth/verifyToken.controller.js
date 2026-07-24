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
const verifyTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield yayinstocks_shared_module_1.Cart.findOne({ email: req.body.email });
        const user = yield yayinstocks_shared_module_1.User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Token verified successfully!",
            data: {
                _id: user._id,
                email: req.body.email,
                name: user.name,
                contact: user.contact,
                cartItemCount: (cart === null || cart === void 0 ? void 0 : cart.items.length) || 0
            },
        });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [verifyTokenController]:", error);
        return;
    }
});
exports.default = verifyTokenController;
