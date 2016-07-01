import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'navbar',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <nav class="navbar navbar-fixed-top navbar-light bg-faded">
      <div class="container">
        <h1 class="navbar-brand">Angular 2 TV tracker</h1>
        <ul class="nav navbar-nav">
          <li class="nav-item" [class.active]="location.path() === ''">
            <a class="nav-link" [routerLink]="['/']">Subscribed shows</a>
          </li>
          <li class="nav-item" [class.active]="location.path() === '/add'">
            <a class="nav-link" [routerLink]="['/add']">Add shows</a>
          </li>
        </ul>
      </div>
    </nav>
  `
})
export class Navbar {
  constructor(public location: Location) {}
}