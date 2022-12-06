const express = require("express");
const router = express.Router({ mergeParams: true });
const mqttHandler = require("./mqttHandler");

router.post("/request/:topic", async (req, res) => {
  //define mqtt topics with the given parametere
  const mqttTopic = "request/" + req.params.topic;
  const responseTopic = "response/" + req.params.topic;

  //subscribe to the response
  mqttHandler.subscribe(responseTopic);

  //publish request
  mqttHandler.publish(mqttTopic, JSON.stringify(req.body));

  //message received is parse to json and returned to the frontend
  const response = await mqttHandler.onMessage();

  res.status(201).json(response);
});

router.get("/request/:topic", async (req, res) => {
  //define mqtt topics with the given parametere
  const mqttTopic = "request/" + req.params.topic;
  const responseTopic = "response/" + req.params.topic;

  mqttHandler.publish(mqttTopic, "send");

  //subscribe to the response
  mqttHandler.subscribe(responseTopic);

  //message received is parse to json and returned to the frontend
  const response = await mqttHandler.onMessage();

  res.status(201).json(response);
});

router.patch("/request/:topic/:delegation", async (req, res) => {
  const { topic, delegation } = req.params;
  const mqttTopic = `request/${topic}/${delegation}`;
  const responseTopic = `response/${topic}/${delegation}`;

  console.log(mqttTopic, responseTopic);

  mqttHandler.subscribe(responseTopic);
  mqttHandler.publish(mqttTopic, JSON.stringify(req.body));
  const message = await mqttHandler.onMessage();

  res.status(200).json(message);
});

router.delete("/request/:topic", async (req, res) => {
  const { topic } = req.params;
  const { bookingId } = req.body;
  const mqttTopic = `request/${topic}`;
  const responseTopic = `response/${topic}`;

  mqttHandler.subscribe(responseTopic);
  mqttHandler.publish(mqttTopic, bookingId);
  const message = await mqttHandler.onMessage();

  res.status(200).json(message);
});

module.exports = router;
