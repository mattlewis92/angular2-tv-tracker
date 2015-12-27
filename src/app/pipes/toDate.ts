import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
  name: 'toDate'
})
export class ToDate implements PipeTransform {

  transform(input: string): Date {
    return new Date(input);
  }

}