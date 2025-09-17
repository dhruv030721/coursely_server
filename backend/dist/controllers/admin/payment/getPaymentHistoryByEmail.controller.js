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
const getPaymentHistoryByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const paymentHistory = yield yayinstocks_shared_module_1.PaymentHistory.find({ email })
            .populate("items", "title price");
        if (!paymentHistory) {
            res.status(404).json({ success: false, message: "Payment history not found." });
            return;
        }
        res.status(200).json({ success: true, message: "Payment history retrieved successfully.", data: paymentHistory });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [getPaymentHistoryByEmail]:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
        return;
    }
});
exports.default = getPaymentHistoryByEmail;
