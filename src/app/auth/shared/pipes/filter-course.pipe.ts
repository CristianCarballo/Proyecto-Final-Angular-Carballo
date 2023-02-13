import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../views/courses/models/course';

@Pipe({
  name: 'filterCourse'
})
export class FilterCoursePipe implements PipeTransform {

  transform(course: Course[], filter: string): Course[] {
    return course.filter(
      course => course.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
      course.comission.includes(filter) ||
      course.startDate.getMonth() + 1 == parseInt(filter)
    );

  }

}
