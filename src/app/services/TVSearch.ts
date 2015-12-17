import {Injectable} from 'angular2/core';
import {Http, RequestOptions, URLSearchParams} from 'angular2/http';

@Injectable()
export class TVSearch {

  static BASE_URL = 'http://api.tvmaze.com/';

  constructor(public http:Http) {}

  search(query:string) {

    const search = new URLSearchParams();
    search.set('q', query);

    return this.http
      .get(`${TVSearch.BASE_URL}search/shows`, new RequestOptions({search}))
      .map(res => res.json());
  }

}