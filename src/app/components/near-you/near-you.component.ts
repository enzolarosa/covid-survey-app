import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-near-you',
  templateUrl: './near-you.component.html',
  styleUrls: ['./near-you.component.scss']
})
export class NearYouComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
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
}
