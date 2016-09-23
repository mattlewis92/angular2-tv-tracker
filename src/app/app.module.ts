import 'angular2-calendar/dist/css/angular2-calendar.css';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ConfirmModule} from 'angular2-bootstrap-confirm';
import {CalendarModule, CalendarEventTitle, CalendarDateFormatter} from 'angular2-calendar';
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
import {routing} from './app.routes';

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
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    ConfirmModule,
    CalendarModule,
    routing
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    LocalStorage,
    TVMaze,
    CalendarEventTitle,
    CalendarDateFormatter
  ]
})
export class AppModule {}