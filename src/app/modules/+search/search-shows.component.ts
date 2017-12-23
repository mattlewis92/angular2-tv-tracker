import { Component } from '@angular/core';
import { TVMaze } from './../shared/tv-maze.provider';
import { Show } from '../../interfaces';

@Component({
  template: `
    <div class="row">
      <h1 class="col-md-6">Add a show</h1>
      <mwl-search-box class="col-md-6" (runSearch)="searchShows($event)"></mwl-search-box>
    </div>
    <br>
    <mwl-show-list [shows]="shows"></mwl-show-list>
    <div
      class="alert alert-danger"
      [hidden]="!error && (!shows || shows.length > 0)">
      No TV shows found with this name
    </div>
  `
})
export class SearchShowsComponent {
  public shows: Show[] | null;
  public error: string | null;

  constructor(private tvMaze: TVMaze) {}

  resetSearch(): void {
    this.error = null;
    this.shows = null;
  }

  searchShows(text: string): void {
    this.resetSearch();

    this.tvMaze
      .search(text)
      .subscribe(
        (data: Show[]) => (this.shows = data),
        (err: string) => (this.error = err)
      );
  }
}
