import {Component} from 'angular2/core';

@Component({
  selector: 'search-box',
  template: `
    <div class="input-group">
      <input type="search" class="form-control" #searchInput (keyup)="searchText = searchInput.value">
      <span class="input-group-btn">
        <button class="btn btn-primary" type="submit">Search</button>
      </span>
    </div>
  `
})
export class SearchBox {

  public searchText:string;

}