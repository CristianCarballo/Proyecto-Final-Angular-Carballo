import { createAction, props } from '@ngrx/store';
import { Course } from '../../courses/models/course';

// CARGAR Courses
export const loadCourses = createAction(
  '[Courses] Load Courses'
);

// CARGAR Courses EXISTOSO
export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: Course[] }>()
);

// CARGAR Courses ERROR
export const loadCoursesFailure = createAction(
  '[Courses] Load Courses Failure',
  props<{ error: any }>()
);

// CREAR CURSO
export const addCourse = createAction(
  '[Course] Create Course',
  props<{ course: Course }>()
);

// CREAR CURSO EXISTOSO
export const addCourseSuccess = createAction(
  '[Course] Create Course Success',
  props<{ curso: Course }>()
)

// CREAR CURSO FALLO
export const addCourseFailure = createAction(
  '[Course] Create Course Failure',
  props<{ error: any }>()
)

// EDITAR CURSO 
export const editCourse = createAction(
  '[Course] Edit Course',
  props<{ course: Course }>()
);

// ELIMINAR CURSO EXISTOSO
export const deleteCourse = createAction(
  '[Course] Delete Course',
  props<{ course: Course }>()
)

export const resetCourseState = createAction('[Course] Reset Course State')