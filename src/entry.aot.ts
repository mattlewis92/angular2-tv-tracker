/// <reference types="core-js" />
/// <reference path="./customTypings.d.ts" />

import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'rxjs/Observable';
import {enableProdMode} from '@angular/core';
import {platformBrowser} from '@angular/platform-browser';
import {AppModuleNgFactory} from './../aot/src/app/app.module.ngfactory';

declare var ENV: string;
if (ENV === 'production') {
  enableProdMode();
}

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);