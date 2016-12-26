import requests
from bs4 import BeautifulSoup


# Constants
DESTCLASS = {'class': 'flights__table__col--destination'}
FLIGHTDELAYED = {'class':'v--mobile-only'}
FLIGHTCLASS = {'class': 'stylish-table__row stylish-table__row--body'}
FLIGHTNUM = {'class': 'main-flight'}
TERMINAL  = {'class':'flights__table__col--terminal'}
FLIGHTSTATUS = {'class': 'stylish-table__cell'}


class Cphdk():

    # def __init__(self):

    def parse_departure_table(self,data):
        r = requests.get(
            'https://www.cph.dk/en/flight-information/departures/',params=data)
        if r.status_code == 200:
            self._departures = BeautifulSoup(r.content, 'html.parser')
        else:
            self._departures = None
            print('Departures request failed with code: %i' % r.status_code)


        flights = self._departures.find_all('div', FLIGHTCLASS)
        update_time = self._departures.find_all('div', {'class': 'flights-search-block'})[0]

        webite_update_time = self._get_website_update_time(update_time)

        departures = []
        for flight in flights:
            departure = {}
            departure['time'] = self._get_flight_time(flight)
            departure['delayed'] = self._get_flight_delayedtime(flight)
            if departure['delayed']:
                print("Delayed departure: %s" % departure['delayed'])
            departure['airline'] = self._get_flight_airline(flight)
            departure['destination'] = self._get_flight_destination(flight)
            departure['number'] = self._get_flight_number(flight)
            departure['terminal'] = self._get_flight_terminal(flight)

            if departure['terminal']:
                print("Terminal - departure: %s" % departure['terminal'])

            departure['flightstatus'] = self._get_flight_status_departure(flight)
            if departure['flightstatus']:
                print("flight status: %s" % departure['flightstatus'])
            departures.append(departure)
        return {'data':departures,'update_time': webite_update_time}

    def parse_arrival_table(self,data):
        r = requests.get(
            'https://www.cph.dk/en/flight-information/arrivals/',params=data)
        if r.status_code == 200:
            self._arrivals = BeautifulSoup(r.content, 'html.parser')
        else:
            self._arrivals = None
            print('Arrivals request failed with code: %i' % r.status_code)


        flights = self._arrivals.find_all('div', FLIGHTCLASS)
        update_time = self._arrivals.find_all('div', {'class': 'flights-search-block'})[0]

        webite_update_time = self._get_website_update_time(update_time)

        arrivals = []
        for flight in flights:
            arrival = {}
            arrival['time'] = self._get_flight_time(flight)
            arrival['delayed'] = self._get_flight_delayedtime(flight)
            if arrival['delayed']:
                print("Delayed arrival: %s" % arrival['delayed'])
            arrival['airline'] = self._get_flight_airline(flight)
            arrival['destination'] = self._get_flight_destination(flight)
            arrival['number'] = self._get_flight_number(flight)
            arrival['flightstatus'] = self._get_flight_status_arrival(flight)
            if arrival['flightstatus']:
                print("flight status - arrivals: %s" % arrival['flightstatus'])
            arrivals.append(arrival)
        return {'data':arrivals,'update_time': webite_update_time}


    def _get_flight_time(self, flight):
        return flight.find_all(
            'div',{
                'class':'stylish-table__cell flights__table__col--time'
            })[0].find_all('span')[0].text.strip()


    def _get_flight_delayedtime(self, flight):
            return flight.find_all('em')[0].text.strip()

    def _get_flight_airline(self, flight):
        return flight.find_all(
            'div', {
                'class': 'stylish-table__cell v--desktop-only'
            })[1].find_all('span')[1].text.strip()

    def _get_flight_destination(self, flight):
        return flight.find_all(
            'div', DESTCLASS)[0].find_all('span')[1].text.strip()

    def _get_flight_number(self, flight):
        return flight.find_all('span', FLIGHTNUM)[0].text.strip()

    def _get_flight_terminal(self, flight):
        return flight.find_all(
            'div', TERMINAL)[0].find_all('span')[0].text.strip()

    cell = None
    def _get_flight_status_arrival(self, flight):
        cells = flight.find_all(
            'div', FLIGHTSTATUS)[4].find_all('span')

        if len(cells):
            cell = cells[0]
            return cell.text.strip()
        else:
            return ""

    def _get_flight_status_departure(self, flight):
        cells = flight.find_all(
                'div', FLIGHTSTATUS)[5].find_all('span')


        if len(cells):
            cell = cells[0]
            return cell.text.strip()
        else:
            return ""

    def _get_website_update_time(self,update_time):
        cells = update_time.find_all('p')[0].text.strip()
        return cells
