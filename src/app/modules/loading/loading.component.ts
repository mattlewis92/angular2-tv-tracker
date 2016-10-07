import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  template: '<loading-spinner></loading-spinner>'
})
export class Loading {

  constructor(private router: Router) {
    this.router.navigate(['subscribed']);
  }

}