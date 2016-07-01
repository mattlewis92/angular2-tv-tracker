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
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {AppComponent} from './app/app';
import * as providers from './app/providers/providers';
import {APP_ROUTER_PROVIDER} from './app/routes';

declare var ENV: string;
if (ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [
  ...HTTP_PROVIDERS,
  APP_ROUTER_PROVIDER,
  disableDeprecatedForms(),
  provideForms(),
  ...Object.keys(providers).map((key: string) => providers[key])
]);