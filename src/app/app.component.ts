import { Component } from '@angular/core';
import { Router, NavigationStart, RoutesRecognized } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'mwl-loading-spinner',
  template: `
    <div class="loading">
      <h1 class="text-center">
        <i class="fa fa-spin fa-spinner"></i>
      </h1>
    </div>
  `,
  styles: [`
    .loading {
      height: calc(100vh - 70px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .loading i {
      font-size: 80px;
    }
  `]
})
export class LoadingSpinnerComponent {}

@Component({ // tslint:disable-line
  selector: 'mwl-app',
  template: `
    <nav class="navbar navbar-toggleable-md fixed-top navbar-light bg-faded">
      <div class="container">
        <a href="/" class="navbar-brand">Angular 2+ TV tracker</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav">
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
      </div>
    </nav>
    <div class="container content">
      <mwl-loading-spinner *ngIf="loading"></mwl-loading-spinner>
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

  loading = true;

  constructor(router: Router) {
    router.events.map((event: any) => {
      return !!(event instanceof NavigationStart || event instanceof RoutesRecognized);
    }).subscribe((isRouteLoading: boolean) => {
      this.loading = isRouteLoading;
    });
  }

}