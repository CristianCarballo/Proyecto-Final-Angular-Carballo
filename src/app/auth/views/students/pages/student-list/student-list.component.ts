import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription, Observable, map } from 'rxjs';
import Swal from 'sweetalert2';
import { Session } from '../../../sessions/models/session';
import { SessionService } from '../../../sessions/services/session.service';
import { Student } from '../../model/student';
import { StudentService } from '../../services/students.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit, OnDestroy {

  student!: Student;
  students!: Student[];
  studentSubscription!: Subscription
  students$!: Observable<Student[]>

  session$!: Observable<Session>;
  sessionSubscription!: Subscription;
  session!: Session;

  dataSource!: MatTableDataSource<Student>;
  displayedColumns: string[] = ['id', 'name', 'dni', 'userName', 'delete'];

  constructor(
    private studentService: StudentService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.students$ = this.studentService.getStudent();
    this.studentSubscription = this.students$.subscribe((students: Student[]) => {
      this.students = students
    })

    this.session$ = this.sessionService.getSessionData();
    this.sessionSubscription = this.session$.subscribe(
      (session: Session) => (this.session = session));

    this.dataSource = new MatTableDataSource<Student>(this.students);
  }

  editStudent(student: Student) {
    this.router.navigate(['/students/edit', student])
  }

  deleteStudent(student: Student) {
    this.studentService.deleteStudent(student).subscribe(() => {
      this.students$ = this.studentService.getStudent();
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se eliminó correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  applyFilter(event: Event) {
    
    const value = (event.target as HTMLInputElement).value;

    this.students$ = this.studentService.getStudent().pipe(
      map(c => c.filter(
        student => student.firstName.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      ))
    );
  }

  ngOnDestroy(): void {
    this.studentSubscription.unsubscribe();
    this.sessionSubscription.unsubscribe();
  }
}