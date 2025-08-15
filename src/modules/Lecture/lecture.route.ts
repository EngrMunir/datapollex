import express from 'express';
import { LectureController } from './lecture.controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../app/middleware/validateRequest';
import { createLectureValidation } from './lecture.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(createLectureValidation),
  LectureController.createLecture
);
router.get('/', auth(USER_ROLE.admin), LectureController.getLectures);
router.get('/:moduleId', LectureController.getLecturesByModule);
router.patch('/:id', auth(USER_ROLE.admin), LectureController.updateLecture);
router.delete('/:id', auth(USER_ROLE.admin), LectureController.deleteLecture);

export const LectureRoutes = router;
