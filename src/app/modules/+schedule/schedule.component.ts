import { Component } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/map';
import * as randomColor from 'randomcolor';
import tinycolor from 'tinycolor2';
import format from 'date-fns/format';
import isSameDay from 'date-fns/is_same_day';
import isSameMonth from 'date-fns/is_same_month';
import { Episode, ShowWithEpisodes } from '../../interfaces';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

const padNumber: Function = (number: number): string => number < 10 ? `0${number}` : number + '';

@Component({
  template: `
    <div>
      <div class="row">
        <div class="col-md-4">
          <div class="btn-group">
            <div
              class="btn btn-primary"
              mwlCalendarPreviousView
              [view]="view"
              [(viewDate)]="viewDate">
              Previous
            </div>
            <div
              class="btn btn-secondary"
              mwlCalendarToday
              [(viewDate)]="viewDate">
              Today
            </div>
            <div
              class="btn btn-primary"
              mwlCalendarNextView
              [view]="view"
              [(viewDate)]="viewDate">
              Next
            </div>
          </div>
        </div>
        <div class="col-md-4 text-center">
          <h3>{{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}</h3>
        </div>
        <div class="col-md-4 text-right">
          <div class="btn-group">
            <button class="btn btn-primary" (click)="view = 'month'" [class.active]="view === 'month'">Month</button>
            <button class="btn btn-primary" (click)="view = 'week'" [class.active]="view === 'week'">Week</button>
            <button class="btn btn-primary" (click)="view = 'day'" [class.active]="view === 'day'">Day</button>
          </div>
        </div>
      </div>
      <br>
      <div [ngSwitch]="view">
        <mwl-calendar-month-view
          *ngSwitchCase="'month'"
          [viewDate]="viewDate"
          [events]="events | async"
          [activeDayIsOpen]="activeDayIsOpen"
          (dayClicked)="dayClicked($event.day)"
          (eventClicked)="openEpisode($event.event)">
        </mwl-calendar-month-view>
        <mwl-calendar-week-view
          *ngSwitchCase="'week'"
          [viewDate]="viewDate"
          [events]="events | async"
          (eventClicked)="openEpisode($event.event)">
        </mwl-calendar-week-view>
        <mwl-calendar-day-view
          *ngSwitchCase="'day'"
          [viewDate]="viewDate"
          [events]="events | async"
          (eventClicked)="openEpisode($event.event)">
        </mwl-calendar-day-view>
      </div>
    </div>
    <br><br>
  `
})
export class ScheduleCalendarComponent {

  view: string = 'month';
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  events: Observable<{}>;

  constructor(route: ActivatedRoute) {
    this.events = route.data.pluck('subscribedShowsWithEpisodes').map((showsWithEpisodes: ShowWithEpisodes[]) => {

      const events: CalendarEvent<{episode: Episode}>[] = [];

      showsWithEpisodes.forEach(({episodes, show}: ShowWithEpisodes) => {
        episodes.forEach((episode: Episode) => {

          const color: any = {};
          color.primary = randomColor({
            luminosity: 'dark',
            seed: show.id
          });
          color.secondary = tinycolor(color.primary).lighten(50).toString();

          events.push({
            title: `
              ${format(episode.airstamp, 'h:mma')} - ${show.name}
              S${padNumber(episode.season)}E${padNumber(episode.number)} - ${episode.name}
            `,
            start: new Date(episode.airstamp),
            color,
            meta: {
              episode
            }
          });

        });

      });

      return events;

    });
  }

  dayClicked({date, events}: {date: Date, events: CalendarEvent<{episode: Episode}>[]}): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  openEpisode(event: CalendarEvent<{episode: Episode}>): void {
    window.open(event.meta.episode.url, '_blank');
  }

}