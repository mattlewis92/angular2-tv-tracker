import {Pipe} from 'angular2/core';

@Pipe({
  name: 'orderBy'
})
export class OrderBy {

  transform(input:Object[], [field, desc = false]:[string, boolean]):Object[] {
    if (input && field) {
      return Array.from(input).sort((a, b) => {
        if (a[field] < b[field]) {
          return desc ? 1 : -1;
        }
        if (a[field] > b[field]) {
          return desc ? -1 : 1;
        }
        return 0;
      });
    }
    return input;
  }

}