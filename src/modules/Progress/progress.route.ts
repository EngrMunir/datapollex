import express from 'express';
import auth from '../../app/middleware/auth';
import { ProgressController } from './progress.controller';

const router = express.Router();

router.post('/complete', auth(), ProgressController.markLectureComplete);
router.post('/list', auth(), ProgressController.getCompletedLectures);

export const ProgressRoutes = router;
