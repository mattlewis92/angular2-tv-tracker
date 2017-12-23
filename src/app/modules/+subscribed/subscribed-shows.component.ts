import { Component } from '@angular/core';
import { LocalStorage } from './../shared/local-storage.provider';
import { Show } from '../../interfaces';

@Component({
  template: `
    <h1>Subscribed shows</h1>
    <mwl-show-list [shows]="subscribedShows" (unsubscribe)="unsubscribe($event)"></mwl-show-list>
    <div
      class="alert alert-warning"
      [hidden]="subscribedShows.length > 0">
      You haven't yet subscribed to any shows. <a [routerLink]="['/search']">Add some now.</a>
    </div>
  `
})
export class SubscribedShowsComponent {
  public subscribedShows: Show[];

  constructor(private localStorage: LocalStorage) {
    this.subscribedShows = localStorage.getItem('subscribedShows', []);
  }

  unsubscribe(show: Show): void {
    this.subscribedShows = this.subscribedShows.filter(
      (subscribedShow: Show) => subscribedShow.id !== show.id
    );
  }
}
