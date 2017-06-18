import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'angular-calendar/scss/angular-calendar.scss';
import 'zone.js/dist/zone';
import 'rxjs/Observable';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IdlePreload, IdlePreloadModule } from '@angularclass/idle-preload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent, LoadingSpinnerComponent } from './app.component';

declare const ENV: string;
if (ENV === 'production') {
  const install: () => {} = require('offline-plugin/runtime').install; // tslint:disable-line
  install();
  enableProdMode();
}

@NgModule({
  declarations: [AppComponent, LoadingSpinnerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IdlePreloadModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: 'subscribed',
          loadChildren: './modules/+subscribed/index#SubscribedModule'
        },
        {
          path: 'episodes/:id',
          loadChildren: './modules/+episodes/index#EpisodesModule'
        },
        {
          path: 'search',
          loadChildren: './modules/+search/index#SearchModule'
        },
        {
          path: 'schedule',
          loadChildren: './modules/+schedule/index#ScheduleModule'
        },
        { path: '**', redirectTo: 'subscribed' }
      ],
      {
        useHash: true,
        preloadingStrategy: IdlePreload
      }
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
