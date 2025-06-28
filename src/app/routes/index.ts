import express from 'express';
import { UserRoutes } from '../../modules/User/user.route';
import { AuthRoutes } from '../../modules/Auth/auth.route';
import { CourseRoutes } from '../../modules/Course/course.route';

const router = express.Router();

const moduleRoutes =[
    {
        path:'/user',
        route: UserRoutes
    },
    {
        path:'/auth',
        route:AuthRoutes
    },
    {
        path:'/course',
        route:CourseRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;