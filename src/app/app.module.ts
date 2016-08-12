import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ConfirmModule} from 'angular2-bootstrap-confirm';
import * as components from './components/components';
import * as pipes from './pipes/pipes';
import * as providers from './providers/providers';
import {AppComponent} from './app.component';
import {routing} from './app.routes';

const getObjectValues: Function = (obj: Object) => Object.keys(obj).map(key => obj[key]);

@NgModule({
  declarations: [
    AppComponent,
    ...getObjectValues(components),
    ...getObjectValues(pipes)
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
    ...getObjectValues(providers)
  ]
})
export class AppModule {}