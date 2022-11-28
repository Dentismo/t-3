const express = require('express');
const router = express.Router({mergeParams: true});
const mqttHandler = require('./mqttHandler')

router.post('/request/:topic', async (req, res) => {
    //curcuit breaker implementation here

    //define mqtt topics with the given parametere
    const mqttTopic = 'request/' + req.params.topic
    const responseTopic = 'response/' + req.params.topic

    //subscribe to the response
    mqttHandler.subscribe(responseTopic)

    //publish request
    mqttHandler.publish(mqttTopic, JSON.stringify(req.body))

    //message received is parse to json and returned to the frontend
    const response = await mqttHandler.onMessage()

    res.status(201).json(response)
})

router.get('/request/:topic', (req, res) => {
    //curcuit breaker implementation here

    //define mqtt topics with the given parametere
    const responseTopic = 'response/' + req.params.topic

    //subscribe to the response
    mqttHandler.subscribe(responseTopic)

    //message received is parse to json and returned to the frontend
    mqttHandler.on('message', (topic, message) => {
        res.json(JSON.parse(message.toString()))
        mqttHandler.unsubscribe(topic)
    })
})

module.exports = router;
