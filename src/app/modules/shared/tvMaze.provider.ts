import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AsyncCache } from 'angular-async-cache';
import { Show, Episode } from '../../interfaces';

@Injectable()
export class TVMaze {

  static BASE_URL: string = 'http://api.tvmaze.com/';

  constructor(private http: Http, private asyncCache: AsyncCache) {}

  search(query: string): Observable<Show[]> {

    const endpoint: string = `${TVMaze.BASE_URL}search/shows?q=${query}`;

    const shows$: Observable<Show[]> = this.http
      .get(endpoint)
      .map((res: any) => res.json())
      .map((shows: Array<{show: Show}>) => shows.map((show: {show: Show}) => show.show));

    return this.asyncCache.wrap(shows$, endpoint);
  }

  getEpisodes(id: number): Observable<Episode[]> {
    const endpoint: string = `${TVMaze.BASE_URL}shows/${id}/episodes`;
    const episodes$: Observable<Episode[]> = this.http.get(endpoint).map((res: any) => res.json());
    return this.asyncCache.wrap(episodes$, endpoint);
  }

}