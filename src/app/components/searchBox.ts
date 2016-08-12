import {Component, Output, EventEmitter} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'search-box',
  template: `
    <form (submit)="$event.preventDefault(); runSearch.emit(searchForm.value.query)" [formGroup]="searchForm">
      <div class="input-group">
        <input type="search" class="form-control" formControlName="query">
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

  private searchForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.searchForm = fb.group({
      query: ['', Validators.required]
    });
  }

}