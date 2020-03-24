import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-live-data',
  templateUrl: './live-data.component.html',
  styleUrls: ['./live-data.component.scss']
})
export class LiveDataComponent implements OnInit {
  filter = 0;
  filterText = 'in Italia';
  lastUpdateData = '24/03/2020 – 17:00';


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getLiveData().subscribe(
    (data: any) => {
      console.log('getLiveData', data);
    },
    error => {
      console.log('Error', error.error);
    });
}

  selected(value: number) {
    if (this.filter != value) {
      this.filter = value;

      switch (this.filter) {
        case 1:
          this.filterText = "nella tua regione";
          break;
        case 2:
          this.filterText = "nella tua provincia";
          break;
        default:
          this.filterText = "in Italia";
          break;
      }
    }
  }

  // getTown(latitude, longitude) {
  //   var options = {
  //     host: 'nominatim.openstreetmap.org',
  //     path: '/reverse?format=xml&lat=' + latitude + '&lon=' + longitude + '&zoom=18&addressdetails=1',
  //     method: 'GET',
  //     headers: {
  //       referer: '(add a referer here)',
  //       'user-agent': '(add a user agent here)'
  //     }
  //   };
  //
  //   var g = https.get(
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
