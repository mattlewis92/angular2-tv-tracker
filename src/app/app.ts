import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouteConfig, Route} from '@angular/router-deprecated';
import {SearchShows} from './components/searchShows';
import {Episodes} from './components/episodes';
import {SubscribedShows} from './components/subscribedShows';
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
@RouteConfig([
  new Route({path: '/add', component: SearchShows, name: 'Search'}),
  new Route({path: '/episodes/:id', component: Episodes, name: 'Episodes'}),
  new Route({path: '/', component: SubscribedShows, name: 'Subscribed'})
])
export class AppComponent {}