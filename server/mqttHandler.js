const mqtt = require("mqtt");

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = "http://localhost:1883"; // should be changed to online provider in the future
    this.username = "YOUR_USER"; // mqtt credentials if these are needed to connect
    this.password = "YOUR_PASSWORD";
  }

  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host, {
      username: this.username,
      password: this.password,
    });

    // Mqtt error calback
    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on("connect", () => {
      console.log(`Connected to MQTT broker: ${this.host}`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe("mytopic", { qos: 0 });

    // When a message arrives, console.log it
    this.mqttClient.on("message", function (topic, message) {
      console.log(message.toString());
    });
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message) {
    this.mqttClient.publish("mytopic", message);
  }

  subscribe(topic) {
    this.mqttClient.subscribe(topic, { qos: 1 });
  }
  publish(topic, message) {
    this.mqttClient.publish(topic, message);
  }
  unsubscribe(topic) {
    this.mqttClient.unsubscribe(topic);
  }

  onMessage() {
    return new Promise((resolve) => {
      console.log("Inside Promise ")
      this.mqttClient.on("message", (topic, message) => {
        console.log(message.toString());
        resolve(JSON.parse(message.toString()));

        this.mqttClient.unsubscribe(topic);
      });
    });
  }
}

module.exports = new MqttHandler();
