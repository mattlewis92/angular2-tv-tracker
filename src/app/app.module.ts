/// <reference types="core-js" />
/// <reference path="./typings.custom.d.ts" />

import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'angular2-calendar/scss/angular2-calendar.scss';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'rxjs/Observable';
import {NgModule, enableProdMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, PreloadAllModules} from '@angular/router';
import {Loading, LoadingSpinner} from './modules/loading';
import {AppComponent} from './app.component';
import {install} from 'offline-plugin/runtime';

install();

declare var ENV: string;
if (ENV === 'production') {
  enableProdMode();
}

@NgModule({
  declarations: [
    AppComponent,
    Loading,
    LoadingSpinner
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'loading', component: Loading},
      {path: 'subscribed', loadChildren: './modules/+subscribed/index#SubscribedModule'},
      {path: 'episodes/:id', loadChildren: './modules/+episodes/index#EpisodesModule'},
      {path: 'search', loadChildren: './modules/+search/index#SearchModule'},
      {path: 'schedule', loadChildren: './modules/+schedule/index#ScheduleModule'},
      {path: '**', redirectTo: 'loading'}
    ], {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}