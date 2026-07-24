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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordController = exports.forgotPasswordController = void 0;
const yayinstocks_shared_module_1 = require("yayinstocks_shared_module");
const yayinstocks_shared_module_2 = require("yayinstocks_shared_module");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const yayinstocks_shared_module_3 = require("yayinstocks_shared_module");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const forgotPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email || email == "") {
            res.status(400).json({ success: false, message: 'Email is required' });
            return;
        }
        const userInstance = yield yayinstocks_shared_module_2.User.findOne({ email });
        if (!userInstance) {
            res.status(404).json({
                success: false,
                message: "User not found!"
            });
            return;
        }
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const otpInstance = yield yayinstocks_shared_module_2.OTP.findOne({ email });
        if (otpInstance) {
            yield yayinstocks_shared_module_2.OTP.deleteOne({ email: otpInstance.email });
        }
        yield yayinstocks_shared_module_2.OTP.create({ email, otp: otpCode });
        const templatePath = path_1.default.join(__dirname, "../../emails/otp.template.ejs");
        const emailTemplate = yield ejs_1.default.renderFile(templatePath, {
            companyName: "YAYINSTOCKS",
            logoUrl: 'https://res.cloudinary.com/dkkawe9gq/image/upload/v1749928897/yayinstocks_bg_transperent_web_ahlhee.png',
            userName: userInstance.name,
            otpCode: otpCode,
            expiryTime: '1min',
            supportEmail: 'support@yayinstocks.in',
            websiteUrl: 'https://yayinstocks.in',
        });
        const mailOptions = {
            from: "Yayinstock <support@yayinstocks.in>",
            to: email,
            subject: "Your Secure Verification Code",
            html: emailTemplate
        };
        (0, yayinstocks_shared_module_3.sendMail)(mailOptions).then(() => {
            res.status(200).json({
                success: true,
                message: "OTP sent successfully!"
            });
        }).catch((error) => {
            yayinstocks_shared_module_1.logger.error(error);
        });
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
});
exports.forgotPasswordController = forgotPasswordController;
const changePasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, otp } = req.body;
        const cryptoPassword = crypto_js_1.default.AES.decrypt(password, process.env.CRYPTO_SECRET).toString(crypto_js_1.default.enc.Utf8);
        const otpInstance = yield yayinstocks_shared_module_2.OTP.findOne({ email, otp: otp });
        if (!otpInstance) {
            res.status(400).json({ success: false, message: 'Invalid OTP code' });
            return;
        }
        const userInstance = yield yayinstocks_shared_module_2.User.findOne({ email });
        if (!userInstance) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(cryptoPassword, 10);
        yield yayinstocks_shared_module_2.User.updateOne({ email }, { password: hashedPassword });
        res.status(200).json({ success: true, message: 'Password changed successfully' });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
});
exports.changePasswordController = changePasswordController;
