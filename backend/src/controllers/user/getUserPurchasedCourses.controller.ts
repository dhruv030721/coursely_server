import { Request, Response } from "express";
import { logger, User, PurchasedCourse } from "yayinstocks_shared_module"

const getUserPurchasedCoursesController = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const purchasedCourses = await PurchasedCourse.findOne({ email }).populate("items");

        if (!purchasedCourses) {
            return res.status(404).json({ message: "No purchased courses found" });
        }

        res.status(200).json({
            success: true,
            data: purchasedCourses
        });
        return;
    } catch (error) {
        logger.error("Error occurred in [getUserPurchasedCoursesController]: ", error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}


export default getUserPurchasedCoursesController;