import {Component} from '@angular/core';

@Component({
  selector: 'loading-spinner',
  template: `
    <div class="loading">
      <h1 class="text-xs-center">
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
export class LoadingSpinner {}