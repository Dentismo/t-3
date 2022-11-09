var express = require("express");
var router = express.Router({ mergeParams: true });
const mqtt = require('mqtt')


router.post('/', (req, res) => {
  const topic ='/nodejs/mqtt/message'
  client.publish(topic, req.body.message, { qos: 0, retain: false }, (error) => {
      if (error) {
          console.error(error)
      }
  })
  res.sendStatus(201);
})


module.exports = router;