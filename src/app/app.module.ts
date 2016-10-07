/// <reference types="core-js" />
/// <reference path="./typings.custom.d.ts" />

import 'bootstrap/scss/bootstrap.scss';
import 'angular2-calendar/scss/angular2-calendar.scss';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import {NgModule, enableProdMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {Navbar} from './components/navbar';
import {SubscribedShows} from './modules/subscribed';
import {SharedModule} from './modules/shared';
import {AppComponent} from './app.component';

declare var ENV: string;
if (ENV === 'production') {
  enableProdMode();
}

@NgModule({
  declarations: [
    AppComponent,
    Navbar,
    SubscribedShows
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    SharedModule.forRoot(),
    RouterModule.forRoot([
      {path: 'subscribed', component: SubscribedShows},
      {path: 'episodes/:id', loadChildren: './modules/+episodes#EpisodesModule'},
      {path: 'search', loadChildren: './modules/+search#SearchModule'},
      {path: 'schedule', loadChildren: './modules/+schedule#ScheduleModule'},
      {path: '**', redirectTo: 'subscribed'}
    ], {useHash: true})
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}