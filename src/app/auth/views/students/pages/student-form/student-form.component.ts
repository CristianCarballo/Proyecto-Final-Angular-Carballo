import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Student } from '../../model/student';
import { StudentService } from '../../services/students.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})

export class StudentFormComponent implements OnInit, OnDestroy {

  students!: Student[];
  studentSubscription!: Subscription;
  form!: FormGroup;
  id!: number;

  constructor(
    private studentService : StudentService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.studentSubscription = this.studentService.getStudent().subscribe((student) => this.students = student)

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
    })
  }

  addStudent() {

    let idStudent: number = Math.max.apply(null, this.students.map(o => o.id));

    let student : Student = {
      id: idStudent + 1,
      firstName: this.form.value.nombre,
      lastName: this.form.value.apellido,
      dni: this.form.value.dni,
      userName: this.form.value.nameUsuario
    }

    this.studentService.addStudent(student).subscribe(()=>this.router.navigate(['/students']));
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se agrego un nuevo alumno',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  ngOnDestroy(): void {
    this.studentSubscription.unsubscribe();
  }
}