const express = require("express");
const router = express.Router({ mergeParams: true });
const mqttHandler = require("./mqttHandler");
const bcrypt = require('bcryptjs');
const CircuitBreaker = require("opossum");


const routes = 'http://localhost:3000/api/*'

const configurations = {
  timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 10, // When 10% of requests fail, trip the circuit
  resetTimeout: 10000 // After 10 seconds, try again.
};


router.post("/request/:topic/:id", async (req, res) => {

  //define mqtt topics with the given parametere
  const mqttTopic = "request/" + req.params.topic + "/" + req.params.id;
  const responseTopic = "response/" + req.params.topic + "/" + req.params.id;

  try {
    const stats = breaker.stats;

    if (breaker.opened) 
      return;

    if ((stats.failures < configurations.volumeThreshold) && !breaker.halfOpen)
      return;

    /*
      The error rate is calculated by dividing the number of failures by the number of times the circuit has been activated. 
      This error rate is then compared to the errorThresholdPercentage value
    */

    const errorRate = stats.failures / stats.fires * 100;

    if (errorRate > configurations.errorThresholdPercentage || breaker.halfOpen)
      breaker.open();

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

    breaker.on('open', () => console.log(`================= OPEN: The breaker for ${routes} just opened. =================`));
    breaker.on('halfOpen', () => {
      // Based on configuration, wait for 10 seconds and if everything is OK then close circuit breaker
      console.log(`=================  HALF_OPEN: The breaker for ${routes} is half open. =================`)
      setTimeout(() => {breaker.close()}, configurations.resetTimeout)
    });
    breaker.on('close', () => console.log(`=================  CLOSE: The breaker for ${routes} has closed. Service OK. =================`)); 
    breaker.on('fallback', () => console.log(`=================  FALLBACK: FALLBACK is invoked. =================`));
    breaker.on('reject', () => console.log(`=================  REJECTED: The breaker for ${routes} is open. Failing fast. =================`));
  
    return await breaker.fire().then().catch(console.log({ state: breaker.opened ? 'open' : 'closed' }));

  } catch (error) {
    console.log(error);
  }

});


