import { Pipe, PipeTransform } from '@angular/core';
import orderBy from 'lodash.orderby';

export enum OrderByDirection {
  Asc = 'asc',
  Desc = 'desc'
}

@Pipe({
  name: 'mwlOrderBy'
})
export class OrderBy implements PipeTransform {
  transform(
    input: object[],
    field: string,
    direction: OrderByDirection = OrderByDirection.Asc
  ): object[] {
    if (input && field) {
      return orderBy(input, field, direction);
    }
    return input;
  }
}
