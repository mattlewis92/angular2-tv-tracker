import {NgModule} from '@angular/core';
import {CalendarModule} from 'angular2-calendar';
import {ScheduleCalendar} from './schedule.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [ScheduleCalendar],
  imports: [
    CommonModule,
    CalendarModule.forRoot(),
    RouterModule.forChild([
      {path: '', component: ScheduleCalendar}
    ])
  ]
})
export class ScheduleModule {}