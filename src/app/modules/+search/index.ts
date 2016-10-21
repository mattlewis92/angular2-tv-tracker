import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchShowsComponent } from './searchShows.component';
import { SearchBoxComponent } from './searchBox.component';
import { SharedModule } from './../shared';

@NgModule({
  declarations: [
    SearchShowsComponent,
    SearchBoxComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: SearchShowsComponent}
    ]),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SearchModule {}