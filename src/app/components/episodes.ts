import {Component} from 'angular2/core';
import {RouteParams, OnActivate} from 'angular2/router';
import {COMMON_DIRECTIVES} from 'angular2/common';
import {Observable} from 'rxjs/Observable';
import {SortableHeader} from './sortableHeader';
import {TVMaze} from './../services/tvMaze';
import {ToDate} from './../pipes/toDate';
import {OrderBy} from './../pipes/orderBy';

@Component({
  selector: 'episodes',
  template: `
    <h1>View episodes</h1>
    <table class="table">
      <thead>
        <tr>
          <th sortable-header fieldName="name" [sort]="sort">Name</th>
          <th sortable-header fieldName="season" [sort]="sort">Season</th>
          <th sortable-header fieldName="number" [sort]="sort">Number</th>
          <th>Air date</th>
          <th>Runtime</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="#episode of episodes | async | orderBy:sort.field:sort.desc">
          <td>{{ episode.name }}</td>
          <td>{{ episode.season }}</td>
          <td>{{ episode.number }}</td>
          <td>{{ episode.airstamp | toDate | date:'fullDate' }}</td>
          <td>{{ episode.runtime }}</td>
          <td [innerHtml]="episode.summary"></td>
        </tr>
      </tbody>
    </table>
  `,
  providers: [TVMaze],
  pipes: [[ToDate, OrderBy]],
  directives: [COMMON_DIRECTIVES, [SortableHeader]]
})
export class Episodes {

  public episodes:Observable<Object[]>;
  public sort:{field: string, desc: boolean} = {field: null, desc: false};

  constructor(routeParams:RouteParams, tvMaze:TVMaze) {
    this.episodes = tvMaze.getEpisodes(+routeParams.get('id'));
  }

}