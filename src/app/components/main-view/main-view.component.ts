import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  age = '0';

  constructor() { }

  ngOnInit() {
  }

  selectedGender(value: number) {
    console.log('selected value', value);

    let items = document.getElementsByClassName('list-group-item gender');
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("active");

      if (i == value) {
        items[i].classList.add("active");
      }
    }
  }

  selectedState(value: number) {
    console.log('selected value', value);

    let items = document.getElementsByClassName('list-group-item state');
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("active");

      if (i == value) {
        items[i].classList.add("active");
      }
    }
  }
}
