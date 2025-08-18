import { Request, Response } from "express";
import { logger, Discount } from "yayinstocks_shared_module";

const getDiscount = async (req: Request, res: Response): Promise<void> => {
  try {
    const discountCode = req.query.discountCode as string | undefined;

    let discountData: any;
    if (discountCode !== undefined) {
      discountData = await Discount.findOne({ code: discountCode });
      if (!discountData) {
        res.status(404).json({
          success: false,
          message: "Discount not found.",
        });
        return;
      }

      if (discountData.status == "inactive") {
        res.status(400).json({
          success: false,
          message: "Discount is inactive."
        })
        return;
      }
    } else {
      discountData = await Discount.find({});
      if (!discountData || discountData.length === 0) {
        res.status(404).json({
          success: false,
          message: "No discounts available.",
        });
        return;
      }
    }

    res.status(200).json({
      success: true,
      message: "Discount fetched successfully.",
      data: discountData,
    });
  } catch (error) {
    logger.error("Error in [getDiscount]:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default getDiscount;
