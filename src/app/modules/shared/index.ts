import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { AsyncCacheModule, LocalStorageDriver, AsyncCacheOptions } from 'angular-async-cache';
import { OrderBy } from './orderBy.pipe';
import { SortableHeaderComponent } from './sortableHeader.directive';
import { LocalStorage } from './localStorage.provider';
import { TVMaze } from './tvMaze.provider';
import { ShowListComponent } from './showList.component';

export function asyncCacheOptionsFactory(): AsyncCacheOptions {
  return new AsyncCacheOptions({
    driver: new LocalStorageDriver(),
    fromCacheAndReplay: true
  });
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
      cancelButtonType: 'secondary'
    }),
    HttpModule,
    AsyncCacheModule.forRoot({
      provide: AsyncCacheOptions,
      useFactory: asyncCacheOptionsFactory
    })
  ],
  declarations: [
    OrderBy,
    SortableHeaderComponent,
    ShowListComponent
  ],
  exports: [
    OrderBy,
    SortableHeaderComponent,
    ShowListComponent,
    CommonModule
  ],
  providers: [ // if these held any state they should be instantiated by the root module
    LocalStorage,
    TVMaze
  ]
})
export class SharedModule {}