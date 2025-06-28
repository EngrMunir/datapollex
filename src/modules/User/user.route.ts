import express from "express";
import { UserController } from "./user.controller";
import auth from "../../app/middleware/auth";


const router = express.Router();

router.get('/my-profile', UserController.getMyProfile);

router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
