import {Component} from 'angular2/core';
import {TVMaze} from './../services/tvMaze';
import {SearchBox} from './searchBox';
import {ShowList} from './showList';

@Component({
  selector: 'tv-tracker',
  directives: [SearchBox, ShowList],
  providers: [TVMaze],
  template: `
    <h1>Search for a show</h1>
    <form (submit)="searchShows(searchBox.searchText)">
      <search-box #searchBox></search-box>
    </form>
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

  public shows:Array<Object>;
  public error:string;

  constructor(private tvMaze:TVMaze) {}

  resetSearch() {
    this.error = null;
    this.shows = null;
  }

  searchShows(text:string) {

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