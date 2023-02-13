import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses.service'

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit, OnDestroy {

  course$!: Observable<Course>;
  courseSubscription!: Subscription;
  course!: Course;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parametros) => {
      let id = parseInt(parametros.get('id') || '0');
      this.course$ = this.coursesService.getCourse(id)
    });
    this.courseSubscription = this.course$.subscribe(
      (course: Course) => (this.course = course)
    );
  }
  ngOnDestroy(): void {
    this.courseSubscription.unsubscribe();
  }
}
