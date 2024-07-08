import mqConnection from "./connection";
import {connect, addFlightData} from "./dbConnection";


const handleIncomingData = (msg: string) => {
  try {

    const parsedMessage = JSON.parse(msg);

    console.log(`Received Data`, parsedMessage);

    // store the data into DB for persistence
    addFlightData(parsedMessage);
    

  } catch (error) {
    console.error(`Error While Parsing the message`);
  }
};


const listen = async () => {

  await mqConnection.connect();

  await mqConnection.consume(handleIncomingData);
};

listen();