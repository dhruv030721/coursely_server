import { Request, Response } from "express";
import { logger, Course } from "yayinstocks_shared_module";

const updateSectionTitleController = async (req: Request, res: Response) => {

    try {

        const { courseId, sectionId, title } = req.body;

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

        section.title = title;
        await course.save();

        res.status(200).json({ success: true, message: "Section title updated successfully" });
        return;

    } catch (error) {
        logger.error("Error in [updateSectionNameController]:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }


}

export default updateSectionTitleController;