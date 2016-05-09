import {Injectable} from '@angular/core';
import {Http, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Show} from '../interfaces/interfaces';

@Injectable()
export class TVMaze {

  static BASE_URL: string = 'http://api.tvmaze.com/';

  constructor(private http: Http) {}

  search(query: string): Observable<any> {

    const search: URLSearchParams = new URLSearchParams();
    search.set('q', query);

    return this.http
      .get(`${TVMaze.BASE_URL}search/shows`, new RequestOptions({search}))
      .map((res: any) => res.json())
      .map((shows: Array<{show: Show}>) => shows.map((show: {show: Show}) => show.show));
  }

  getEpisodes(id: number): Observable<any> {
    return this.http.get(`${TVMaze.BASE_URL}shows/${id}/episodes`).map((res: any) => res.json());
  }

}