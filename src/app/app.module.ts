import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'angular-calendar/scss/angular-calendar.scss';
import 'zone.js/dist/zone';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent, LoadingSpinnerComponent } from './app.component';

if (process.env.NODE_ENV === 'production') {
  const install: () => {} = require('offline-plugin/runtime').install; // tslint:disable-line
  install();
  enableProdMode();
}

@NgModule({
  declarations: [AppComponent, LoadingSpinnerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
