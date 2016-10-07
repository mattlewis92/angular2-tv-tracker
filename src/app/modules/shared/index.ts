import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ConfirmModule} from 'angular2-bootstrap-confirm';
import {OrderBy} from './orderBy.pipe';
import {SortableHeader} from './sortableHeader.directive';
import {LocalStorage} from './localStorage.provider';
import {TVMaze} from './tvMaze.provider';
import {ShowList} from './showList.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfirmModule
  ],
  declarations: [
    OrderBy,
    SortableHeader,
    ShowList
  ],
  exports: [
    OrderBy,
    SortableHeader,
    ShowList,
    CommonModule
  ]
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