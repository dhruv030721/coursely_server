import { Request, Response } from "express";
import { logger, User, Course, Cart } from "yayinstocks_shared_module";
import { Types } from "mongoose";

const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { email, courseId } = req.body;

    if (!email || !courseId) {
      return res.status(400).json({ success: false, message: "Missing email or courseId." });
    }

    const [user, course] = await Promise.all([
      User.findOne({ email }),
      Course.findById(courseId),
    ]);

    if (!user) return res.status(404).json({ success: false, message: "User not found." });
    if (!course) return res.status(404).json({ success: false, message: "Course not found." });

    const courseObjectId = course._id as Types.ObjectId;

    // Check if course exists in cart
    const cart = await Cart.findOne({
      email,
      items: courseObjectId, // since items is an array of ObjectIds
    });

    if (!cart) {
      return res.status(400).json({ success: false, message: "Course not found in cart." });
    }

    // Remove the courseId from items array
    await Cart.updateOne(
      { email },
      { $pull: { items: courseObjectId } }
    );

    return res.status(200).json({
      success: true,
      message: "Course removed from cart successfully.",
    });
  } catch (error) {
    logger.error("Error in [removeFromCart]:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export default removeFromCart;
