import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../views/students/model/student';

@Pipe({
  name: 'student'
})
export class StudentPipe implements PipeTransform {

  transform(value: Student): string {

    return `${value.firstName} ${value.lastName}`;
  }

}
