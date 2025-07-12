import { Request, Response } from "express";
import { Discount, logger } from "yayinstocks_shared_module";

const updateDiscount = async (req: Request, res: Response): Promise<void> => {
  try {
    const discountId = req.query.discountId as string | undefined;
    const discountObject = req.body.discountObject;
    if (!discountId) {
      res
        .status(400)
        .json({ success: true, message: "Discount ID is required." });
      return;
    }
    if (!discountObject) {
      res
        .status(400)
        .json({ success: true, message: "Discount object is required." });
      return;
    }
    let discountData = await Discount.findById(discountId);
    if (!discountData) {
      res.status(404).json({ success: true, message: "Discount not found." });
      return;
    }
    discountData = await Discount.findByIdAndUpdate(
      discountId,
      discountObject,
      {
        new: true,
      }
    );
    if (!discountData) {
      res.status(404).json({ success: true, message: "Discount not found." });
      return;
    }
    discountData = await Discount.findById(discountId);
    res.status(200).json({
      success: true,
      message: "Discount updated successfully.",
      discountData,
    });
    return;
  } catch (error) {
    logger.error("Error in [updateDiscount]:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export default updateDiscount;
