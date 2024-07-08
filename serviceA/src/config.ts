import { config } from "dotenv";

config();

export const rmqUser = String(process.env.RABBITMQ_USERNAME);

export const rmqPass = String(process.env.RABBITMQ_PASSWORD);

export const rmqhost = 'http://localhost:15672/';//String(process.env.RABBITMQ_URL);

export const DATA_RECEIVED = "DATA_RECEIVED";

export const FLIGHTDATA_URL = String(process.env.FLIGHTDATA_URL);