import {
  Discount,
  logger,
  discountCoupenStatusEnum,
} from "yayinstocks_shared_module";
import { Request, Response } from "express";

const verifyDiscount = async (req: Request, res: Response): Promise<void> => {
  try {
    const discountId = req.query.discountId as string | undefined;
    if (!discountId) {
      res.status(400).json({
        success: true,
        message: "Discount ID is required.",
      });
      return;
    }

    const discountData = await Discount.findById(discountId);
    if (!discountData) {
      res.status(404).json({ success: true, message: "Discount not found." });
      return;
    }

    if (discountData.status === discountCoupenStatusEnum.INACTIVE) {
      res.status(400).json({ success: true, message: "Discount is inactive." });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Discount verified successfully.",
    });
    return;
  } catch (error) {
    logger.error("Error in [verifyDiscount]:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export default verifyDiscount;
