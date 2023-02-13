import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCoursePipe } from './filter-course.pipe';
import { StudentPipe } from './student.pipe';


@NgModule({
  declarations: [
    FilterCoursePipe,
    StudentPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FilterCoursePipe,
    StudentPipe
  ]
})
export class PipeModule { }
