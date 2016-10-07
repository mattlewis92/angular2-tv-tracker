import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CalendarModule} from 'angular2-calendar';
import {ScheduleCalendar} from './schedule.component';
import {EpisodesResolver} from './episodes.resolver';
import {SharedModule} from './../shared';

@NgModule({
  declarations: [
    ScheduleCalendar
  ],
  imports: [
    CommonModule,
    SharedModule,
    CalendarModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: ScheduleCalendar,
        resolve: {
          episodeEvents: EpisodesResolver
        }
      }
    ])
  ],
  providers: [EpisodesResolver]
})
export class ScheduleModule {}