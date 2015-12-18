import {Component} from 'angular2/core';
import {TVSearch} from './../services/TVSearch';
import {SearchBox} from './searchBox';
import {ShowList} from './showList';

@Component({
  selector: 'tv-tracker',
  directives: [SearchBox, ShowList],
  template: `
    <h1>TV tracker</h1>
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
export class TVTracker {

  public shows:Array<Object>;

  public error:string;

  constructor(private tvSearch:TVSearch) {}

  searchShows(text:string) {

    this.error = null;
    this.shows = null;

    this
      .tvSearch
      .search(text)
      .subscribe(
        data => this.shows = data,
        err => this.error = err
      );

  }

}