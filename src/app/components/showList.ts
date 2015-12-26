import {Component, Input} from 'angular2/core';
import {COMMON_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {LocalStorage} from './../services/localStorage';

@Component({
  selector: 'show-list',
  directives: [COMMON_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [LocalStorage],
  template: `
    <table class="table" [hidden]="!shows || shows.length === 0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Network</th>
          <th>Summary</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="#show of shows" [hidden]="!show.image?.medium">
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

  @Input() public shows: Array<Object>;
  public subscribedShows: Array<{id: number}>;

  constructor(private localStorage: LocalStorage) {
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
  }

}