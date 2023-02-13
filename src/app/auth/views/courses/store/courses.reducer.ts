import { createReducer, on } from '@ngrx/store';
import { CourseState } from '../models/course.state';
import * as CoursesActions from './courses.actions';


export const coursesFeatureKey = 'courses';

export const initialState: CourseState = {
  loading: false,
  courses: []
};

export const reducer = createReducer(
  initialState,

  on(CoursesActions.loadCourses, (state) => {
    return {...state, loading: true};
  }),
  on(CoursesActions.loadCoursesSuccess, (state, {courses}) => {
    return {...state, loading: false, courses}
  }),
  on(CoursesActions.loadCoursesFailure, (state, {error}) => {
    return state
  }),
  on(CoursesActions.addCourse, (state, {course}) => {
    return state
  }),
  on(CoursesActions.editCourse, (state, {course}) => {
    return state
  }),
  on(CoursesActions.deleteCourse, (state, {course}) => {
    return state
  }),
  on(CoursesActions.resetCourseState, () => initialState)

);
