/// <reference path="../typings/tsd.d.ts" />

import 'es6-shim';
import 'es7-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'rxjs';
import 'bootstrap/scss/bootstrap.scss';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AppComponent} from './app/app';
import * as providers from './app/providers/providers';

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, Object.values(providers)]);