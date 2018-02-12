import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { CachedHttp } from 'angular-async-cache';
import { Show, Episode } from '../../interfaces';

@Injectable()
export class TVMaze {
  static BASE_URL = 'https://api.tvmaze.com/';

  constructor(private http: CachedHttp) {}

  search(query: string): Observable<Show[]> {
    return this.http
      .get(`${TVMaze.BASE_URL}search/shows`, {
        params: new HttpParams().set('q', query)
      })
      .pipe(
        map((shows: Array<{ show: Show }>) =>
          shows.map((show: { show: Show }) => show.show)
        )
      );
  }

  getEpisodes(id: number): Observable<Episode[]> {
    return this.http.get(`${TVMaze.BASE_URL}shows/${id}/episodes`);
  }
}
