import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mwlReplace'
})
export class Replace implements PipeTransform {
  transform(
    input: string = '',
    find: string = '',
    replaceWith: string = ''
  ): string {
    return input.replace(find, replaceWith);
  }
}
