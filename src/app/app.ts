import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Navbar} from './components/navbar';

@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES, Navbar],
  template: `
    <navbar></navbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container {
      padding-top: 70px;
    }
  `]
})
export class AppComponent {}