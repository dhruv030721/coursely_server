import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { logger, User, PurchasedCourse, CustomerReview } from "yayinstocks_shared_module"

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

        let purchasedCourses = await PurchasedCourse.findOne({ email }).populate("items").lean();

        if (!purchasedCourses || !purchasedCourses.items) {
            return res.status(404).json({ message: "No purchased courses found" });
        }

        const baseUrl =
            process.env.ENV_MODE == "QA"
                ? process.env.VIDEO_BD_URL_QA
                : process.env.ENV_MODE == "PROD"
                    ? process.env.VIDEO_BD_URL_PROD
                    : process.env.VIDEO_BD_URL_DEV;

        purchasedCourses.items = await Promise.all(purchasedCourses?.items.map(async (item: any) => {
            // item.sections.forEach((section: any) => {
            //     section.lectures.forEach((lecture: any) => {
            //         const pathName = new URL(lecture.video_url).pathname;
            //         const filePath = pathName.replace(/^\/videos\//, "");
            //         const token = jwt.sign({ filePath }, process.env.JWT_SECRET as string, { expiresIn: '5m' });
            //         lecture.video_url = `${baseUrl}/videos?token=${token}`;
            //     });
            // });
            const isReviewed = await CustomerReview.findOne({ courseId: item._id, userId: user._id });
            item.isReviewed = isReviewed ? true : false;
            return {
                ...item,
                isReviewed: item.isReviewed
            };
        }));

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