import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {

  @Input() route: string;
  @Output() searchResult = new EventEmitter();
  public date = "";
  public hours = ["", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00",
    "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",
    "22:00", "23:00"];
  public selectedTime = "";
  public searchStr = "";
  public direction = "";

  constructor(private http: HttpService) {
  }

  ngOnInit() {
    this.getDirection();
  }

  getDirection() {
    if (this.route == "arrivals") {
      this.direction = "A"
    } else {
      this.direction = "D"
    }
  }

  searchFlights() {
    this.getDirection();
    let params = {
      searchInput: this.searchStr,
      date: this.date,
      time: this.selectedTime,
      direction: this.direction
    }
    localStorage.setItem("searchParams", JSON.stringify(params));
    this.http.getSearchQuery(params, this.route).subscribe(
      data => {
        this.searchResult.emit(data.data)
      }
    );
  }

  onDateChanged(event: any) {
    this.date = event.date.day + '-' + event.date.month + '-' + event.date.year;
  }

  onTimeChanged(time) {
    this.selectedTime = time;
  }

  inputSearch() {
    this.getDirection();
    let params = {
      language: "en",
      direction: this.direction,
      phrase: this.searchStr
    }
    this.http.getInputSearch(params).subscribe(
      data => {
        console.log(data.data)
      }
    );
  }
}
