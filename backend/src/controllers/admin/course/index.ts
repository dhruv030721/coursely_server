import createCourse from "./createCourse.controller";
import { getCourse, getSingleCourse } from "./getCourse.controller";
import createSection from "./section/createSection.controller";
import publishCourse from "./publishCourse.controller";
import updateCourse from "./updateCourse.controller";
import deleteCourse from "./deleteCourse.controller";
import removeLectureController from "./section/removeLecture.controller";
import updateSectionTitleController from "./section/updateSectionTitle.controller";
import removeSectionController from "./section/removeSection.controller";
import getCourseUsersController from "./getCourseUsers.controller";

export { createCourse, getCourse, createSection, publishCourse, updateCourse, getSingleCourse, deleteCourse, removeLectureController, updateSectionTitleController, removeSectionController, getCourseUsersController };
