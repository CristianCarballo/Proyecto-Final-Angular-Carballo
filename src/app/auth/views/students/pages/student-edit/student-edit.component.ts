import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentService } from '../../services/students.service';
import { Student } from '../../model/student';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})

export class StudentEditComponent implements OnInit {

  student!: Student;
  form!: FormGroup;
  id!: number;

  constructor(
    private activatedRouted: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRouted.paramMap.subscribe((data) => {
      this.id = parseInt(data.get('id') || '')
      this.form = new FormGroup({
        name: new FormControl(data.get('name')),
        lastName: new FormControl(data.get('lastName')),
        dni: new FormControl(data.get('dni')),
        userName: new FormControl(data.get('userName')),
      })
    })
  }

  editStudent() {
    let student: Student = {
      id: this.id,
      firstName: this.form.value.name,
      lastName: this.form.value.lastName,
      dni: this.form.value.dni,
      userName: this.form.value.userName,
    }

    this.studentService.editStudent(student).subscribe(() => this.router.navigate(['/students']));
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se editó correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
