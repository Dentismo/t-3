const express = require("express");
const router = express.Router({ mergeParams: true });
const mqttHandler = require("./mqttHandler");
const bcrypt = require('bcryptjs');

const configurations = {
  timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 30000 // After 30 seconds, try again.
};

router.post("/request/:topic/:id", async (req, res) => {
  //define mqtt topics with the given parametere
  const mqttTopic = "request/" + req.params.topic + '/' + req.params.id;
  const responseTopic = "response/" + req.params.topic + '/' + req.params.id;

  //subscribe to the response
  mqttHandler.subscribe(responseTopic);

  const {password} = req.body
  if(password) {
    req.body.password = await bcrypt.hash(values.password, 10)
  }
  //publish request
  mqttHandler.publish(mqttTopic, JSON.stringify(req.body));
  //message received is parse to json and returned to the frontend
  const response = await mqttHandler.onMessage();

  res.status(201).json(response);
});

router.get("/request/:topic/:topicDefinition?/:id", async (req, res) => {
  //define mqtt topics with the given parametere
  if(req.params.topicDefinition) {
    const mqttTopic = "request/" + req.params.topic + "/" + req.params.topicDefinition + "/" + req.params.id
    const responseTopic = "response/" + req.params.topic + "/" + req.params.topicDefinition + "/" + req.params.id

    mqttHandler.publish(mqttTopic, req.params.id);

  //subscribe to the response
  mqttHandler.subscribe(responseTopic);
  //message received is parse to json and returned to the frontend
  const response = await mqttHandler.onMessage();

    res.status(201).json(response);
  } else {
    const mqttTopic = "request/" + req.params.topic + "/" + req.params.id
    const responseTopic = "response/" + req.params.topic + "/" + req.params.id

    mqttHandler.publish(mqttTopic, req.params.id);

    //subscribe to the response
    mqttHandler.subscribe(responseTopic);

    //message received is parse to json and returned to the frontend
    const response = await mqttHandler.onMessage();

    res.status(201).json(response);
}
});

router.patch("/request/:delegation/:id", async (req, res) => {
  const { delegation } = req.params;
  const { id } = req.params.id;
  const mqttTopic = `request/${delegation}/${id}`;
  const responseTopic = `response/${delegation}/${id}`;

  console.log(mqttTopic, responseTopic);

  mqttHandler.subscribe(responseTopic);
  mqttHandler.publish(mqttTopic, JSON.stringify(req.body));
  const message = await mqttHandler.onMessage();

  res.status(200).json(message);
});

router.delete("/request/delete/:id", async (req, res) => {
  const { bookingId } = req.body;
  const { id } = req.params.id;

  const mqttTopic = `request/delete/${id}`;
  const responseTopic = `response/delete/${id}`;

  mqttHandler.subscribe(responseTopic);
  mqttHandler.publish(mqttTopic, bookingId);
  const message = await mqttHandler.onMessage();

  res.status(200).json(message);
});

module.exports = router;
