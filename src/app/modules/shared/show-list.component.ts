import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit
} from '@angular/core';
import { TVMaze } from './tv-maze.provider';
import { LocalStorage } from './local-storage.provider';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Show } from './../../interfaces';
import { SortableHeader } from './sortable-header.directive';
import { OrderByDirection } from './order-by.pipe';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'rxjs/operators/map';
import { share } from 'rxjs/operators/share';

const SUBSCRIBED_SHOWS_LS_KEY = 'subscribedShows';

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
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let show of filteredShowsList | mwlOrderBy:sort.field:sort.direction" [hidden]="!show.image?.medium">
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
          <td style="width: 270px">
            <button class="btn btn-success" (click)="subscribeToShow(show)" [hidden]="show.isSubscribed">
              Subscribe
            </button>
            <button
              class="btn btn-danger"
              [hidden]="!show.isSubscribed"
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
export class ShowListComponent implements OnChanges, OnInit {
  @Input() shows: Show[];

  @Output() unsubscribe = new EventEmitter<Show>();

  filteredShowsList: Show[];

  sort: SortableHeader = {
    field: null,
    direction: OrderByDirection.Asc
  };

  constructor(private localStorage: LocalStorage) {}

  ngOnChanges(changeRecord: SimpleChanges): void {
    if (changeRecord.shows && this.shows) {
      this.updateFilteredShowsList();
    }
  }

  subscribeToShow(show: Show): void {
    this.setSubscribedShows([...this.getSubscribedShows(), show]);
  }

  unsubscribeFromShow(show: Show): void {
    this.setSubscribedShows(
      this.getSubscribedShows().filter(iShow => iShow.id !== show.id)
    );
    this.unsubscribe.emit(show);
  }

  private getSubscribedShows(): Show[] {
    return this.localStorage.getItem(SUBSCRIBED_SHOWS_LS_KEY, []);
  }

  private setSubscribedShows(shows: Show[]) {
    this.localStorage.setItem(SUBSCRIBED_SHOWS_LS_KEY, shows);
    this.updateFilteredShowsList();
  }

  private updateFilteredShowsList() {
    const subscribedShows = this.getSubscribedShows();
    this.filteredShowsList = this.shows.map(show => {
      const isSubscribed = subscribedShows.some(iShow => iShow.id === show.id);
      return { ...show, isSubscribed };
    });
  }
}
