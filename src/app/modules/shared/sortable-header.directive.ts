import { Component, Input } from '@angular/core';
import { OrderByDirection } from './order-by.pipe';

export interface SortableHeader {
  field: string | null;
  direction: OrderByDirection;
}

@Component({
  selector: 'th[mwlSortableHeader]', // tslint:disable-line
  template: `
    <div (click)="headerClicked()">
      <i class="fa fa-sort" [hidden]="sort.field === fieldName"></i>
      <i class="fa fa-sort-asc" [hidden]="sort.field !== fieldName || sort.direction === OrderByDirection.Desc"></i>
      <i class="fa fa-sort-desc" [hidden]="sort.field !== fieldName || sort.direction === OrderByDirection.Asc"></i>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
    div {
      cursor: pointer;
      width: 80px;
    }
  `
  ]
})
export class SortableHeaderComponent {
  @Input('mwlSortableHeader') fieldName: string; // tslint:disable-line

  @Input() sort: SortableHeader;

  OrderByDirection = OrderByDirection;

  headerClicked(): void {
    if (this.sort.field === this.fieldName) {
      if (this.sort.direction === OrderByDirection.Desc) {
        this.sort.direction = OrderByDirection.Asc;
        this.sort.field = null;
      } else {
        this.sort.direction = OrderByDirection.Desc;
      }
    } else {
      this.sort.field = this.fieldName;
      this.sort.direction = OrderByDirection.Asc;
    }
  }
}
