import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  template: `
    <div class="text-xs-center">
      <h1>Loading...</h1>
    </div>
  `
})
export class Loading {

  constructor(private router: Router) {
    this.router.navigate(['subscribed']);
  }

}