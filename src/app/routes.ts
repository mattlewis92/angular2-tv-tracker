import {provideRouter, RouterConfig} from '@angular/router';
import {SubscribedShows} from './components/subscribedShows';
import {Episodes} from './components/episodes';
import {SearchShows} from './components/searchShows';

export const appRoutes: RouterConfig = [
  {path: '', component: SubscribedShows, terminal: true},
  {path: 'episodes/:id', component: Episodes},
  {path: 'add', component: SearchShows}
];

export const APP_ROUTER_PROVIDER: any = provideRouter(appRoutes);