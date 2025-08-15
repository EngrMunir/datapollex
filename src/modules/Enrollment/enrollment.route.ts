// routes/enrollment.route.ts
import express from 'express';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { EnrollmentController } from './enrollment.controller';

const router = express.Router();

router.post('/', auth(USER_ROLE.user), EnrollmentController.enrollCourse);
router.get('/', auth(USER_ROLE.user), EnrollmentController.getMyEnrollments);
router.get('/enrolledCourse', auth(USER_ROLE.admin), EnrollmentController.enrolledCourse);


export const EnrollmentRoutes = router;
