import { Request, Response } from "express"
import { checkValidObjectId, Course, logger } from "yayinstocks_shared_module"

const deleteCourse = async (req: Request, res: Response) => {
    try {

        const { courseId } = req.body;

        if (!checkValidObjectId(courseId)) {
            res.status(400).json({
                success: false,
                message: "Invalid course id!"
            })
            return;
        }

        const course = await Course.findById(courseId)

        if (!course) {
            res.status(404).json({
                success: false,
                message: "Course not found!"
            })
            return;
        }

        await Course.findByIdAndDelete(courseId)

        res.status(200).json({
            success: true,
            message: "Course deleted successfully!"
        })

        return;

    } catch (error) {
        logger.error("Error updating course:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
        return;
    }
}

export default deleteCourse;