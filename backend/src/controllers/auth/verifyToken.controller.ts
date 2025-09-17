import { Request, Response } from "express";
import { logger, User, Cart } from "yayinstocks_shared_module";
import user from "../user";

const verifyTokenController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const cart = await Cart.findOne({ email: req.body.email });
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Token verified successfully!",
      data: {
        _id: user._id,
        email: req.body.email,
        name: user.name,
        contact: user.contact,
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