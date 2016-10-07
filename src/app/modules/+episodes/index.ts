import {NgModule} from '@angular/core';
import {Episodes} from './episodes.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SharedModule} from './../shared';

@NgModule({
  declarations: [
    Episodes
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: Episodes}
    ]),
    SharedModule
  ]
})
export class EpisodesModule {}