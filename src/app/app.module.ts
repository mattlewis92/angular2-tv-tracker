/// <reference types="core-js" />
/// <reference path="./typings.custom.d.ts" />

import 'bootstrap/scss/bootstrap.scss';
import 'angular2-calendar/scss/angular2-calendar.scss';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'rxjs/Observable';
import {NgModule, enableProdMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {SharedModule} from './modules/shared';
import {Loading} from './modules/loading';
import {AppComponent} from './app.component';

declare var ENV: string;
if (ENV === 'production') {
  enableProdMode();
}

@NgModule({
  declarations: [
    AppComponent,
    Loading
  ],
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    RouterModule.forRoot([
      {path: 'loading', component: Loading},
      {path: 'subscribed', loadChildren: './modules/+subscribed/index#SubscribedModule'},
      {path: 'episodes/:id', loadChildren: './modules/+episodes/index#EpisodesModule'},
      {path: 'search', loadChildren: './modules/+search/index#SearchModule'},
      {path: 'schedule', loadChildren: './modules/+schedule/index#ScheduleModule'},
      {path: '**', redirectTo: 'loading'}
    ], {useHash: true})
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}