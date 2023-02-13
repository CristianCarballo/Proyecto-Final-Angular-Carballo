import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentFormComponent } from './pages/student-form/student-form.component';
import { StudentEditComponent } from './pages/student-edit/student-edit.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component: StudentListComponent
      },
      {
        path:'form',
        component: StudentFormComponent
      },
      {
        path:'edit',
        component: StudentEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
