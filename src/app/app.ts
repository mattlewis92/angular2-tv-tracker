import {Component} from 'angular2/core';
import {ShowSearch} from './components/showSearch';
import {ROUTER_DIRECTIVES, RouteConfig, Route} from 'angular2/router';

@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div class="container">
      <br>
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `
})
@RouteConfig([
  new Route({path: '/', component: ShowSearch, name: 'Home'})
])
export class AppComponent {}