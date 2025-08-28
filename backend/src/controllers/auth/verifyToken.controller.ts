import { Request, Response } from "express";
import { logger, User, Cart } from "yayinstocks_shared_module";
import user from "../user";

const verifyTokenController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const cart = await Cart.findOne({ email: req.body.email });

    res.status(200).json({
      success: true,
      message: "Token verified successfully!",
      data: {
        email: req.body.email,
        cartItemCount: cart?.items.length || 0
      },
    });
    return;
  } catch (error) {
    logger.error("Error in [verifyTokenController]:", error);
    return;
  }
};

export default verifyTokenController;
