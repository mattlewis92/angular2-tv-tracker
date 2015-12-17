import {Component} from 'angular2/core';
import {TVTracker} from './components/tvTracker';

@Component({
  selector: 'app',
  directives: [TVTracker],
  template: `
    <div class="container">
      <br>
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <tv-tracker></tv-tracker>
        </div>
      </div>
    </div>
  `
})
export class AppComponent {}