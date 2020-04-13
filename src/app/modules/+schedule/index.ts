import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ScheduleCalendarComponent } from './schedule.component';
import { SubscribedShowsEpisodesResolver } from './subscribed-shows-episodes.resolver';
import { SharedModule } from './../shared';

@NgModule({
  declarations: [ScheduleCalendarComponent],
  imports: [
    CommonModule,
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RouterModule.forChild([
      {
        path: '',
        component: ScheduleCalendarComponent,
        resolve: {
          subscribedShowsWithEpisodes: SubscribedShowsEpisodesResolver
        }
      }
    ])
  ],
  providers: [SubscribedShowsEpisodesResolver]
})
export class ScheduleModule {}
