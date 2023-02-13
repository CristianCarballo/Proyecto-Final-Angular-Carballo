import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './store/courses.effects';
import { coursesFeatureKey, reducer } from './store/courses.reducer';
import { PipeModule } from '../../shared/pipes/pipe.module';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { CourseEditComponent } from './pages/course-edit/course-edit.component';
import { CourseFormComponent } from './pages/course-form/course-form.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { MaterialModule } from '../../shared/module/material.module';


@NgModule({
  declarations: [
    CourseDetailComponent,
    CourseEditComponent,
    CourseFormComponent,
    CourseListComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MaterialModule,
    PipeModule,
    StoreModule.forFeature(coursesFeatureKey, reducer),
    EffectsModule.forFeature([CoursesEffects])
  ]
})
export class CoursesModule { }
