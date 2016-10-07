import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchShows} from './searchShows.component';
import {SearchBox} from './searchBox.component';
import {SharedModule} from './../shared';

@NgModule({
  declarations: [
    SearchShows,
    SearchBox
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: SearchShows}
    ]),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SearchModule {}