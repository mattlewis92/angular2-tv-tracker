import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TVMaze } from './../shared/tv-maze.provider';
import { Episode } from '../../interfaces';
import { map, mergeMap } from 'rxjs/operators';
import { SortableHeader } from '../shared/sortable-header.directive';
import { OrderByDirection } from '../shared/order-by.pipe';

@Component({
  template: `
    <h1>View episodes</h1>
    <table class="table">
      <thead>
        <tr>
          <th mwlSortableHeader="name" [sort]="sort">Name</th>
          <th mwlSortableHeader="season" [sort]="sort">Season</th>
          <th mwlSortableHeader="number" [sort]="sort">Number</th>
          <th>Air date</th>
          <th>Runtime</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let episode of episodes | async | mwlOrderBy:sort.field:sort.direction">
          <td>{{ episode.name }}</td>
          <td>{{ episode.season }}</td>
          <td>{{ episode.number }}</td>
          <td>{{ episode.airstamp | date:'fullDate' }}</td>
          <td>{{ episode.runtime }}</td>
          <td [innerHtml]="episode.summary"></td>
        </tr>
      </tbody>
    </table>
  `
})
export class EpisodesComponent implements OnInit {
  public episodes: Observable<Episode[]>;

  public sort: SortableHeader = {
    field: null,
    direction: OrderByDirection.Asc
  };

  constructor(private route: ActivatedRoute, private tvMaze: TVMaze) {}

  ngOnInit(): void {
    this.episodes = this.route.params.pipe(
      map((params: any) => +params.id),
      mergeMap((id: number) => this.tvMaze.getEpisodes(id))
    );
  }
}
