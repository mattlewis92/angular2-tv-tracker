import {NgModule, ModuleWithProviders} from '@angular/core';
import {OrderBy} from './orderBy.pipe';
import {SortableHeader} from './sortableHeader.directive';
import {LocalStorage} from './localStorage.provider';
import {TVMaze} from './tvMaze.provider';

@NgModule({
  declarations: [OrderBy, SortableHeader],
  exports: [OrderBy, SortableHeader]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        LocalStorage,
        TVMaze
      ]
    };
  }

}