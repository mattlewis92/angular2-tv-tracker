import {Injectable} from 'angular2/core';
import {Http, RequestOptions, URLSearchParams} from 'angular2/http';

@Injectable()
export class TVMaze {

  static BASE_URL = 'http://api.tvmaze.com/';

  constructor(private http: Http) {}

  search(query: string) {

    const search = new URLSearchParams();
    search.set('q', query);

    return this.http
      .get(`${TVMaze.BASE_URL}search/shows`, new RequestOptions({search}))
      .map(res => res.json())
      .map(shows => shows.map((show: {show: Object}) => show.show));
  }

  getEpisodes(id: number) {
    return this.http.get(`${TVMaze.BASE_URL}shows/${id}/episodes`).map(res => res.json());
  }

}