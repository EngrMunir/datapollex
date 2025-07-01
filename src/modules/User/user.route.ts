import { Router } from "express";
import auth from "../../app/middleware/auth";
import { USER_ROLE } from "./user.constant";
import { UserController } from "./user.controller";


const router = Router();

// router.get(
//   '/me',
//   auth(USER_ROLE.admin, USER_ROLE.user),
//   UserController.getMyProfile
// );
router.get('/', auth(USER_ROLE.admin), UserController.getAllUsers);
router.patch('/:id/role', auth(USER_ROLE.admin), UserController.updateUserRole);
router.delete('/:id', auth(USER_ROLE.admin), UserController.deleteUser);


export const UserRoutes = router;
