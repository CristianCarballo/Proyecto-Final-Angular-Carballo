import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/module/material.module';
import { PipeModule } from '../../shared/pipes/pipe.module';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentEditComponent } from './pages/student-edit/student-edit.component';
import { StudentFormComponent } from './pages/student-form/student-form.component';
import { StudentListComponent } from './pages/student-list/student-list.component';


@NgModule({
  declarations: [
    StudentEditComponent,
    StudentFormComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MaterialModule,
    PipeModule
  ]
})
export class StudentsModule { }
