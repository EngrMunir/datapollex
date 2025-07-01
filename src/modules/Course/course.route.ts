import express from 'express';
import { CourseController } from './course.controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { createCourseValidation } from './course.validation';
import validateRequest from '../../app/middleware/validateRequest';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(createCourseValidation),
  CourseController.createCourse
);

router.get('/', CourseController.getAllCourses);
router.get('/detail/:id', CourseController.getCourseDetail);
router.get('/:id', CourseController.getSingleCourse);
router.patch('/:id', auth(USER_ROLE.admin), CourseController.updateCourse);
router.delete('/:id', auth(USER_ROLE.admin), CourseController.deleteCourse);



export const CourseRoutes = router;
