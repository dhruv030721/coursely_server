import { Request, Response } from "express";
import { logger } from "yayinstocks_shared_module";
import { Subscribe } from "yayinstocks_shared_module";
import ejs from "ejs";
import path from "path";
import { sendMail } from "yayinstocks_shared_module";
import { COMPANY_CONFIG } from "yayinstocks_shared_module";

export const subScribeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.query;

    const emailInstance = await Subscribe.findOne({ email });

    if (emailInstance) {
      res.status(400).json({ message: "You are already subscribed" });
      return;
    }

    await Subscribe.create({ email })
      .then(async () => {
        const emailTemplate = await ejs.renderFile(
          path.join(__dirname, "../../emails/subscribe.template.ejs"),
          {
            email: email,
            companyName: COMPANY_CONFIG.companyName,
            logoUrl: COMPANY_CONFIG.logoUrl,
            websiteUrl: COMPANY_CONFIG.websiteUrl,
            supportEmail: COMPANY_CONFIG.supportEmail,
          }
        );

        const mailOptions = {
          from: process.env.MAIL_OPTION_FROM as string,
          to: email as string,
          subject: "Subscription Confirmation",
          html: emailTemplate,
        };
        sendMail(mailOptions);
        res
          .status(200)
          .json({ success: true, message: "Email subscribed successfully" });
        return;
      })
      .catch((error: any) => {
        throw error;
      });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
