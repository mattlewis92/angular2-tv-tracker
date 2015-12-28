import {Component} from 'angular2/core';
import {TVMaze} from './../providers/providers';
import {ShowList, SearchBox} from './components';
import {Show} from '../interfaces/interfaces';

@Component({
  selector: 'search-shows',
  directives: [[ShowList, SearchBox]], // make webstorm happy
  providers: [TVMaze],
  template: `
    <div class="row">
      <h1 class="col-md-6">Add a show</h1>
      <search-box class="col-md-6" (runSearch)="searchShows($event)"></search-box>
    </div>
    <br>
    <show-list [shows]="shows"></show-list>
    <div
      class="alert alert-danger"
      [hidden]="!error && (!shows || shows.length > 0)">
      No TV shows found with this name
    </div>
  `
})
export class SearchShows {

  public shows: Show[];
  public error: string;

  constructor(private tvMaze: TVMaze) {}

  resetSearch(): void {
    this.error = null;
    this.shows = null;
  }

  searchShows(text: string): void {

    this.resetSearch();

    this
      .tvMaze
      .search(text)
      .subscribe(
        (data: Show[]) => this.shows = data,
        (err: string) => this.error = err
      );

  }

}