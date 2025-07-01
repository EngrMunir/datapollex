import express from 'express';
import { UserRoutes } from '../../modules/User/user.route';
import { AuthRoutes } from '../../modules/Auth/auth.route';
import { CourseRoutes } from '../../modules/Course/course.route';
import { ModuleRoutes } from '../../modules/Module/module.route';
import { LectureRoutes } from '../../modules/Lecture/lecture.route';
import { ProgressRoutes } from '../../modules/Progress/progress.route';
import { EnrollmentRoutes } from '../../modules/Enrollment/enrollment.route';

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
    },
    {
        path:'/modules',
        route:ModuleRoutes
    },
    {
        path:'/lectures',
        route:LectureRoutes
    },
    {
        path:'/progress',
        route:ProgressRoutes
    },
    {
        path: '/enrollments',
        route: EnrollmentRoutes,
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;