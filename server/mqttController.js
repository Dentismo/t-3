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

router.patch("/request/:topic", async (req, res) => {
  const { topic } = req.params;
  const mqttTopic = `request/${topic}`;
  const responseTopic = `response/${topic}`;

  mqttHandler.subscribe(responseTopic);
  mqttHandler.publish(mqttTopic, JSON.stringify(req.body));
  const message = await mqttHandler.onMessage();

  res.status(200).json(message);
});

router.delete("/request/:topic", async (req, res) => {
  const { topic } = req.params;
  const mqttTopic = `request/${topic}`;
  const responseTopic = `response/${topic}`;

  mqttHandler.subscribe(responseTopic);
  mqttHandler.publish(mqttTopic, 1337);
  const message = await mqttHandler.onMessage();

  res.status(200).json(message);
});

/* maybe better to convert handlers to infer topics based on req.body and http method, so the client has to know as little as possible
router.patch('/request', async (req, res) => {
    const { bookingId, type } = req.body; // type is `approve` or `denied`
    const mqttTopic = `request/booking/${type}`
    const responseTopic = `response/booking/${type}`

    mqttHandler.subscribe(responseTopic);
    mqttHandler.publish(mqttTopic, bookingId)
});
*/

module.exports = router;
