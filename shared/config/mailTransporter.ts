import nodemailer from 'nodemailer';
import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.hostinger.com",
    port: Number(process.env.MAIL_PORT) || 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER || "support@yayinstocks.in",
        pass: process.env.MAIL_PASS || "Yayinstocks@21",
    }
});

export default transporter;