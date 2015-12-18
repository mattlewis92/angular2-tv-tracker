import {Component, Input} from 'angular2/core';
import {COMMON_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'show-list',
  directives: [COMMON_DIRECTIVES, ROUTER_DIRECTIVES],
  template: `
    <table class="table" [hidden]="!shows || shows.length === 0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Network</th>
          <th>Summary</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="#show of shows" [hidden]="!show.show?.image?.medium">
          <td>{{ show.show.name }}</td>
          <td>
            <img [src]="show.show?.image?.medium" width="60">
          </td>
          <td>{{ show.show?.network?.name }}</td>
          <td [innerHtml]="show.show.summary"></td>
          <td>
            <button class="btn btn-primary" [routerLink]="['/Episodes', {id: show.show.id}]">View</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class ShowList {

  @Input() shows:Array<Object>;

}