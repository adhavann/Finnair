import  { Connection, Channel } from "amqplib";
import * as client from "amqplib";
import { rmqUser, rmqPass, rmqhost } from "./config";

class RabbitMQConnection {
  connection!: Connection;
  channel!: Channel;
  private connected!: Boolean;

  async connect() {

    const rabbitUrl: string = `amqp://guest:guest@localhost:15672`;
    if (this.connected && this.channel) return;
    else this.connected = true;

    try {
      console.log(`⌛️ Connecting to Rabbit-MQ Server`);
      this.connection = await client.connect(rabbitUrl)

        // , (err, conn) => {
        //   if (err) {
        //     throw err;
        //   }
        // this.connection = conn;
        
        console.log(`✅ Rabbit MQ Connection is ready`);

        this.channel = await this.connection.createChannel();
        // }
      //);

      console.log(`🛸 Created RabbitMQ Channel successfully`);
    } catch (error) {
      console.error(error);
      console.error(`Not connected to MQ Server`);
    }
  }

  // 

// export async function Producer(message: string) {
//   amqp.connect("amqp://localhost", (error0, connection) => {
//     if (error0) {
//       throw error0;
//     }
//     connection.createChannel((error1, channel) => {
//       if (error1) {
//         throw error1;
//       }

//       let queue = "hello";

//       channel.assertQueue(queue, {
//         durable: false,
//       });
//       channel.sendToQueue(queue, Buffer.from(message));
//       console.log(" [x] Sent %s", message);
//     });
//   });
// }
  // 
  async sendToQueue(queue: string, message: any) {
    try {
      if (!this.channel) {
        await this.connect();
      }

      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const mqConnection = new RabbitMQConnection();

export default mqConnection;