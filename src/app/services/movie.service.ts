import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode',
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  url = 'http://www.omdbapi.com/';
  apiKey = '2be398c0';

  constructor(private http: HttpClient) {}

  searchData(title: string, type: SearchType): Observable<any> {
    return this.http
      .get(
        `${this.url}?s${encodeURI(title)}$type=${type}&apukey=${this.apiKey}`
      )
      .pipe(
        map(results => {
          console.log('RAW: ', results);
          return results['Search'];
        })
      );
  }

  getDetails(id) {
    this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  }
}
