import {Component} from '@angular/core';

@Component({
  selector: 'navbar',
  template: `
    <nav class="navbar navbar-fixed-top navbar-light bg-faded">
      <div class="container">
        <h1 class="navbar-brand">Angular 2 TV tracker</h1>
        <ul class="nav navbar-nav">
          <li class="nav-item" routerLinkActive="active">
            <a class="nav-link" [routerLink]="['/subscribed']">Subscribed shows</a>
          </li>
          <li class="nav-item" routerLinkActive="active">
            <a class="nav-link" [routerLink]="['/schedule']">Schedule</a>
          </li>
          <li class="nav-item" routerLinkActive="active">
            <a class="nav-link" [routerLink]="['/add']">Add shows</a>
          </li>
        </ul>
      </div>
    </nav>
  `
})
export class Navbar {}