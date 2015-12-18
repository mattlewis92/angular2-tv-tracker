import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone-microtask';
import 'zone.js/dist/long-stack-trace-zone';
import 'rxjs';
import 'bootstrap/scss/bootstrap.scss';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {AppComponent} from './app/app';

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);