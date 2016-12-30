# CPH Flights Information - BackEnd
---
## Introdution
This is the back-end of the application. The scraper downloads the flight information from the [Copenhagen airport site](https://www.cph.dk/en/) which is showed on the [front-end](https://github.com/Jakub41/Flights-Scraper-CPH-Kastrup/tree/master/Angular2-FrontEnd).

## The API
The flights scraper is built in **Python 3.4**.

It's built with the following frameworks and libraries:

**Flask** a Simple Python based webserver [link](http://flask.pocoo.org/)

**Requests** a library for handle HTTP requests [link](http://docs.python-requests.org/en/master/)

**Beautiful Soup V4** a library for parse HTML and XML files out [link](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)

**JSON** a library for encode/decode and data interchange format [link](https://docs.python.org/2/library/json.html)

Before run the API in your local enviroment, install the `requirements.txt` with this command:

`[sudo] pip install requirements`  

## How It Works
The scraper API connects and downloads information from Copenhagen airport site and arranges the information in two tables the arraivals and departures. The API also allow the user to search for a specific flight.
