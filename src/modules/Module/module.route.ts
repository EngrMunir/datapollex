import express from 'express';
import { ModuleController } from './module.controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../app/middleware/validateRequest';
import { createModuleValidation } from './module.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(createModuleValidation),
  ModuleController.createModule
);

router.get('/:courseId', ModuleController.getModulesByCourse);
router.patch('/:id', auth(USER_ROLE.admin), ModuleController.updateModule);
router.delete('/:id', auth(USER_ROLE.admin), ModuleController.deleteModule);

export const ModuleRoutes = router;