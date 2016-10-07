import {NgModule} from '@angular/core';
import {Episodes} from './episodes.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from './../shared';

@NgModule({
  declarations: [
    Episodes
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: Episodes}
    ]),
    SharedModule
  ]
})
export class EpisodesModule {}