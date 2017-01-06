import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { LoadingService } from '../../services/loading.service';
import { ButtonsModule } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private current: Array<any> = [];
  private currentRoute;
  private localStorageData = "";
  private updatedTime;
  private arrivalColor;
  private departureColor;

  constructor(
    private http: HttpService,
    private Loading: LoadingService
  ) { }

  ngOnInit() {
    localStorage.removeItem("searchParams")
    this.getArrivals().then((arrivals: any) => {
      this.Loading.isLoading = false;
    });

    setInterval(() => {
      this.getArrivals();
    }, 60 * 60 * 1000);
  }

  getDepartures(): Promise<any> {
    this.arrivalColor = 'rgba(255, 213, 0, 1.0000)';
    this.departureColor = 'white';
    this.currentRoute = 'departures';
    this.localStorageData = JSON.parse(localStorage.getItem("searchParams"));
    if (this.localStorageData != null) {
      let params = this.localStorageData;
      params.direction = "D";
      this.getSearchQueryFlights(params);
    } else {
      return new Promise((resolve, reject) => {
        this.http.get('departures').subscribe((r: any) => {
          this.current = r.data;
          this.updatedTime = r.update_time;
          resolve(r.data);
        });
      });
    }
  }

  getArrivals(): Promise<any> {
    this.departureColor = 'rgba(255, 213, 0, 1.0000)';
    this.arrivalColor = 'white';
    this.currentRoute = 'arrivals';
    this.localStorageData = JSON.parse(localStorage.getItem("searchParams"));
    if (this.localStorageData != null) {
      let params = this.localStorageData;
      params.direction = "A";
      this.getSearchQueryFlights(params);
    } else {
      return new Promise((resolve, reject) => {
        this.http.get('arrivals').subscribe((r: any) => {
          this.current = r.data;
          this.updatedTime = r.update_time;
          resolve(r.data);
        });
      });
    }
  }

  searchedData(results) {
    this.current = results;
  }

  getSearchQueryFlights(params) {
    this.http.getSearchQuery(params, this.currentRoute).subscribe(
      data => {
        this.current = data.data;
        this.updatedTime = data.update_time;
      }
    );
  }

}
