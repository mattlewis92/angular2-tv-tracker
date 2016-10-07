/// <reference types="core-js" />
/// <reference path="./customTypings.d.ts" />

import 'bootstrap/scss/bootstrap.scss';
import 'angular2-calendar/scss/angular2-calendar.scss';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import {NgModule, enableProdMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ConfirmModule} from 'angular2-bootstrap-confirm';
import {
  Episodes,
  Navbar,
  SearchBox,
  SearchShows,
  ShowList,
  SortableHeader,
  SubscribedShows
} from './components/components';
import {OrderBy} from './pipes/pipes';
import {LocalStorage, TVMaze} from './providers/providers';
import {AppComponent} from './app.component';

declare var ENV: string;
if (ENV === 'production') {
  enableProdMode();
}

@NgModule({
  declarations: [
    AppComponent,
    Episodes,
    Navbar,
    SearchBox,
    SearchShows,
    ShowList,
    SortableHeader,
    SubscribedShows,
    OrderBy
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    ConfirmModule,
    RouterModule.forRoot([
      {path: 'subscribed', component: SubscribedShows},
      {path: 'episodes/:id', component: Episodes},
      {path: 'add', component: SearchShows},
      {path: 'schedule', loadChildren: './modules/+schedule#ScheduleModule'},
      {path: '**', redirectTo: 'subscribed'}
    ], {useHash: true})
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    LocalStorage,
    TVMaze
  ]
})
export class AppModule {}