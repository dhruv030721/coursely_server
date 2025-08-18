import { Request, Response } from "express";
import {
  logger,
  Discount,
  checkValidObjectId,
} from "yayinstocks_shared_module";

const removeDiscount = async (req: Request, res: Response): Promise<void> => {
  try {
    const discountId = req.body.discountId;

    if (!checkValidObjectId(discountId)) {
      res.status(403).json({
        success: false,
        message: "Invalid ID!",
      });
      return;
    }

    if (!discountId) {
      res.status(403).json({
        success: false,
        message: "Discount id is not found or not valid!",
      });
      return;
    }

    const discount = await Discount.findById(discountId);

    if (!discount) {
      res.status(404).json({ success: false, message: "Discount not found." });
      return;
    }

    await discount.deleteOne();

    res.status(200).json({
      success: true,
      message: `Discount coupen ${discount.code} is deleted successfully!`,
    });
    return;
  } catch (error) {
    logger.error("Error fetching discount:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
    return;
  }
};

export default removeDiscount;
