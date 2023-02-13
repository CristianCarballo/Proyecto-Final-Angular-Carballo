import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as coursesActions from './courses.actions';
import { CoursesService } from '../services/courses.service';


@Injectable()
export class CoursesEffects {
  
  constructor(private actions$: Actions, private coursesService: CoursesService) {
    
  }
  
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coursesActions.loadCourses),
      concatMap(() =>
        this.coursesService.getCourses().pipe(
          map((courses) => coursesActions.loadCoursesSuccess({ courses })),
          catchError((error) => of(coursesActions.loadCoursesFailure({ error })))
        )
      )
    )
  );

  deleteCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coursesActions.deleteCourse),
      concatMap((action) =>
        this.coursesService
          .deleteCourse(action.course.id)
          .pipe(map(() => coursesActions.loadCourses()))
      )
    )
  );
  
}
