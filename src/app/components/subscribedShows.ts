import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {LocalStorage} from '../services/localStorage';
import {ShowList} from './showList';

@Component({
  selector: 'subscribed-shows',
  template: `
    <h1>Subscribed shows</h1>
    <show-list [shows]="subscribedShows"></show-list>
    <div
      class="alert alert-warning"
      [hidden]="subscribedShows.length > 0">
      You haven't yet subscribed to any shows. <a [routerLink]="['/Search']">Add some now.</a>
    </div>
  `,
  providers: [LocalStorage],
  directives: [[ShowList], ROUTER_DIRECTIVES]
})
export class SubscribedShows {

  public subscribedShows: Array<{id: number}>;

  constructor(private localStorage: LocalStorage) {
    this.subscribedShows = localStorage.getItem('subscribedShows', []);
  }

}