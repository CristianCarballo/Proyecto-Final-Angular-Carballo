import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from '../models/course.state';
import * as fromCourses from './courses.reducer';

export const selectCoursesState = createFeatureSelector<CourseState>(
  fromCourses.coursesFeatureKey
);

export const selectLoadingCourses = createSelector(
  selectCoursesState,
  (state: CourseState) => state.loading
)

export const selectCourses = createSelector(
  selectCoursesState,
  (state: CourseState) => state.courses
)
