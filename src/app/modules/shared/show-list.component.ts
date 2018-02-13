import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import { LocalStorage } from './local-storage.provider';
import { Show } from './../../interfaces';
import { SortableHeader } from './sortable-header.directive';
import { OrderByDirection } from './order-by.pipe';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import get from 'lodash.get';

const SUBSCRIBED_SHOWS_LS_KEY = 'subscribedShows';

@Component({
  selector: 'mwl-show-list',
  template: `
    <table class="table" [hidden]="!shows || shows.length === 0">
      <thead>
        <tr>
          <th colspan="6">
            <input 
              class="form-control" 
              type="search" 
              placeholder="Filter shows..." 
              [formControl]="searchTextControl">
          </th>
        </tr>
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
      <tfoot *ngIf="filteredShowsList.length === 0 && searchTextControl.value">
        <tr>
          <th colspan="6">
            <div class="alert alert-info">No shows were found for your search</div>
          </th>
        </tr>
      </tfoot>
    </table>
  `
})
export class ShowListComponent implements OnChanges, OnDestroy, OnInit {
  @Input() shows: Show[];

  @Output() unsubscribe = new EventEmitter<Show>();

  filteredShowsList: Show[] = [];

  sort: SortableHeader = {
    field: null,
    direction: OrderByDirection.Asc
  };

  searchTextControl = new FormControl('');

  destroy$ = new Subject();

  constructor(private localStorage: LocalStorage) {}

  ngOnInit() {
    this.searchTextControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateFilteredShowsList());
  }

  ngOnChanges(changeRecord: SimpleChanges): void {
    if (changeRecord.shows && this.shows) {
      this.updateFilteredShowsList();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
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

    const filterByFields = ['name', 'network.name', 'summary'];

    this.filteredShowsList = this.shows
      .map(show => {
        const isSubscribed = subscribedShows.some(
          iShow => iShow.id === show.id
        );
        return { ...show, isSubscribed };
      })
      .filter(show => {
        if (!this.searchTextControl.value) {
          return true;
        } else {
          return filterByFields.some(field => {
            const fieldValue = get(show, field);
            return (
              fieldValue &&
              fieldValue
                .toLowerCase()
                .includes(this.searchTextControl.value.toLowerCase())
            );
          });
        }
      });
  }
}
