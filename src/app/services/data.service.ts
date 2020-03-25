import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from "rxjs/operators";
import {Region} from '../models/region';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  liveDataUrl = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json'; // environment.apiUrl + '/italy/stats/province';
  infoFromNMEAUrl = 'https://nominatim.openstreetmap.org';

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

      return response;
    }));
  }

  getInfoFromNMEA(latitude: number, longitude: number) {
    return this.httpClient.get(this.infoFromNMEAUrl + '/reverse?format=xml&lat=' + latitude + '&lon=' + longitude + '&zoom=18&addressdetails=1',
        { responseType: 'text' })
      .pipe(map(response => {

        return response;
      }));
  }
}
