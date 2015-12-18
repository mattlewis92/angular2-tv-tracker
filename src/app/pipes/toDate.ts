import {Pipe} from 'angular2/core';

@Pipe({
  name: 'toDate'
})
export class ToDate {

  transform(input:string):Date {
    return new Date(input);
  }

}