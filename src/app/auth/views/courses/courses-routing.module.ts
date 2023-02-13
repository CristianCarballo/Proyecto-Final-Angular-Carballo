import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseFormComponent } from './pages/course-form/course-form.component';
import { CourseEditComponent } from './pages/course-edit/course-edit.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component: CourseListComponent
      },
      {
        path:'form',
        component: CourseFormComponent
      },
      {
        path:'edit',
        component: CourseEditComponent
      },
      {
        path:':id',
        component: CourseDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CoursesRoutingModule { }
