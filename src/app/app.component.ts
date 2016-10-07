import {Component} from '@angular/core';
import {Router, NavigationStart, RoutesRecognized} from '@angular/router';

@Component({
  selector: 'app',
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
            <a class="nav-link" [routerLink]="['/search']">Add shows</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container content">
      <loading-spinner *ngIf="loading"></loading-spinner>
      <router-outlet [hidden]="loading"></router-outlet>
    </div>
  `,
  styles: [`
    .container.content {
      padding-top: 70px;
    }
  `]
})
export class AppComponent {

  loading: boolean = true;

  constructor(router: Router) {
    router.events.subscribe((event: any) => {
      this.loading = !!(event instanceof NavigationStart || event instanceof RoutesRecognized);
    });
  }

}