import { Request, Response } from "express";
import { ContactUs } from "yayinstocks_shared_module";
import { logger } from "yayinstocks_shared_module";
import ejs from "ejs";
import path from "path";
import { COMPANY_CONFIG } from 'yayinstocks_shared_module';
import { sendMail } from 'yayinstocks_shared_module';

export const contactUsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, contact, subject, message } = req.body;

        if (!name || !email || !contact || !subject || !message) {
            res.status(400).json({ success: false, message: "All fields are required" });
            return;
        }
 
        const contactUsInstance = await ContactUs.create({ name, email, contact, subject, message });

        if (!contactUsInstance) {
            res.status(500).json({ success: false, message: "Failed to create contact us" });
            return;
        }

        const emailTemplate = await ejs.renderFile(path.join(__dirname, '../../emails/contactus.template.ejs'), {
            name: contactUsInstance.name,
            email: contactUsInstance.email,
            contact: contactUsInstance.contact,
            subject: contactUsInstance.subject, 
            message: contactUsInstance.message,
            companyName: COMPANY_CONFIG.companyName,
            logoUrl: COMPANY_CONFIG.logoUrl,
            websiteUrl: COMPANY_CONFIG.websiteUrl,
            supportEmail: COMPANY_CONFIG.supportEmail,
        });

        const mailOptions = {
            from: process.env.MAIL_OPTION_FROM as string,
            to: "contact@yayinstocks.in",
            subject: "Contact Us",
            html: emailTemplate,
        };
        sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Query submitted successfully" });
        return;
    } catch (error) {
        logger.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
}
