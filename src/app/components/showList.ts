import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {COMMON_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {LocalStorage, TVMaze} from './../providers/providers';
import {ToDate, OrderBy} from './../pipes/pipes';
import {SortableHeader} from './sortableHeader';
import {Observable} from 'rxjs/Observable';
import {Show, Episode} from './../interfaces/interfaces';

@Component({
  selector: 'show-list',
  directives: [COMMON_DIRECTIVES, ROUTER_DIRECTIVES, SortableHeader],
  pipes: [ToDate, OrderBy],
  template: `
    <table class="table" [hidden]="!shows || shows.length === 0">
      <thead>
        <tr>
          <th sortableHeader="name" [sort]="sort">Name</th>
          <th>Image</th>
          <th sortableHeader="network.name" [sort]="sort">Network</th>
          <th>Summary</th>
          <th sortableHeader="status" [sort]="sort">Status</th>
          <th sortableHeader="nextEpisode.airstamp" [sort]="sort">Next episode</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let show of shows | orderBy:sort.field:sort.desc" [hidden]="!show.image?.medium">
          <td>{{ show.name }}</td>
          <td>
            <img [src]="show.image?.medium" width="60">
          </td>
          <td>{{ show.network?.name }}</td>
          <td [innerHtml]="show.summary"></td>
          <td>
            <span
              class="label"
              [class.label-success]="show.status === 'Running'"
              [class.label-danger]="show.status !== 'Running'">
               {{ show.status }}
             </span>
          </td>
          <td>
            <span [hidden]="!show?.nextEpisode?.airstamp">{{ show?.nextEpisode?.airstamp | toDate | date:'fullDate' }}</span>
            <span [hidden]="show?.nextEpisode?.airstamp">Unknown</span>
          </td>
          <td style="width: 270px">
            <button class="btn btn-success" (click)="subscribe(show)" [hidden]="isSubscribed(show)">
              Subscribe
            </button>
            <button class="btn btn-danger" (click)="unsubscribe(show)" [hidden]="!isSubscribed(show)">
              Unsubscribe
            </button>
            <button class="btn btn-info" [routerLink]="['/Episodes', {id: show.id}]">
              Episodes
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class ShowList {

  @Input() public shows: Array<Show>;
  @Output('unsubscribe') public unsubscribeCallback: EventEmitter<any> = new EventEmitter();
  public subscribedShows: Array<Show>;
  public sort: {field: string, desc: boolean} = {field: null, desc: false};

  constructor(private localStorage: LocalStorage, private tvMaze: TVMaze) {
    this.subscribedShows = localStorage.getItem('subscribedShows', []);
  }

  subscribe(show: Show): void {
    this.subscribedShows.push(show);
    this.localStorage.setItem('subscribedShows', this.subscribedShows);
  }

  isSubscribed(show: Show): Object {
    return this.subscribedShows.find((subscribedShow: Show) => subscribedShow.id === show.id);
  }

  unsubscribe(show: Show): void {
    this.subscribedShows = this.subscribedShows.filter((subscribedShow: Show) => subscribedShow.id !== show.id);
    this.localStorage.setItem('subscribedShows', this.subscribedShows);
    this.unsubscribeCallback.next(show);
  }

  ngOnChanges(changeRecord: any): void {

    if (changeRecord.shows && this.shows) {

      const episodeRequests: Observable<any>[] = this.shows.map((show: Show) => this.tvMaze.getEpisodes(show.id));

      Observable.forkJoin(episodeRequests).subscribe((showEpisodes: Episode[][]) => {

        showEpisodes.forEach((episodes: Episode[], showIndex: number) => {

          this.shows[showIndex].nextEpisode = episodes.find((episode: Episode) => {
            return new Date(episode.airdate).getTime() > Date.now();
          });

        });

      });

    }

  }

}