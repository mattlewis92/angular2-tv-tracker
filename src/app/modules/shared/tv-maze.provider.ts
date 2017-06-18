import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CachedHttp } from 'angular-async-cache';
import { Show, Episode } from '../../interfaces';

@Injectable()
export class TVMaze {

  static BASE_URL = 'https://api.tvmaze.com/';

  constructor(private http: CachedHttp) {}

  search(query: string): Observable<Show[]> {

    const search: URLSearchParams = new URLSearchParams();
    search.set('q', query);

    return this.http
      .get(`${TVMaze.BASE_URL}search/shows`, {search})
      .map((shows: Array<{show: Show}>) => shows.map((show: {show: Show}) => show.show));
  }

  getEpisodes(id: number): Observable<Episode[]> {
    return this.http.get(`${TVMaze.BASE_URL}shows/${id}/episodes`);
  }

}