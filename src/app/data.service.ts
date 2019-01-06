import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // test
  private _url = 'assets/notes.json';

  constructor(private http: HttpClient) { }

  fetchData() {
    console.log(this.http.get(this._url));
    return this.http.get(this._url);
  }
}
