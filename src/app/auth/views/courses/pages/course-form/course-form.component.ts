import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  form!: FormGroup;

  constructor(private coursesService: CoursesService, private router: Router) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      info: new FormControl('', [Validators.required]),
      comission: new FormControl('', [Validators.required]),
      teacher: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      img: new FormControl(''),
    });
  }

  addCourse() {
    const course: Course = {
      id: Math.round(Math.random() * 1000),
      name: this.form.value.name,
      info: this.form.value.info,
      comission: this.form.value.comission,
      teacher: this.form.value.teacher,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      img: this.form.value.img,
    };

    this.coursesService.addCourse(course).subscribe(() => {
      this.router.navigate(['/courses']);
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Curso agregado',
      showConfirmButton: false,
      timer: 1500,
    });
  }

}
