import {Injectable} from 'angular2/core';
import {Http, RequestOptions, URLSearchParams} from 'angular2/http';

@Injectable()
export class TVMaze {

  static BASE_URL = 'http://api.tvmaze.com/';

  constructor(private http:Http) {}

  search(query:string) {

    const search = new URLSearchParams();
    search.set('q', query);

    return this.http
      .get(`${TVMaze.BASE_URL}search/shows`, new RequestOptions({search}))
      .map(res => res.json());
  }

}