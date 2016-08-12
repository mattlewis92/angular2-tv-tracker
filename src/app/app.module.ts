import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ConfirmModule} from 'angular2-bootstrap-confirm';
import {Episodes, Navbar, SearchBox, SearchShows, ShowList, SortableHeader, SubscribedShows} from './components/components';
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
    OrderBy
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    ConfirmModule,
    routing
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