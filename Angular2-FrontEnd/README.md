# CPH Flights Information - FrontEnd

---
## Introdution
This is the front-end of the application. Here the user is able to see two tables, departures/arrivals from/to Copenhagen airport. One can also search for a specific flight.

## What was used
The front-end is based on **Angular2** and **Typescript**.

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.20-4.

Chek this [link](https://angular.io/docs/ts/latest/) for more usefull information about `Angula2`.

The next componets were used for the interface:

* [Bootstrap](https://valor-software.com/ng2-bootstrap/#/)
* [Ng2 Smart Table](https://akveo.github.io/ng2-smart-table/)

## Interface
The application is based of one page with the main view of the table for the arrivals flights.

On the top one has two buttons, one for the arrivals and one for the departures. Clicking those buttons the user can easaly switch between the two tables.

Below the buttons a search form. Here one can search a specific flight with this parameters: arrivals, departures
date, from/to a specific city.

In the end the table showing the information about the flights.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## If Compiler Error
If you see an **Error** like **Unknow...** or something else when you are tryining **ng serve** or **ng build** please use this command first **npm install**. If something wrong appear in the terminal please use this **sudo npm cache clean** then repeat the above commands. 
