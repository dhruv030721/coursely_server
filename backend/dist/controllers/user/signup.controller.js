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
const bcrypt_1 = __importDefault(require("bcrypt"));
const yayinstocks_shared_module_1 = require("yayinstocks_shared_module");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const yayinstocks_shared_module_2 = require("yayinstocks_shared_module");
const yayinstocks_shared_module_3 = require("yayinstocks_shared_module");
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, age, contact } = req.body;
        if (!email || !password || !name || !age || !contact) {
            res.status(400).json({ message: 'Please fill all fields!' });
            return;
        }
        const user = yield yayinstocks_shared_module_1.User.findOne({ email });
        if (user) {
            res.status(409).json({ success: true, message: 'User already exists' });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield yayinstocks_shared_module_1.User.create({
            name,
            email,
            password: hashedPassword,
            age,
            contact,
        });
        if (!newUser) {
            res.status(500).json({ message: 'Failed to create user' });
            return;
        }
        const templatePath = path_1.default.join(__dirname, "../../emails/signup.template.ejs");
        const emailTemplate = yield ejs_1.default.renderFile(templatePath, {
            companyName: yayinstocks_shared_module_3.COMPANY_CONFIG.companyName,
            userName: newUser.name || 'Trader',
            userEmail: newUser.email,
            logoUrl: yayinstocks_shared_module_3.COMPANY_CONFIG.logoUrl,
            successCount: '5,000',
            coursesUrl: 'https://yayinstocks.in/courses',
            mutualFundUrl: 'https://yayinstocks.in/mutual-funds',
            websiteUrl: yayinstocks_shared_module_3.COMPANY_CONFIG.websiteUrl,
            linkedinUrl: 'https://linkedin.com/company/yayinstocks',
            youtubeUrl: 'https://youtube.com/@yayinstocks',
            telegramUrl: 'https://t.me/yayinstocks',
            unsubscribeUrl: 'https://yayinstocks.in/unsubscribe',
            privacyUrl: 'https://yayinstocks.in/privacy-policy'
        });
        const mailOptions = {
            from: process.env.MAIL_OPTION_FROM,
            to: email,
            subject: "📈 Welcome to YayinStocks - Where traders become winners",
            html: emailTemplate
        };
        (0, yayinstocks_shared_module_2.sendMail)(mailOptions);
        res.status(201).json({
            success: true,
            message: 'Signup successful',
        });
        return;
    }
    catch (error) {
        console.error('Error in [signup controller]:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
});
exports.default = signupController;
