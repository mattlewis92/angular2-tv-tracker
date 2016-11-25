/// <reference types="core-js" />
/// <reference path="../../node_modules/date-fns/typings.d.ts" />
/// <reference path="./typings.custom.d.ts" />

import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'angular-calendar/scss/angular-calendar.scss';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'rxjs/Observable';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent, LoadingSpinnerComponent } from './app.component';
import { install as installServiceWorker } from 'offline-plugin/runtime';

declare const ENV: string;
if (ENV === 'production') {
  installServiceWorker();
  enableProdMode();
}

@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'subscribed', loadChildren: './modules/+subscribed/index#SubscribedModule'},
      {path: 'episodes/:id', loadChildren: './modules/+episodes/index#EpisodesModule'},
      {path: 'search', loadChildren: './modules/+search/index#SearchModule'},
      {path: 'schedule', loadChildren: './modules/+schedule/index#ScheduleModule'},
      {path: '**', redirectTo: 'subscribed'}
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