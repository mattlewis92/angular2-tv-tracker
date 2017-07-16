import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { AsyncCacheModule, LocalStorageDriver, AsyncCacheOptions } from 'angular-async-cache';
import { OrderBy } from './order-by.pipe';
import { Replace } from './replace.pipe';
import { SortableHeaderComponent } from './sortable-header.directive';
import { LocalStorage } from './local-storage.provider';
import { TVMaze } from './tv-maze.provider';
import { ShowListComponent } from './show-list.component';

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
    HttpClientModule,
    AsyncCacheModule.forRoot({
      provide: AsyncCacheOptions,
      useFactory: asyncCacheOptionsFactory
    })
  ],
  declarations: [
    OrderBy,
    Replace,
    SortableHeaderComponent,
    ShowListComponent
  ],
  exports: [
    OrderBy,
    Replace,
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