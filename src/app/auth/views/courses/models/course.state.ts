import { Course } from "./course";

export interface CourseState{
    loading: boolean,
    courses: Course[]
}