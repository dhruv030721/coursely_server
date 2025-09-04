import { Request, Response } from "express";
import { logger, Course } from "yayinstocks_shared_module";

const removeLectureController = async (req: Request, res: Response) => {

    try {
        const { courseId, sectionId, lectureId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            res.status(404).json({ success: false, message: "Course not found" });
            return;
        }

        const section = course.sections.find(sec => sec._id ? sec._id.toString() === sectionId : false);
        if (!section) {
            res.status(404).json({ success: false, message: "Section not found" });
            return;
        }

        const lecture = section.lectures.find(lec => lec._id ? lec._id.toString() === lectureId : false);
        if (!lecture) {
            res.status(404).json({ success: false, message: "Lecture not found" });
            return;
        }

        section.lectures = section.lectures.filter(lec => lec._id ? lec._id.toString() !== lectureId : true);
        await course.save();

        res.status(200).json({ success: true, message: "Lecture removed successfully" });
        return;

    } catch (error) {
        logger.error("Error in [removeLectureController]:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }

}

export default removeLectureController;