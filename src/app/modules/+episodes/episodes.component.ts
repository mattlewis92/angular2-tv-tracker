import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { TVMaze } from './../shared/tv-maze.provider';
import { Episode } from '../../interfaces';

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
        <tr *ngFor="let episode of episodes | async | mwlOrderBy:sort.field:sort.desc">
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
  public sort: {field: string | null, desc: boolean} = {field: null, desc: false};

  constructor(private route: ActivatedRoute, private tvMaze: TVMaze) {}

  ngOnInit(): void {
    this.episodes = this.route.params
      .map((params: any) => +params.id)
      .flatMap((id: number) => this.tvMaze.getEpisodes(id));
  }

}