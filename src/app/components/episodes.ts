import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {COMMON_DIRECTIVES} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {SortableHeader} from './sortableHeader';
import {TVMaze} from './../providers/providers';
import {OrderBy} from './../pipes/pipes';
import {Episode} from '../interfaces/interfaces';

@Component({
  selector: 'episodes',
  template: `
    <h1>View episodes</h1>
    <table class="table">
      <thead>
        <tr>
          <th sortableHeader="name" [sort]="sort">Name</th>
          <th sortableHeader="season" [sort]="sort">Season</th>
          <th sortableHeader="number" [sort]="sort">Number</th>
          <th>Air date</th>
          <th>Runtime</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let episode of episodes | async | orderBy:sort.field:sort.desc">
          <td>{{ episode.name }}</td>
          <td>{{ episode.season }}</td>
          <td>{{ episode.number }}</td>
          <td>{{ episode.airstamp | date:'fullDate' }}</td>
          <td>{{ episode.runtime }}</td>
          <td [innerHtml]="episode.summary"></td>
        </tr>
      </tbody>
    </table>
  `,
  pipes: [OrderBy],
  directives: [COMMON_DIRECTIVES, SortableHeader]
})
export class Episodes implements OnInit {

  public episodes: Observable<Episode[]>;
  public sort: {field: string, desc: boolean} = {field: null, desc: false};

  constructor(private route: ActivatedRoute, private tvMaze: TVMaze) {}

  ngOnInit(): void {
    this.episodes = this.route.params
      .map((params: any) => +params.id)
      .flatMap((id: number) => this.tvMaze.getEpisodes(id));
  }

}