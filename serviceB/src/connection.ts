import { Connection, Channel } from "amqplib";
import * as client from "amqplib";
import { rmqUser, rmqPass, rmqhost, DATA_RECEIVED } from "./config";

type HandlerCB = (msg: string) => any;


class RabbitMQConnection {
  connection!: Connection;
  channel!: Channel;
  private connected!: Boolean;

  async connect() {
    if (this.connected && this.channel) return;
    try {
      console.log(`⌛️ Connecting to Rabbit-MQ Server`);

      this.connection = await client.connect(
        `amqp://${rmqUser}:${rmqPass}@${rmqhost}:15672`
      );

      console.log(`✅ Rabbit MQ Connection is ready`);

      this.channel = await this.connection.createChannel();

      console.log(`🛸 Created RabbitMQ Channel successfully`);

      this.connected = true;

    } catch (error) {
      console.error(error);
      console.error(`Not connected to MQ Server`);
    }
  }


  async consume(handleIncomingData: HandlerCB) {

    await this.channel.assertQueue(DATA_RECEIVED, {
      durable: true,
    });

    this.channel.consume(
      DATA_RECEIVED,
      (msg) => {
        {
          if (!msg) {
            return console.error(`Invalid incoming message`);
          }
          handleIncomingData(msg?.content?.toString());
          this.channel.ack(msg);
        }
      },
      {
        noAck: false,
      }
    );

  }
}

const mqConnection = new RabbitMQConnection();

export default mqConnection;