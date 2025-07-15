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
exports.subScribeController = void 0;
const yayinstocks_shared_module_1 = require("yayinstocks_shared_module");
const yayinstocks_shared_module_2 = require("yayinstocks_shared_module");
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const yayinstocks_shared_module_3 = require("yayinstocks_shared_module");
const yayinstocks_shared_module_4 = require("yayinstocks_shared_module");
const subScribeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const emailInstance = yield yayinstocks_shared_module_2.Subscribe.findOne({ email });
        if (emailInstance) {
            res.status(400).json({ message: "You are already subscribed" });
            return;
        }
        yield yayinstocks_shared_module_2.Subscribe.create({ email })
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            const emailTemplate = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../../emails/subscribe.template.ejs"), {
                email: email,
                companyName: yayinstocks_shared_module_4.COMPANY_CONFIG.companyName,
                logoUrl: yayinstocks_shared_module_4.COMPANY_CONFIG.logoUrl,
                websiteUrl: yayinstocks_shared_module_4.COMPANY_CONFIG.websiteUrl,
                supportEmail: yayinstocks_shared_module_4.COMPANY_CONFIG.supportEmail,
            });
            const mailOptions = {
                from: process.env.MAIL_OPTION_FROM,
                to: email,
                subject: "Subscription Confirmation",
                html: emailTemplate,
            };
            (0, yayinstocks_shared_module_3.sendMail)(mailOptions);
            res
                .status(200)
                .json({ success: true, message: "Email subscribed successfully" });
            return;
        }))
            .catch((error) => {
            throw error;
        });
    }
    catch (error) {
        yayinstocks_shared_module_1.logger.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.subScribeController = subScribeController;
