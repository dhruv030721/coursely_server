import { Request, Response } from "express";
import { logger, Discount } from "yayinstocks_shared_module";

const createDiscount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, offerText, discount, status } = req.body;

    if (!code || !offerText || !discount) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required." });
      return;
    }

    const existingDiscount = await Discount.findOne({ code });

    if (existingDiscount) {
      res
        .status(400)
        .json({ success: false, message: "Coupon code already exists." });
      return;
    }

    const newDiscount = await Discount.create({
      code,
      offerText,
      discount,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Coupon added successfully.",
      data: newDiscount,
    });
    return;
  } catch (error) {
    logger.error("Error creating discount:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
    return;
  }
};

export default createDiscount;
