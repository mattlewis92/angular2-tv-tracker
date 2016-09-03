/// <reference types="tinycolor" />

import {Component} from '@angular/core';
import {UnitOfTime, Moment} from 'moment';
import * as moment from 'moment';
import {CalendarEvent} from 'angular2-calendar';
import {LocalStorage} from '../providers/localStorage';
import {TVMaze} from '../providers/tvMaze';
import {Show, Episode} from '../interfaces/interfaces';
import {Observable} from 'rxjs';
import * as randomColor from 'randomcolor';
import * as tinycolor from 'tinycolor2';

interface EpisodeCalendarEvent extends CalendarEvent {
  episode: Episode;
}

@Component({
  template: `
    <div class="text-xs-center" *ngIf="!showsLoaded">
      <h1>Loading...</h1>
    </div>
    <div *ngIf="showsLoaded">
      <div class="row">
        <div class="col-md-4">
          <div class="btn-group">
            <div class="btn btn-primary" (click)="decrement()">
              Previous
            </div>
            <div class="btn btn-secondary" (click)="today()">
              Today
            </div>
            <div class="btn btn-primary" (click)="increment()">
              Next
            </div>
          </div>
        </div>
        <div class="col-md-4 text-xs-center">
          <h3>{{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}</h3>
        </div>
        <div class="col-md-4 text-xs-right">
          <div class="btn-group">
            <div class="btn btn-primary" (click)="view = 'month'" [class.active]="view === 'month'">Month</div>
            <div class="btn btn-primary" (click)="view = 'week'" [class.active]="view === 'week'">Week</div>
            <div class="btn btn-primary" (click)="view = 'day'" [class.active]="view === 'day'">Day</div>
          </div>
        </div>
      </div>
      <br>
      <div [ngSwitch]="view">
        <mwl-calendar-month-view
          *ngSwitchCase="'month'"
          [viewDate]="viewDate"
          [events]="events"
          [activeDayIsOpen]="activeDayIsOpen"
          (dayClicked)="dayClicked($event.day)"
          (eventClicked)="openEpisode($event.event)">
        </mwl-calendar-month-view>
        <mwl-calendar-week-view
          *ngSwitchCase="'week'"
          [viewDate]="viewDate"
          [events]="events"
          (eventClicked)="openEpisode($event.event)">
        </mwl-calendar-week-view>
        <mwl-calendar-day-view
          *ngSwitchCase="'day'"
          [viewDate]="viewDate"
          [events]="events"
          (eventClicked)="openEpisode($event.event)">
        </mwl-calendar-day-view>
      </div>
    </div>
    <br><br>
  `
})
export class ScheduleCalendar {

  private view: UnitOfTime = 'month';

  private viewDate: Date = new Date();

  private activeDayIsOpen: boolean = false;

  private events: EpisodeCalendarEvent[] = [];

  private subscribedShows: Show[];

  private showsLoaded: boolean = false;

  constructor(private localStorage: LocalStorage, private tvMaze: TVMaze) {
    this.subscribedShows = localStorage.getItem('subscribedShows', []);
  }

  ngOnInit(): void {

    interface ShowWithEpisodes {
      show: Show;
      episodes: Episode[];
    }

    const episodeRequests: Observable<any>[] = this.subscribedShows.map((show: Show) => {
      return this.tvMaze.getEpisodes(show.id).map((episodes: Episode[]): ShowWithEpisodes => {
        return {episodes, show};
      });
    });

    const padNumber: Function = (number: number): string => number < 10 ? `0${number}` : number + '';

    Observable.forkJoin(episodeRequests).subscribe((showsWithEpisodes: ShowWithEpisodes[]) => {

      this.events = [];

      showsWithEpisodes.forEach(({episodes, show}: ShowWithEpisodes) => {
        episodes.forEach((episode: Episode) => {

          const color: any = {};
          color.primary = randomColor({
            luminosity: 'dark',
            seed: show.id
          });
          color.secondary = tinycolor(color.primary).lighten(50).toString();

          this.events.push({
            title: `
              ${moment(episode.airstamp).format('h:mma')} - ${show.name} 
              S${padNumber(episode.season)}E${padNumber(episode.number)} - ${episode.name}
            `,
            start: new Date(episode.airstamp),
            color,
            episode
          });

        });

      });

      this.showsLoaded = true;

    });
  }

  increment(): void {
    this.viewDate = moment(this.viewDate).add(1, this.view).toDate();
    this.activeDayIsOpen = false;
  }

  decrement(): void {
    this.viewDate = moment(this.viewDate).subtract(1, this.view).toDate();
    this.activeDayIsOpen = false;
  }

  today(): void {
    this.viewDate = new Date();
    this.activeDayIsOpen = false;
  }

  dayClicked({date, events}: {date: Moment, events: EpisodeCalendarEvent[]}): void {
    if (moment(date).startOf('month').isSame(moment(this.viewDate).startOf('month'))) {
      if (
        (moment(this.viewDate).startOf('day').isSame(date.clone().startOf('day')) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date.toDate();
      }
    }
  }

  openEpisode(event: EpisodeCalendarEvent): void {
    window.open(event.episode.url, '_blank');
  }

}