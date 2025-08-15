"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../../modules/User/user.route");
const auth_route_1 = require("../../modules/Auth/auth.route");
const course_route_1 = require("../../modules/Course/course.route");
const module_route_1 = require("../../modules/Module/module.route");
const lecture_route_1 = require("../../modules/Lecture/lecture.route");
const enrollment_route_1 = require("../../modules/Enrollment/enrollment.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.UserRoutes
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes
    },
    {
        path: '/course',
        route: course_route_1.CourseRoutes
    },
    {
        path: '/modules',
        route: module_route_1.ModuleRoutes
    },
    {
        path: '/lectures',
        route: lecture_route_1.LectureRoutes
    },
    {
        path: '/enrollments',
        route: enrollment_route_1.EnrollmentRoutes,
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
