import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  
  form!: FormGroup;
  id!: number;

  constructor(
    private activatedRouted: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRouted.paramMap.subscribe((parameters) => {
      
      this.id = parseInt(parameters.get('id') || '');
      this.form = new FormGroup({
        name: new FormControl(parameters.get('name')),
        info: new FormControl(parameters.get('info')),
        comision: new FormControl(parameters.get('comission')),
        profesor: new FormControl(parameters.get('teacher')),
        inicio: new FormControl(parameters.get('startDate')),
        fin: new FormControl(parameters.get('endDate')),
        img: new FormControl(parameters.get('img')),
      });
    });
  }

  editCourse() {
    let course: Course = {
      id: this.id,
      name: this.form.value.name,
      info:this.form.value.info,
      comission: this.form.value.comission,
      teacher: this.form.value.teacher,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      img: this.form.value.img,
    };

    this.coursesService.editCourse(course);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Los datos fueron actualizados',
      showConfirmButton: false,
      timer: 1500,
    });
    this.router.navigate(['/courses']);
  }
}
