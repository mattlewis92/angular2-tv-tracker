import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {COMMON_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {LocalStorage, TVMaze} from './../providers/providers';
import {ToDate, OrderBy} from './../pipes/pipes';
import {SortableHeader} from './sortableHeader';

@Component({
  selector: 'show-list',
  directives: [COMMON_DIRECTIVES, ROUTER_DIRECTIVES, [SortableHeader]],
  providers: [LocalStorage, TVMaze],
  pipes: [[ToDate, OrderBy]],
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
        <tr *ngFor="#show of shows | orderBy:sort.field:sort.desc" [hidden]="!show.image?.medium">
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

  @Input() public shows: Array<{id: number, nextEpisode: Object}>;
  @Output('unsubscribe') public unsubscribeCallback = new EventEmitter();
  public subscribedShows: Array<{id: number}>;
  public sort: {field: string, desc: boolean} = {field: null, desc: false};

  constructor(private localStorage: LocalStorage, private tvMaze: TVMaze) {
    this.subscribedShows = localStorage.getItem('subscribedShows', []);
  }

  subscribe(show): void {
    this.subscribedShows.push(show);
    this.localStorage.setItem('subscribedShows', this.subscribedShows);
  }

  isSubscribed(show): Object {
    return this.subscribedShows.find(subscribedShow => subscribedShow.id === show.id);
  }

  unsubscribe(show): void {
    this.subscribedShows = this.subscribedShows.filter(subscribedShow => subscribedShow.id !== show.id);
    this.localStorage.setItem('subscribedShows', this.subscribedShows);
    this.unsubscribeCallback.next(show);
  }

  ngOnChanges(changeRecord) {
    if (changeRecord.shows && this.shows) {
      const episodePromises = this.shows.map(show => this.tvMaze.getEpisodes(show.id).toPromise());

      Promise.all(episodePromises).then(showEpisodes => {
        showEpisodes.forEach((episodes, showIndex) => {
          this.shows[showIndex].nextEpisode = episodes.find((episode: {airdate: string}) => {
            return new Date(episode.airdate).getTime() > Date.now();
          });
        });
      });
    }
  }

}