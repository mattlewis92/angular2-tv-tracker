import {NgModule} from '@angular/core';
import {OrderBy} from './orderBy.pipe';
import {SortableHeader} from './sortableHeader.directive';

@NgModule({
  declarations: [OrderBy, SortableHeader],
  exports: [OrderBy, SortableHeader]
})
export class SharedModule {}