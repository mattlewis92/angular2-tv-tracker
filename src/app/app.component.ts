import {Component} from '@angular/core';

@Component({
  selector: 'app',
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