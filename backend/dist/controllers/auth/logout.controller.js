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
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        req.cookies.refreshToken = null;
        const user = yield yayinstocks_shared_module_1.User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'User not found!' });
            return;
        }
        yield yayinstocks_shared_module_1.User.updateOne({ email: user.email }, { $set: { refreshToken: null } });
        res.status(200).json({ message: 'Logged out successfully!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error!' });
        return;
    }
});
exports.default = logoutController;
