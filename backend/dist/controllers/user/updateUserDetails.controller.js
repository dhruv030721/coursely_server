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
const updateUserDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, age, contact } = req.body;
        if (!email || !name || !contact) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const user = yield yayinstocks_shared_module_1.User.findOne({ email }).select("name age contact email");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        user.name = name;
        user.age = age;
        user.contact = contact;
        yield user.save();
        res.status(200).json({ message: "User details updated successfully", user });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error("Error in [updateUserDetailsController]: ", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.default = updateUserDetailsController;
