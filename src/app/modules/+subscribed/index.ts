import { NgModule } from '@angular/core';
import { SubscribedShowsComponent } from './subscribedShows.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared';

@NgModule({
  declarations: [
    SubscribedShowsComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: SubscribedShowsComponent}
    ]),
    SharedModule
  ]
})
export class SubscribedModule {}