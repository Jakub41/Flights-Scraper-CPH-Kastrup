import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class AirportService {
  //service that gets data from API with Http sevice
  constructor(private http: Http) { }

  getDepartures() {
    return this.http.get(environment.departures).map(function (response: Response) {
      return response.json();
    });
  }

  getArrivals() {
    return this.http.get(environment.arrivals).map(function (response: Response) {
      return response.json();
    });
  }

}
