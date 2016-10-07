import 'bootstrap/scss/bootstrap.scss';
import 'angular2-calendar/scss/angular2-calendar.scss';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ConfirmModule} from 'angular2-bootstrap-confirm';
import {CalendarModule} from 'angular2-calendar';
import {
  Episodes,
  Navbar,
  SearchBox,
  SearchShows,
  ShowList,
  SortableHeader,
  SubscribedShows,
  ScheduleCalendar
} from './components/components';
import {OrderBy} from './pipes/pipes';
import {LocalStorage, TVMaze} from './providers/providers';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    Episodes,
    Navbar,
    SearchBox,
    SearchShows,
    ShowList,
    SortableHeader,
    SubscribedShows,
    OrderBy,
    ScheduleCalendar
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    ConfirmModule,
    CalendarModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: SubscribedShows},
      {path: 'episodes/:id', component: Episodes},
      {path: 'add', component: SearchShows},
      {path: 'schedule', component: ScheduleCalendar},
      {path: '**', redirectTo: ''}
    ], {useHash: true})
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    LocalStorage,
    TVMaze
  ]
})
export class AppModule {}