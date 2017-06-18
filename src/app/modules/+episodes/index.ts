import { NgModule } from '@angular/core';
import { EpisodesComponent } from './episodes.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared';

@NgModule({
  declarations: [
    EpisodesComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: EpisodesComponent}
    ]),
    SharedModule
  ]
})
export class EpisodesModule {}