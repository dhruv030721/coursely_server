import { logger } from 'yayinstocks_shared_module';
import { Request, Response } from 'express';
import { User, OTP } from 'yayinstocks_shared_module';
import path from "path";
import ejs from "ejs";
import { sendMail } from 'yayinstocks_shared_module';
import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';

export const forgotPasswordController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body

        if (!email || email == "") {
            res.status(400).json({ success: false, message: 'Email is required' });
            return;
        }

        const userInstance = await User.findOne({ email });

        if (!userInstance) {
            res.status(404).json({
                success: false,
                message: "User not found!"
            })
            return;
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        const otpInstance = await OTP.findOne({ email })

        if (otpInstance) {
            await OTP.deleteOne({ email: otpInstance.email })
        }

        await OTP.create({ email, otp: otpCode })

        const templatePath = path.join(__dirname, "../../emails/otp.template.ejs")
        const emailTemplate = await ejs.renderFile(
            templatePath, {
            companyName: "YAYINSTOCKS",
            logoUrl: 'https://res.cloudinary.com/dkkawe9gq/image/upload/v1749928897/yayinstocks_bg_transperent_web_ahlhee.png',
            userName: userInstance.name,
            otpCode: otpCode,
            expiryTime: '1min',
            supportEmail: 'support@yayinstocks.in',
            websiteUrl: 'https://yayinstocks.in',
        }
        )

        const mailOptions = {
            from: "Yayinstock <support@yayinstocks.in>",
            to: email,
            subject: "Your Secure Verification Code",
            html: emailTemplate
        }

        sendMail(mailOptions).then(() => {
            res.status(200).json({
                success: true,
                message: "OTP sent successfully!"
            })
        }).catch((error) => {
            logger.error(error)
        })

    } catch (error) {
        logger.error(error)
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }

}


export const changePasswordController = async (req: Request, res: Response) => {
    try {
        const { email, password, otp } = req.body

        const cryptoPassword = CryptoJS.AES.decrypt(password, process.env.CRYPTO_SECRET as string).toString(CryptoJS.enc.Utf8);

        const otpInstance = await OTP.findOne({ email, otp: otp })

        if (!otpInstance) {
            res.status(400).json({ success: false, message: 'Invalid OTP code' });
            return;
        }

        const userInstance = await User.findOne({ email })

        if (!userInstance) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        const hashedPassword = await bcrypt.hash(cryptoPassword, 10)

        await User.updateOne({ email }, { password: hashedPassword })

        res.status(200).json({ success: true, message: 'Password changed successfully' });
        return;

    } catch (error) {
        logger.error(error)
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
    }
}