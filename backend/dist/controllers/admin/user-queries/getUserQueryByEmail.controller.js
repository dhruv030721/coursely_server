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
const getUserQueryByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const userQuery = yield yayinstocks_shared_module_1.ContactUs.find({ email });
        if (!userQuery) {
            res.status(404).json({ success: false, message: "User query not found." });
            return;
        }
        res.status(200).json({ success: true, message: "User query retrieved successfully.", data: userQuery });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [getUserQueryByEmail]:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
        return;
    }
});
exports.default = getUserQueryByEmail;
