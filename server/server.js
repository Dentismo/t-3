const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');

//mqtt
const mqtt = require('mqtt')

const host = 'localhost'
const mqttport = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${host}:${mqttport}`

// Mosquitto client that will publish to mosquitto broker
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'name',
  password: '1997',
  reconnectPeriod: 1000,
})

var mqttController = require('./controller/mqtt');
const { format } = require('path');
//


const mongoURI = 'mongodb://127.0.0.1:27017/dentistClinicDB';
const port = process.env.PORT || 3000;

connectToDatabase(mongoURI);
const app = startApp(port);
module.exports = app;



function connectToDatabase(mongoURI) {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err) {
            console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
            console.error(err.stack);
            process.exit(1);
        }
        console.log(`Connected to MongoDB with URI: ${mongoURI}`);
    });
}
/*Function connectToMqtt connect us to the broker via port 1883, added the function to startApp
open a terminal and copy paste: mosquitto_sub -h localhost -t /nodejs/mqtt
*/
function connectToMqtt() {
  const topic = "/nodejs/mqtt";
  client.on("connect", () => {
    console.log("Connected");
    
    client.subscribe([topic], () => {
      console.log(`Subscribe to topic '${topic}'`);
    });

    client.subscribe('/dentist/message', () => {
        console.log(`Subscribe to topic: /dentist/message`);
      });

client.publish(topic, "nodejs mqtt test", { qos: 0, retain: false }, (error) => {
        if (error) {
        console.error(error);
        }
    }
    );

    app.post('/message', (req, res) => {
        const topic ='/dentist/message'
        client.publish(topic, req.body.message, { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
        res.sendStatus(201);
    })

    app.post('/dentist', (req, res) => {
        const topic ='/dentist'
        client.publish(topic, req.body.message, { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
        res.sendStatus(201);
    })
  });
  client.on("message", (topic, payload) => {
    console.log("Received Message:", topic, payload.toString());
  });

}

function startApp(port) {
    const app = setupApp();
    addRoutesToApp(app);
    addFrontendToApp(app);
    connectToMqtt(app);

    // Error handler (i.e., when exception is thrown) must be registered last
    const env = app.get('env');
    addErrorHandlerToApp(app, env);

    app.listen(port, function (err) {
        if (err) throw err;
        console.log(`Express server listening on port ${port}, in ${env} mode`);
        console.log(`Backend: http://localhost:${port}/api/`);
        console.log(`Frontend (production): http://localhost:${port}/`);
    });

    return app;
}

function setupApp() {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan('dev'));
    app.options('*', cors());
    app.use(cors());
    return app;
}

function addRoutesToApp(app) {
    app.get('/api', function (req, res) {
        res.json({ 'message': 'Welcome to your Distributed Systems Baby' });
    });

    /**
     * Add controllers here
     */
    app.use('/api/message', mqttController);

    // Catch all non-error handler for api (i.e., 404 Not Found)
    app.use('/api/*', function (req, res) {
        res.status(404).json({ 'message': 'Endpoint Not Found' });
    });
}

function addFrontendToApp(app) {
    // Configuration for serving frontend in production mode
    // Support Vuejs HTML 5 history mode
    app.use(history());
    // Serve static assets
    const root = path.normalize(__dirname + '/..');
    const client = path.join(root, 'client', 'dist');
    app.use(express.static(client));
}

function addErrorHandlerToApp(app, env) {
    // eslint-disable-next-line no-unused-consts
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        const err_res = {
            'message': err.message,
            'error': {}
        };
        if (env === 'development') {
            // Return sensitive stack trace only in dev mode
            err_res['error'] = err.stack;
        }
        res.status(err.status || 500);
        res.json(err_res);
    });
}
