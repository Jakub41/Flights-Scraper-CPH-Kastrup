import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],

})
export class MainComponent implements OnInit {
  public type: string;

  constructor() {
  }

  ngOnInit() {
    this.type = "departures";
  }

  departures() {
    this.type = "departures";
  }

  arrivals() {
    this.type = "arrivals";
  }
}

// "type" defines what to show, departures or arrivals. it's changes according to radio buttons
