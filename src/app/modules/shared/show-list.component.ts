import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { TVMaze } from './tv-maze.provider';
import { LocalStorage } from './local-storage.provider';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Episode, Show } from './../../interfaces';
import { SortableHeader } from './sortable-header.directive';
import { OrderByDirection } from './order-by.pipe';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'rxjs/operators/map';
import { share } from 'rxjs/operators/share';

@Component({
  selector: 'mwl-show-list',
  template: `
    <table class="table" [hidden]="!shows || shows.length === 0">
      <thead>
        <tr>
          <th mwlSortableHeader="name" [sort]="sort">Name</th>
          <th>Image</th>
          <th mwlSortableHeader="network.name" [sort]="sort">Network</th>
          <th>Summary</th>
          <th mwlSortableHeader="status" [sort]="sort">Status</th>
          <th mwlSortableHeader="nextEpisode.airstamp" [sort]="sort">Next episode</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let show of showsWithLatestEpisodes$ | async | mwlOrderBy:sort.field:sort.direction" [hidden]="!show.image?.medium">
          <td>{{ show.name }}</td>
          <td>
            <img [src]="show.image?.medium | mwlReplace:'http://':'https://'" width="60">
          </td>
          <td>{{ show.network?.name }}</td>
          <td [innerHtml]="show.summary"></td>
          <td>
            <span
              class="badge"
              [class.badge-success]="show.status === 'Running'"
              [class.badge-danger]="show.status !== 'Running'">
               {{ show.status }}
             </span>
          </td>
          <td>
            <span [hidden]="!show?.nextEpisode?.airstamp">{{ show?.nextEpisode?.airstamp | date:'fullDate' }}</span>
            <span [hidden]="show?.nextEpisode?.airstamp">Unknown</span>
          </td>
          <td style="width: 270px">
            <button class="btn btn-success" (click)="subscribe(show)" [hidden]="isSubscribed(show)">
              Subscribe
            </button>
            <button
              class="btn btn-danger"
              [hidden]="!isSubscribed(show)"
              mwlConfirmationPopover
              popoverTitle="Unsubscribe"
              popoverMessage="Are you sure you would like to unsubscribe from this show?"
              (confirm)="unsubscribeFromShow(show)">
              Unsubscribe
            </button>
            <button class="btn btn-info" [routerLink]="['/episodes', show.id]">
              Episodes
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class ShowListComponent implements OnChanges {
  @Input() shows: Show[];

  @Output() unsubscribe = new EventEmitter<Show>();

  shows$ = new ReplaySubject<Show[]>();

  showsWithLatestEpisodes$ = this.shows$.pipe(
    mergeMap(shows => {
      const episodeRequests = shows.map(show =>
        this.tvMaze.getEpisodes(show.id)
      );

      return forkJoin(episodeRequests).pipe(
        map(showEpisodes => {
          return showEpisodes.map((episodes, showIndex) => {
            const nextEpisode = episodes.find(episode => {
              return new Date(episode.airstamp).getTime() > Date.now();
            });
            return { ...this.shows[showIndex], nextEpisode };
          });
        })
      );
    }),
    share()
  );

  subscribedShows: Show[];

  sort: SortableHeader = {
    field: null,
    direction: OrderByDirection.Asc
  };

  constructor(private localStorage: LocalStorage, private tvMaze: TVMaze) {
    this.subscribedShows = localStorage.getItem('subscribedShows', []);
  }

  subscribe(show: Show): void {
    this.subscribedShows.push(show);
    this.localStorage.setItem('subscribedShows', this.subscribedShows);
  }

  isSubscribed(show: Show): boolean {
    return this.subscribedShows.some(
      (subscribedShow: Show) => subscribedShow.id === show.id
    );
  }

  unsubscribeFromShow(show: Show): void {
    this.subscribedShows = this.subscribedShows.filter(
      (subscribedShow: Show) => subscribedShow.id !== show.id
    );
    this.localStorage.setItem('subscribedShows', this.subscribedShows);
    this.unsubscribe.emit(show);
  }

  ngOnChanges(changeRecord: SimpleChanges): void {
    if (changeRecord.shows && this.shows) {
      this.shows$.next(this.shows);
    }
  }
}
