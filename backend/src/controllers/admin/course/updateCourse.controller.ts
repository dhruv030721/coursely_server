import { Request, Response } from "express";
import { logger, Course } from "yayinstocks_shared_module";

interface CourseData {
    title: string,
    description: string,
    price: number,
    thumbnail?: string,
    status: string,
    featured: boolean
}

const updateCourse = async (req: Request, res: Response) => {
    try {
        const { title, description, price } = req.body;
        const { courseId } = req.params;
        const thumbnail = req.file;

        if (!title || !description || !price) {
            res.status(400).json({ success: false, message: "All fields are required." });
            return;
        }

        const courseData: CourseData = {
            title,
            description,
            price,
            status: "draft",
            featured: false
        }

        if (thumbnail) {
            const baseUrl =
                process.env.ENV_MODE == "QA"
                    ? process.env.BD_URL_QA
                    : process.env.ENV_MODE == "PROD"
                        ? process.env.BD_URL_PROD
                        : process.env.BD_URL_DEV;

            if (!baseUrl) {
                throw new Error("Base URL for environment is not defined.");
            }

            const thumbnailUrl = new URL(
                `/images/${thumbnail.filename}`,
                baseUrl
            ).toString();
            courseData.thumbnail = thumbnailUrl
        }

        const course = await Course.updateOne({ _id: courseId }, courseData);

        if (course.modifiedCount === 0) {
            res.status(404).json({ success: false, message: "Course not found or no changes made." });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Course updated successfully.",
            data: {
                courseId: courseId,
            },
        }); 
        return;
    } catch (error) {
        logger.error("Error updating course:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
        return;
    }
};

export default updateCourse;
