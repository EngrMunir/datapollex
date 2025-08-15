import express from 'express';
import { CourseController } from './course.controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { createCourseValidation, updateCourseSchema } from './course.validation';
import validateRequest from '../../app/middleware/validateRequest';

const router = express.Router();


router.get('/', CourseController.getAllCourses);
router.get('/:courseId', CourseController.getSingleCourse);

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(createCourseValidation),
  CourseController.createCourse
);

router.patch(
  '/:id', 
  auth(USER_ROLE.admin),
  validateRequest(updateCourseSchema), 
  CourseController.updateCourse
);
router.delete(
  '/:id', 
  auth(USER_ROLE.admin), 
  CourseController.deleteCourse
);


export const CourseRoutes = router;
