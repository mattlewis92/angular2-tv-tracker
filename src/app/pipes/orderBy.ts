import {Pipe, PipeTransform} from 'angular2/core';

declare var require: any;
const get: any = require('lodash.get');

@Pipe({
  name: 'orderBy'
})
export class OrderBy implements PipeTransform {

  transform(input: Object[], field: string, desc: boolean = false): Object[] {
    if (input && field) {
      return Array.from(input).sort((a: Object, b: Object) => {
        if (get(a, field) < get(b, field)) {
          return desc ? 1 : -1;
        }
        if (get(a, field) > get(b, field)) {
          return desc ? -1 : 1;
        }
        return 0;
      });
    }
    return input;
  }

}