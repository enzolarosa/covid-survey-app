import { Component, OnInit, AfterViewInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {Region} from '../../models/region';
import xml2js from 'xml2js';
import {TextPosition} from '../../models/TextPosition';

@Component({
  selector: 'app-live-data',
  templateUrl: './live-data.component.html',
  styleUrls: ['./live-data.component.scss']
})
export class LiveDataComponent implements OnInit, AfterViewInit {
  filter = 0;
  filterText = 'in Italia';
  lastUpdateData = '';
  regions: Region[] = [];
  data: Region[] = [];
  longitude: number = 0;
  latitude: number = 0;
  textPosition: TextPosition = null;
  regionText = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    this.collapseNavigationMenu();
  }

  private collapseNavigationMenu() {
    let e = document.getElementById('navbarSupportedContent');
    if (e != undefined) {
      e.classList.remove('show');
    }
  }

  private getData() {
    this.getPosition().then(() => {
      this.getLiveData();
    });
  }

  selected(value: number, force: boolean = false) {
    if (this.filter != value || force) {
      this.filter = value;

      if (this.filter == 0) {
        this.filterText = 'in Italia';
        this.data = this.regions;
      }
      else {
        this.filterText = 'nella tua regione (' + this.regionText + ')';
        this.data = this.regions.filter(d => d.denominazione_regione == this.regionText);
      }
    }
}

  getLiveData() {
    this.dataService.getLiveData().subscribe(
        (data: Region[]) => {
          this.regions = data;
          this.lastUpdateData = '';

          if (this.regions.length > 0) {
            this.lastUpdateData = this.regions[0].data;
          }

          this.selected(this.filter, true);
        },
        error => {
          console.log('Error', error.error);
        });
  }

  getPosition() {
    return new Promise((resolve: any) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;

          this.getRegion().then((v: boolean) => {
            resolve(v);
          }) ;
        });
      } else {
        console.log("No support for geolocation")
        this.longitude = 0;
        this.latitude = 0;
        this.regionText = '';

        resolve(false);
      }
    });
  }

  getRegion() {
    return new Promise((resolve: any) => {
      this.dataService.getInfoFromNMEA(this.latitude, this.longitude).subscribe(
          (data: any) => {
            let t = this;
            xml2js.parseString(data, function (err, result) {
              let v = result.reversegeocode.addressparts[0];
              t.textPosition = new class implements TextPosition {
                road: string = v.road;
                city: string = v.city;
                country: string = v.country;
                countryCode: string = v.country_code;
                county: string = v.county;
                hamlet: string = v.hamlet;
                postalCode: string = v.postcode;
                state: string = v.state;
              };

              t.regionText = t.textPosition.state;

              console.log(t.textPosition);
              resolve(true);
            });

          },
          error => {
            console.log('Error', error.error);
            resolve(false);
          });
    });
  }

  // getRegione(latitude, longitude) {
  //   let options = {
  //     host: 'nominatim.openstreetmap.org',
  //     path: '/reverse?format=xml&lat=' + latitude + '&lon=' + longitude + '&zoom=18&addressdetails=1',
  //     method: 'GET',
  //     headers: {
  //       referer: '(add a referer here)',
  //       'user-agent': '(add a user agent here)'
  //     }
  //   };
  //
  //   let g = https.get(
  //       options,
  //       response => {
  //         var body = '';
  //         response.on('data', function(d) {
  //           body += d;
  //         });
  //         response.on('end', function() {
  //           // Data reception is done, do whatever with it!
  //           const result1 = convert.xml2json(body, { compact: true, spaces: 4 });
  //           const geo = JSON.parse(result1);
  //           if (geo.reversegeocode.addressparts.town) {
  //             callback(geo.reversegeocode.addressparts.town._text);
  //           } else if (geo.reversegeocode.addressparts.city) {
  //             callback(geo.reversegeocode.addressparts.city._text);
  //           } else if (geo.reversegeocode.addressparts.village) {
  //             callback(geo.reversegeocode.addressparts.village._text);
  //           } else if (geo.reversegeocode.addressparts.hamlet) {
  //             callback(geo.reversegeocode.addressparts.hamlet._text);
  //           } else {
  //             console.log("An error occurred - couldn't find the address of the GPS coordinates");
  //             console.log(geo.reversegeocode.addressparts);
  //           }
  //         });
  //       }
  //   );
  //
  //   g.end();
  // }
}
