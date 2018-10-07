import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';

const API_BASE = 'https://api.aladhan.com/v1/timings/{{TIMESTAMP}}?latitude={{LATITUDE}}&longitude={{LONGITUDE}}&method={{METHOD}}';
const TIMESTAMP = '{{TIMESTAMP}}';
const LATITUDE = '{{LATITUDE}}';
const LONGITUDE = '{{LONGITUDE}}';
const METHOD = '{{METHOD}}';

@Injectable({
  providedIn: 'root'
})
export class PrayerTimesService {

  private method = 2;

  constructor(private http: HttpClient, protected localStorage: LocalStorage) { }

  get() {
    return from(this.getMethod())
    .pipe(switchMap(
      () => this.getUrl(this.method)
      .pipe(
        switchMap(_ => this.http.get<any>(_)), catchError(_ => of({})))
        )
);
  }

  async getMethod() {
    return (await this.localStorage.getItem('method').toPromise()) || this.method;
  }

  setMethod(method: number) {
    this.method = method;
    this.localStorage.setItem('method', this.method).subscribe(() => {});
  }

  private getUrl(method: number) {
    return new Observable<string>(function (observer) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const d = '' + Math.floor((+ new Date()) / 1000);
          const url: string = API_BASE.replace(TIMESTAMP, d)
            .replace(LONGITUDE, '' + position.coords.longitude)
            .replace(LATITUDE, '' + position.coords.latitude)
            .replace(METHOD, '' + method);
          observer.next(url);
        });
      }
    });
  }
}
