import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CalendarModule} from 'angular2-calendar';
import {ScheduleCalendar} from './schedule.component';
import {SharedModule} from './../shared';

@NgModule({
  declarations: [ScheduleCalendar],
  imports: [
    CommonModule,
    SharedModule,
    CalendarModule.forRoot(),
    RouterModule.forChild([
      {path: '', component: ScheduleCalendar}
    ])
  ]
})
export class ScheduleModule {}