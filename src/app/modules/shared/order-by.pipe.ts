import { Pipe, PipeTransform } from '@angular/core';
import get from 'lodash.get';

@Pipe({
  name: 'mwlOrderBy'
})
export class OrderBy implements PipeTransform {

  transform(input: object[], field: string, desc: boolean = false): object[] {
    if (input && field) {
      return Array.from(input).sort((a: object, b: object) => {
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