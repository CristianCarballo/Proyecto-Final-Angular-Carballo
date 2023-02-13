import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { InscriptionsService } from '../../services/inscriptions.service';
import { CoursesService } from '../../../courses/services/courses.service';
import { StudentService } from '../../../students/services/students.service';
import { Student } from '../../../students/model/student';
import { Course } from '../../../courses/models/course';
import { Inscription } from '../../models/inscription';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})

export class InscriptionFormComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private studentService: StudentService,
    private inscriptionsService: InscriptionsService
  ) { }

  form!: FormGroup;

  student!: Student;
  students!: Student[];
  studentSubscription!: Subscription;
  student$!: Observable<Student[]>;

  courses!: Course[];
  courseSubscription!: Subscription;
  course$!: Observable<Course[]>;

  getStudentsList() {
    this.student$ = this.studentService.getStudent();
    this.studentSubscription = this.student$.subscribe(
      (students: Student[]) => (this.students = students)
    );
  }

  getCoursesList() {
    this.course$ = this.coursesService.getCourses();
    this.courseSubscription = this.course$.subscribe(
      (course: Course[]) => (this.courses = course)
    );
  }

  ngOnInit(): void {
    this.getStudentsList();
    this.getCoursesList();
    this.form = new FormGroup({
        code: new FormControl('', [Validators.required]),
        student: new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required])
      }),
        date: new FormControl('', [Validators.required]),
        course: new FormGroup({
        nameCourse: new FormControl('', [Validators.required]),
      }),
    });
  }

  addInscription() {
    let idStudent: number = Math.max.apply(null, this.students.map(o => o.id));

    let incription: Inscription = {
      id: idStudent + 1,
      code: this.form.value.code,
      student: this.form.value.student,
      date: this.form.value.date,
      course: this.form.value.course,
    }

    this.inscriptionsService.addInscriptions(incription).subscribe(() => this.router.navigate(['/inscriptions']));
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'El alumno se inscribió correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  ngOnDestroy() {
    this.studentSubscription.unsubscribe();
    this.courseSubscription.unsubscribe();
  }
}
