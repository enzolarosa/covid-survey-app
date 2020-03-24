import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  liveDataUrl = environment.apiUrl + '/italy/stats/province';

  constructor(private httpClient : HttpClient) {
  }

  private getHeaders() {
    return new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
  }

  getLiveData() {
    return this.httpClient.get(this.liveDataUrl, {
      headers: this.getHeaders()
    }).pipe(map(response => {
      let data = response;

      console.log(response)

      return data;
    }));
  }
}
