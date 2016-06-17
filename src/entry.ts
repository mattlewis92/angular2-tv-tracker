/// <reference path="../typings/index.d.ts" />

import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'rxjs';
import 'bootstrap/scss/bootstrap.scss';
import {enableProdMode} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {AppComponent} from './app/app';
import * as providers from './app/providers/providers';

declare var ENV: string;
if (ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [
  ...HTTP_PROVIDERS,
  ...ROUTER_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  ...Object.keys(providers).map((key: string) => providers[key])
]);