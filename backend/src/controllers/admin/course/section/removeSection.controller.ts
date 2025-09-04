import { Request, Response } from "express";
import { logger, Course } from "yayinstocks_shared_module";

const removeSectionController = async (req: Request, res: Response) => {

    try {
        const { courseId, sectionId } = req.body;

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

        course.sections = course.sections.filter(sec => sec._id ? sec._id.toString() !== sectionId : true);
        await course.save();

        res.status(200).json({ success: true, message: "Section removed successfully" });
        return;

    } catch (error) {
        logger.error("Error in [removeSectionController]:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }

}

export default removeSectionController;