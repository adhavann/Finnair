import * as http from "http";
import { FlightData } from "./notification";
import { FLIGHTDATA_URL } from "./config";

// URL to receive the flight data
const options = {
    host: FLIGHTDATA_URL,
    port: 8080,
    path: '/',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};



export const getFlightData = async () => {
    let flightData = '';
    let request = http.request(options, function (res) {
        res.on('data', function (chunk) {
          flightData += chunk;
        });
        res.on('end', function () {
            console.log("Received flight data from serviceA");
          });
    });
    
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
  return JSON.parse(flightData) as FlightData;
};
