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
exports.contactUsController = void 0;
const yayinstocks_shared_module_1 = require("yayinstocks_shared_module");
const yayinstocks_shared_module_2 = require("yayinstocks_shared_module");
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const yayinstocks_shared_module_3 = require("yayinstocks_shared_module");
const yayinstocks_shared_module_4 = require("yayinstocks_shared_module");
const contactUsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, contact, subject, message } = req.body;
        if (!name || !email || !contact || !subject || !message) {
            res.status(400).json({ success: false, message: "All fields are required" });
            return;
        }
        const contactUsInstance = yield yayinstocks_shared_module_1.ContactUs.create({ name, email, contact, subject, message });
        if (!contactUsInstance) {
            res.status(500).json({ success: false, message: "Failed to create contact us" });
            return;
        }
        const emailTemplate = yield ejs_1.default.renderFile(path_1.default.join(__dirname, '../../emails/contactus.template.ejs'), {
            name: contactUsInstance.name,
            email: contactUsInstance.email,
            contact: contactUsInstance.contact,
            subject: contactUsInstance.subject,
            message: contactUsInstance.message,
            companyName: yayinstocks_shared_module_3.COMPANY_CONFIG.companyName,
            logoUrl: yayinstocks_shared_module_3.COMPANY_CONFIG.logoUrl,
            websiteUrl: yayinstocks_shared_module_3.COMPANY_CONFIG.websiteUrl,
            supportEmail: yayinstocks_shared_module_3.COMPANY_CONFIG.supportEmail,
        });
        const mailOptions = {
            from: process.env.MAIL_OPTION_FROM,
            to: "contact@yayinstocks.in",
            subject: "Contact Us",
            html: emailTemplate,
        };
        (0, yayinstocks_shared_module_4.sendMail)(mailOptions);
        res.status(200).json({ success: true, message: "Query submitted successfully" });
        return;
    }
    catch (error) {
        yayinstocks_shared_module_2.logger.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
});
exports.contactUsController = contactUsController;
