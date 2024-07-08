import { UUID } from 'mongodb';
import * as Mongoose from 'mongoose'; 
import { Document, Model, model } from "mongoose"; 

let database: Mongoose.Connection; 

const FlightDataSchema = new Mongoose.Schema({ 
    _id: UUID,
    airline: String, 
	flightNumber: String, 
    flightDate: { 
		type: Date, 
		default: new Date(), 
	},
	message: String, 
	version: Number 
}); 


export interface IFlightData { 
    _id: UUID,
    airline: String,
    flightNumber: String,
    flightDate: Date,
    message: String,
    version: Number
} 

export interface IFlightDataDocument extends Mongoose.Document<IFlightData> { }
export interface IFlightDataModel extends Model<IFlightDataDocument> { }

export const FlightDataModel = model<IFlightDataDocument>("flightData", 
    FlightDataSchema 
)


export const connect = () => { 
	//  local mongodb url
	const uri = 
		'mongodb://localhost:27017/flightdataDB'; 

	if (database) { 
		return; 
	} 

	Mongoose.connect(uri, {
	}); 

	database = Mongoose.connection; 
	// If database successfully connects 
	database.once('open', async () => { 
		console.log('Connected to database successfully'); 
	}); 

	// connectivity error 
	database.on('error', () => { 
		console.log(`Error connecting to database. Check mongoDB connection`); 
	}); 

	return { 
		FlightDataModel 
	}; 
}; 

// Safer way to get disconnected 
export const disconnect = () => { 
	if (!database) { 
		return; 
	} 

	Mongoose.disconnect(); 
};

export const addFlightData = async (flightData: IFlightData) => {
	const flightDataDocument = new FlightDataModel(flightData);
	await flightDataDocument.save();
};
