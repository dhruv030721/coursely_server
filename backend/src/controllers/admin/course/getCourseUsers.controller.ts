import { Request, Response } from "express";
import { Course, PurchasedCourse, logger } from "yayinstocks_shared_module";

const getCourseUsersController = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;

        if (!courseId) {
            res.status(403).json({ success: false, message: "courseId is not found!" });
            return;
        }

        const courseUsers = await PurchasedCourse.find({ items: courseId }).select("email createdAt");

        res.status(200).json({ success: true, data: courseUsers });
        return;
    } catch (error) {
        logger.error("Error in [getCourseUsersController]:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
}

export default getCourseUsersController;