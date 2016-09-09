/// <reference types="core-js" />
/// <reference path="./customTypings.d.ts" />

import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'rxjs/Observable';
import 'bootstrap/scss/bootstrap.scss';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';

declare var ENV: string;
if (ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);