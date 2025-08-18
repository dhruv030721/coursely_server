import { Request, Response } from "express";
import { logger, User, Course, Cart } from "yayinstocks_shared_module";
import { Types } from "mongoose";

const addToCart = async (req: Request, res: Response) => {
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

        await Cart.findOneAndUpdate(
            { email },
            { $addToSet: { items: courseObjectId } },
            { new: true, upsert: true }
        );

        return res.status(200).json({
            success: true,
            message: "Course added to cart successfully.",
        });

    } catch (error) {
        logger.error("Error in [addToCart]:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export default addToCart;
