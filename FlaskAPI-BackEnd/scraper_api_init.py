from flask import Flask, Response,request
from flask_cors import CORS
from flightsClass import Cphdk
from flask_restful import Api
import json


app = Flask(__name__)
api = Api(app)
CORS(app)
Cph = Cphdk()

@app.route('/api/departures/')
def departures():
    data = request.args.to_dict()
    return Response(
        json.dumps(Cph.parse_departure_table(data)), mimetype='application/json')

@app.route('/api/arrivals/')
def arrivals():
    data = request.args.to_dict()
    return Response(
        json.dumps(Cph.parse_arrival_table(data)), mimetype='application/json')


if __name__ == '__main__':

    app.run()