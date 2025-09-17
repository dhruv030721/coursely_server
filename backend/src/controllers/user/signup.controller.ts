import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from 'yayinstocks_shared_module';
import path from "path";
import ejs from "ejs";
import { sendMail } from 'yayinstocks_shared_module';
import { COMPANY_CONFIG } from 'yayinstocks_shared_module';
import CryptoJS from 'crypto-js';

const signupController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, age, contact } = req.body;
        if (!email || !password || !name || !age || !contact) {
            res.status(400).json({ message: 'Please fill all fields!' });
            return;
        }

        const user = await User.findOne({ email });
        if (user) {
            res.status(409).json({ success: true, message: 'User already exists' });
            return;
        }

        const cryptoPassword = CryptoJS.AES.decrypt(password, process.env.CRYPTO_SECRET as string).toString(CryptoJS.enc.Utf8);

        const hashedPassword = await bcrypt.hash(cryptoPassword, 10);

        const newUser = await User.create({
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


        const templatePath = path.join(__dirname, "../../emails/signup.template.ejs")
        const emailTemplate = await ejs.renderFile(templatePath, {
            companyName: COMPANY_CONFIG.companyName,
            userName: newUser.name || 'Trader',
            userEmail: newUser.email,
            logoUrl: COMPANY_CONFIG.logoUrl,
            successCount: '5,000',
            coursesUrl: 'https://yayinstocks.in/courses',
            mutualFundUrl: 'https://yayinstocks.in/mutual-funds',
            websiteUrl: COMPANY_CONFIG.websiteUrl,
            linkedinUrl: 'https://linkedin.com/company/yayinstocks',
        });

        const mailOptions = {
            from: process.env.MAIL_OPTION_FROM as string,
            to: email,
            subject: "📈 Welcome to YayinStocks - Where traders become winners",
            html: emailTemplate
        }

        sendMail(mailOptions)

        res.status(201).json({
            success: true,
            message: 'Signup successful',
        });
        return;

    } catch (error) {
        console.error('Error in [signup controller]:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
}

export default signupController;