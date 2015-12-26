import {Component} from 'angular2/core';
import {TVMaze} from './../services/tvMaze';
import {ShowList} from './showList';
import {SearchBox} from './searchBox';

@Component({
  selector: 'tv-tracker',
  directives: [[ShowList, SearchBox]], // make webstorm happy
  providers: [TVMaze],
  template: `
    <h1>Search for a show</h1>
    <search-box (runSearch)="searchShows($event)"></search-box>
    <br>
    <show-list [shows]="shows"></show-list>
    <div
      class="alert alert-danger"
      [hidden]="!error && (!shows || shows.length > 0)">
      No TV shows found with this name
    </div>
  `
})
export class ShowSearch {

  public shows: Array<Object>;
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
        data => this.shows = data,
        err => this.error = err
      );

  }

}