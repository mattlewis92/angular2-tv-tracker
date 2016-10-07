import {NgModule} from '@angular/core';
import {SubscribedShows} from './subscribedShows.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from './../shared';

@NgModule({
  declarations: [
    SubscribedShows
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: SubscribedShows}
    ]),
    SharedModule
  ]
})
export class SubscribedModule {}