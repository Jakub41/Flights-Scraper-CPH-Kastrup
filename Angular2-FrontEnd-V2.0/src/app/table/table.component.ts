import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {AirportService} from '../airport-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [AirportService]
})
export class TableComponent implements OnInit, OnChanges {
  //type - see main.component.ts
  @Input() type: string;
  //data arrays, "departures" - for departures, "arrivals" - for arrivals, "data" - currently chosen
  public data: any;
  public departures: any;
  public arrivals: any;

  public update: string;
  public updateDepartures: string;
  public updateArrivals: string;

  //some stuff for angular2-datatable
  public rowsOnPage = 10;
  public sortBy = "time";
  public sortOrder = "asc";

  constructor(private _airportService: AirportService) {
    // see airport-service.service.ts
  }

  ngOnInit() {
    //get departures and arrivals, set departures as default for view
    this._airportService.getDepartures()
      .subscribe((response) => {
        this.departures = response.data;
        this.data = this.departures;

        this.updateDepartures = response.update_time;
        this.update = this.updateDepartures;
        console.log("departures: " + this.updateDepartures);
      });
    this._airportService.getArrivals()
      .subscribe((response) => {
        this.arrivals = response.data;
        this.updateArrivals = response.update_time;
        console.log("arrivals: " + this.updateArrivals);
      });
  }

  ngOnChanges(changes) {
    //change array for view
    if ((changes.type.currentValue === "arrivals") && (changes.type.previousValue === "departures")) {
      this.data = this.arrivals;
      this.update = this.updateArrivals;
    } else if ((changes.type.currentValue === "departures") && (changes.type.previousValue === "arrivals")) {
      this.data = this.departures;
      this.update = this.updateDepartures;
    }
  }
}
