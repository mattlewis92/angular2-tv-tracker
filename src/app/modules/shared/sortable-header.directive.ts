import { Component, Input } from '@angular/core';

@Component({
  selector: 'th[mwlSortableHeader]', // tslint:disable-line
  template: `
    <div (click)="headerClicked()">
      <i class="fa fa-sort" [hidden]="sort.field === fieldName"></i>
      <i class="fa fa-sort-asc" [hidden]="sort.field !== fieldName || sort.desc"></i>
      <i class="fa fa-sort-desc" [hidden]="sort.field !== fieldName || !sort.desc"></i>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    div {
      cursor: pointer;
      width: 80px;
    }
  `]
})
export class SortableHeaderComponent {

  @Input('mwlSortableHeader') fieldName: string; // tslint:disable-line
  @Input() sort: {field: string | null, desc: boolean};

  headerClicked(): void {
    if (this.sort.field === this.fieldName) {
      if (this.sort.desc === true) {
        this.sort.desc = false;
        this.sort.field = null;
      } else {
        this.sort.desc = true;
      }
    } else {
      this.sort.field = this.fieldName;
      this.sort.desc = false;
    }
  }

}