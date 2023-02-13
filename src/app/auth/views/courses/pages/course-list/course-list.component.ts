import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import Swal from 'sweetalert2';
import { Session } from '../../../sessions/models/session';
import { SessionService } from '../../../sessions/services/session.service';
import { Course } from '../../models/course';
import { CourseState } from '../../models/course.state';
import { CoursesService } from '../../services/courses.service';
import { selectCourses } from '../../store/courses.selectors';
import { deleteCourse, loadCourses } from '../../store/courses.actions';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {

  courses$!: Observable<Course[]>;

  session$!: Observable<Session>;
  sessionSusbcription!: Subscription;
  session!: Session;

  constructor(
    private store: Store<CourseState>,
    private coursesService: CoursesService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.courses$ = this.store.select(selectCourses);
    this.store.dispatch(loadCourses())

    this.session$ = this.sessionService.getSessionData();
    this.sessionSusbcription = this.session$.subscribe(
      (session: Session) => (this.session = session));
  }

  editCourse(course: Course) {
    this.router.navigate(['/courses/edit', course]);
  }

  deleteCourse(course: Course) {
    this.store.dispatch(deleteCourse({ course }));
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se eliminó el curso',
      showConfirmButton: false,
      timer: 1500,
    });
    this.courses$ = this.store.select(selectCourses);
  }

  filterCourses(event: Event) {

    const value = (event.target as HTMLInputElement).value;
    this.courses$ = this.coursesService
      .getCourses()
      .pipe(
        map((c) =>
          c.filter((course) =>
            course.name
              .toLocaleLowerCase()
              .includes(value.toLocaleLowerCase())
          )));
  }

  ngOnDestroy(): void {
    this.sessionSusbcription.unsubscribe();
  }
}
