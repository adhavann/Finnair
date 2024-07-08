import mqConnection from "./connection";
import { sendData, FlightData } from "./notification";
import { getFlightData } from "./getFlightData";



const send = async () => {
  await mqConnection.connect();

  // sample flight data
  // const data = {
  //   _id: "5843f1d0-e512-4b80-96e4-fcb9a2d496ad",
  //   airline: "AY",
  //   flightNumber: "0010",
  //   flightDate: "2024-12-31",
  //   message: "Don't forget to fuel.", // update msg
  //   version: 1,
  // };

  const data: FlightData = await getFlightData();
  sendData(data);
};


send();