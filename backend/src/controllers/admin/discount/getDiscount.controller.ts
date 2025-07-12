import { Request, Response } from "express";
import { logger, Discount } from "yayinstocks_shared_module";

const getDiscount = async (req: Request, res: Response): Promise<void> => {
  try {
    const discountId = req.query.discountId as string | undefined;

    let discountData;
    if (discountId) {
      discountData = await Discount.findById(discountId);
      if (!discountData) {
        res.status(404).json({
          success: true,
          message: "Discount not found.",
        });
        return;
      }
    } else {
      discountData = await Discount.find({});
      if (!discountData || discountData.length === 0) {
        res.status(404).json({
          success: true,
          message: "No discounts available.",
        });
        return;
      }
    }

    res.status(200).json({
      success: true,
      data: discountData,
    });
  } catch (error) {
    logger.error("Error fetching discount:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default getDiscount;