const breaker = new CircuitBreaker(routes, configurations);
router.get("/request/:topic/:topicDefinition?/:id", async (req, res) => {
  let mqttTopic = ""
  let responseTopic = ""
  if (req.params.topicDefinition) {
    mqttTopic =
      "request/" +
      req.params.topic +
      "/" +
      req.params.topicDefinition +
      "/" +
      req.params.id;
    responseTopic =
      "response/" +
      req.params.topic +
      "/" +
      req.params.topicDefinition +
      "/" +
      req.params.id;
  } else {
    mqttTopic = "request/" + req.params.topic + "/" + req.params.id;
    responseTopic = "response/" + req.params.topic + "/" + req.params.id;
  }

  try {
    const stats = breaker.stats;

    if (breaker.opened) 
      return;

    if ((stats.failures < configurations.volumeThreshold) && !breaker.halfOpen)
      return;

    /*
      The error rate is calculated by dividing the number of failures by the number of times the circuit has been activated. 
      This error rate is then compared to the errorThresholdPercentage value
    */
    const errorRate = stats.failures / stats.fires * 100;

    if (errorRate > configurations.errorThresholdPercentage || breaker.halfOpen)
      breaker.open();
  
    // define mqtt topics with the given parametere
    if(req.params.topicDefinition) {
      const mqttTopic = "request/" + req.params.topic + "/" + req.params.topicDefinition + "/" + req.params.id;
      const responseTopic = "response/" + req.params.topic + "/" + req.params.topicDefinition + "/" + req.params.id;
  
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

    breaker.on('open', () => console.log(`================= OPEN: The breaker for ${routes} just opened. =================`));
    breaker.on('halfOpen', () => {
      // Based on configuration, wait for 10 seconds and if everything is OK then close circuit breaker
      console.log(`=================  HALF_OPEN: The breaker for ${routes} is half open. =================`)
      setTimeout(() => {breaker.close()}, configurations.resetTimeout)
    });
    breaker.on('close', () => console.log(`=================  CLOSE: The breaker for ${routes} has closed. Service OK. =================`)); 
    breaker.on('fallback', () => console.log(`=================  FALLBACK: FALLBACK is invoked. =================`));
    breaker.on('reject', () => console.log(`=================  REJECTED: The breaker for ${routes} is open. Failing fast. =================`));
  
    return await breaker.fire().then().catch(console.log({ state: breaker.opened ? 'open' : 'closed' }));

  } catch (error) {
    console.log(error)
  }
});




router.patch("/request/:delegation/:id", async (req, res) => {
  const { delegation } = req.params;
  const { id } = req.params.id;
  const mqttTopic = `request/${delegation}/${id}`;
  const responseTopic = `response/${delegation}/${id}`;

  console.log(mqttTopic, responseTopic);

  try {
    const stats = breaker.stats;

    if (breaker.opened) 
      return;

    if ((stats.failures < configurations.volumeThreshold) && !breaker.halfOpen)
      return;

    /*
      The error rate is calculated by dividing the number of failures by the number of times the circuit has been activated. 
      This error rate is then compared to the errorThresholdPercentage value
    */
    const errorRate = stats.failures / stats.fires * 100;

    if (errorRate > configurations.errorThresholdPercentage || breaker.halfOpen)
      breaker.open();

    mqttHandler.subscribe(responseTopic);
    mqttHandler.publish(mqttTopic, JSON.stringify(req.body));
    const message = await mqttHandler.onMessage();
  
    res.status(200).json(message);

    breaker.on('open', () => console.log(`================= OPEN: The breaker for ${routes} just opened. =================`));
    breaker.on('halfOpen', () => {
      // Based on configuration, wait for 10 seconds and if everything is OK then close circuit breaker
      console.log(`=================  HALF_OPEN: The breaker for ${routes} is half open. =================`)
      setTimeout(() => {breaker.close()}, configurations.resetTimeout)
    });
    breaker.on('close', () => console.log(`=================  CLOSE: The breaker for ${routes} has closed. Service OK. =================`)); 
    breaker.on('fallback', () => console.log(`=================  FALLBACK: FALLBACK is invoked. =================`));
    breaker.on('reject', () => console.log(`=================  REJECTED: The breaker for ${routes} is open. Failing fast. =================`));
  
    return await breaker.fire().then().catch(console.log({ state: breaker.opened ? 'open' : 'closed' }));

  } catch (error) {
    console.log(error);
  }
});

router.delete("/request/delete/:id", async (req, res) => {
  const { bookingId } = req.body;
  const { id } = req.params.id;

  const mqttTopic = `request/delete/${id}`;
  const responseTopic = `response/delete/${id}`;

  try {
    const stats = breaker.stats;

    if (breaker.opened) 
      return;

    if ((stats.failures < configurations.volumeThreshold) && !breaker.halfOpen)
      return;

    /*
      The error rate is calculated by dividing the number of failures by the number of times the circuit has been activated. 
      This error rate is then compared to the errorThresholdPercentage value
    */
    const errorRate = stats.failures / stats.fires * 100;

    if (errorRate > configurations.errorThresholdPercentage || breaker.halfOpen)
      breaker.open();

    mqttHandler.subscribe(responseTopic);
    mqttHandler.publish(mqttTopic, bookingId);
    const message = await mqttHandler.onMessage();
  
    res.status(200).json(message);

    breaker.on('open', () => console.log(`================= OPEN: The breaker for ${routes} just opened. =================`));
    breaker.on('halfOpen', () => {
      // Based on configuration, wait for 10 seconds and if everything is OK then close circuit breaker
      console.log(`=================  HALF_OPEN: The breaker for ${routes} is half open. =================`)
      setTimeout(() => {breaker.close()}, configurations.resetTimeout)
    });
    breaker.on('close', () => console.log(`=================  CLOSE: The breaker for ${routes} has closed. Service OK. =================`)); 
    breaker.on('fallback', () => console.log(`=================  FALLBACK: FALLBACK is invoked. =================`));
    breaker.on('reject', () => console.log(`=================  REJECTED: The breaker for ${routes} is open. Failing fast. =================`));
  
    return await breaker.fire().then().catch(console.log({ state: breaker.opened ? 'open' : 'closed' }));

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
