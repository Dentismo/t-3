const express = require("express");
const router = express.Router({ mergeParams: true });
const mqttHandler = require("./mqttHandler");

router.post("/request/:topic/:id", async (req, res) => {
  //define mqtt topics with the given parametere
  const mqttTopic = "request/" + req.params.topic + "/" + req.params.id;
  const responseTopic = "response/" + req.params.topic + "/" + req.params.id;

  //   console.log(
  //     `Server received POST request. Publishing to ${mqttTopic} and subscribing to ${responseTopic}`
  //   );

  //subscribe to the response
  mqttHandler.subscribe(responseTopic);

  //publish request
  mqttHandler.publish(mqttTopic, JSON.stringify(req.body));
  //message received is parse to json and returned to the frontend
  const response = await mqttHandler.onMessage();

  res.status(201).json(response);
});

router.get("/request/:topic/:topicDefinition?/:id", async (req, res) => {
  //define mqtt topics with the given parametere
  if (req.params.topicDefinition) {
    const mqttTopic =
      "request/" +
      req.params.topic +
      "/" +
      req.params.topicDefinition +
      "/" +
      req.params.id;
    const responseTopic =
      "response/" +
      req.params.topic +
      "/" +
      req.params.topicDefinition +
      "/" +
      req.params.id;

    mqttHandler.publish(mqttTopic, req.params.id);

    //subscribe to the response
    mqttHandler.subscribe(responseTopic);
    //message received is parse to json and returned to the frontend
    const response = await mqttHandler.onMessage();

    res.status(201).json(response);
  } else {
    const mqttTopic = "request/" + req.params.topic + "/" + req.params.id;
    const responseTopic = "response/" + req.params.topic + "/" + req.params.id;

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
