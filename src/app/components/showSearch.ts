import {Component} from 'angular2/core';
import {FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES} from 'angular2/common';
import {TVMaze} from './../services/tvMaze';
import {ShowList} from './showList';

@Component({
  selector: 'tv-tracker',
  directives: [[ShowList], FORM_DIRECTIVES], // make webstorm happy
  providers: [TVMaze],
  template: `
    <h1>Search for a show</h1>
    <form (submit)="$event.preventDefault(); searchShows(searchForm.value.query)" [ngFormModel]="searchForm">
      <div class="input-group">
        <input type="search" class="form-control" ngControl="query">
        <span class="input-group-btn">
          <button
            class="btn btn-primary"
            type="submit"
            [disabled]="!searchForm.valid">
            Search
           </button>
        </span>
      </div>
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

  public shows: Array<Object>;
  public error: string;
  private searchForm: ControlGroup;

  constructor(private tvMaze: TVMaze, fb: FormBuilder) {
    this.searchForm = fb.group({
      query: ['', Validators.required]
    });
  }

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