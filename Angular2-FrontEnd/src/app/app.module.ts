import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@angular/material';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MyDatePickerModule } from 'mydatepicker';

// (Route) Components
import { HomeComponent } from './home/home.component';

// Services
import { HttpService } from '../services/http.service';
import { LoadingService } from '../services/loading.service';
import { SearchFormComponent } from './home/search-form/search-form.component';
import { FlightCardComponent } from './home/search-form/flight-card/flight-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchFormComponent,
    FlightCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    MaterialModule.forRoot(),
    Ng2SmartTableModule,
    MyDatePickerModule
  ],
  providers: [
    HttpService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
