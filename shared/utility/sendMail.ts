import transporter from '../config/mailTransporter';
import dotenv from "dotenv"
import { logger } from './logger';

dotenv.config()

export interface SendMailOptions {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export async function sendMail(options: SendMailOptions): Promise<void> {
    const mailOptions = {
        from: options.from,
        to: options.to,
        subject: options.subject,
        html: options.html,
    };
      
    
    await transporter.sendMail(mailOptions).then(() => {logger.info(`Email successfully sent to: ${mailOptions.to} ✅`)});
}