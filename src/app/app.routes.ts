import {RouterModule, Routes} from '@angular/router';
import {SubscribedShows} from './components/subscribedShows';
import {Episodes} from './components/episodes';
import {SearchShows} from './components/searchShows';
import {ModuleWithProviders} from '@angular/core';

export const appRoutes: Routes = [
  {path: '', component: SubscribedShows, terminal: true},
  {path: 'episodes/:id', component: Episodes},
  {path: 'add', component: SearchShows},
  {path: '**', redirectTo: ''}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);