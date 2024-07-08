import { DATA_RECEIVED } from "./config";
import mqConnection from "./connection";

export type FlightData = {
  _id: string;
  airline: string;
  flightNumber: string;
  flightDate: string;
  message: string;
  version: Number;
};

export const sendData = async (data: FlightData) => {
  await mqConnection.sendToQueue(DATA_RECEIVED, data);

  console.log(`Sent the data to serviceB`);
};