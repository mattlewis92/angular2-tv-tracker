import {Component, Output, EventEmitter} from 'angular2/core';
import {FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'search-box',
  directives: [FORM_DIRECTIVES],
  template: `
    <form (submit)="$event.preventDefault(); runSearch.emit(searchForm.value.query)" [ngFormModel]="searchForm">
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
  `
})
export class SearchBox {

  @Output() runSearch: EventEmitter<any> = new EventEmitter();

  private searchForm: ControlGroup;

  constructor(fb: FormBuilder) {
    this.searchForm = fb.group({
      query: ['', Validators.required]
    });
  }

}