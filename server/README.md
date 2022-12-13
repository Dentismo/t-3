# T3 Project

## Name

Dentismo Server

## Description

This package is the Server-side of the Dentismo Client/Server component. It works by starting a HTTP server and either communicating with other components or internally executing a requested service when the corresponding API route is hit. The three main objectives of the Server are:

- Communicating with other components via the MQTT protocol
- Sending emails to provided email addresses
- Serving the frontend in production

### Communication with other components

Due to unforeseen circumstances and for the sake of simplicity, in order to handle communications between the Client and other backend components, rather than implementing a MQTT client in React, the following mechanism was implemented:

- The Client makes an API call to one of the Server's routes
- The corresponding API route handler (running in Node) receives the request and:
  - Subscribes to the MQTT broker's topic corresponding to the requested service
  - Publishes the request body to the MQTT broker on the corresponding response topic of the subscribed topic
  - Receives a message from the MQTT broker on the topic subscribed in step 1 and sends back a HTTP response to the Client with the received message in the body
- The Client receives the response and parses it to JSON

See the [MQTT Topic Definition](https://git.chalmers.se/courses/dit355/dit356-2022/t-3/documentation/-/blob/main/MQTT.md) to learn more and view a complete list of MQTT topics

### Sending emails

In order to notify users about a dentist's decision regarding requested appointments, our system sends mail to the email address that the user provided when requesting an appointment. When a dentist either approves or denies an appointment, the user is notified with an email. This is done by using Nodemailer's `createTransport` method to create a SMTP transporter and using it to send a predefined Handlebars template supplied with appointment variables (such as the dentist's decision, clinic name, appointed time etc).

### Serving the frontend

Once the frontend is ready to be put into production, it is bundled into a single directory, which is ready to be served. See the process of bundling the frontend [here](https://git.chalmers.se/courses/dit355/dit356-2022/t-3/t3-project/-/tree/main/client#user-content-installation).
After a bundle is created, when the server is started, it will begin serving it by setting the server's "public" directory to the directory of the bundle, allowing the frontend to be accessed on the server's host.

### Technology

- [Express](https://expressjs.com/) for starting a HTTP server
- [MQTT.js](https://github.com/mqttjs/MQTT.js) for creating an MQTT client for the Node runtime
- [bcrypt](https://www.npmjs.com/package/bcrypt) for hashing dentist passwords before publishing them
- [Nodemailer](https://nodemailer.com/about/) for setting up a SMTP transporter and sending emails

## Installation

Requirements:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-The-Command-Line) - confirm using `git --version`
- [Node](https://nodejs.org/en/) - confirm using `node --version`
- [Node Package Manager](https://www.npmjs.com/) (comes with Node) - confirm using `npm --version`

To run the application locally:

- First clone the project by running `git clone git@git.chalmers.se:courses/dit355/dit356-2022/t-3/t3-project.git` in a terminal
- Move into the `server` directory by running `cd t3-project/server`
- Before running the application, you must install required dependencies by running `npm install`
- Start the server by running `npm run start`

## Usage

### Sending an email

To send an email using our system's mailing service, you will need:

- Means of sending API requests (e.g. [Postman](https://www.postman.com/), [curl](https://curl.se/docs/httpscripting.html), [VSCode's REST extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client))
- A personal email address you have access to

Steps:

- Start the server by running `npm run start`
- Send a POST request to `http://localhost:3000/api/mail` with a JSON body e.g. create a file `demo.rest` in VSCode and paste the following lines into the file and replace `{YOUR_EMAIL}` with your email address (send the request by hitting `Ctrl + Q`):

```
###
POST http://localhost:3000/api/mail HTTP/1.1
Content-Type:  application/json

{
	"booking": {
		"user": {
			"email": "{YOUR_EMAIL}",
			"name": "Demo User"
		},
		"clinicId": "12345",
		"clinicName": "Dentismo Clinic",
		"details": "My tooth hurts",
		"date": "2022-01-01",
		"start": "14:30",
		"end": "15:00"
	},
	"type": "approved"
}
```

- You should immediately get a response from VSCode, saying the response has been successfully sent together with the details of the booking, and a few seconds later, you should receive an email from dentismo.group1@hotmail.com, which is our email address.
  ![email](https://i.imgur.com/cf4919J.png)

### Seeing MQTT in action

To see how the server communicates with the MQTT broker, you will need:

- Means of sending API requests (e.g. [Postman](https://www.postman.com/), [curl](https://curl.se/docs/httpscripting.html), [VSCode's REST extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client))
- An MQTT broker running locally (e.g. [Mosquitto](https://mosquitto.org/))

Steps:

- Start the MQTT broker e.g. `mosquitto -p 1883 -v` to run the Mosquitto MQTT broker on port `1883`
- Subscribe to the MQTT broker topics `request/demo/1` and `response/demo/1` by running `mosquitto_sub -t request/demo/1` and `mosquitto_sub -t response/demo/1` in separate terminals
- Start the Server by running `npm run start`
- Send a POST request to `http://localhost:3000/api/request/demo/1` with a JSON body e.g. create a file `demo.rest` in VSCode and paste the following lines into the file (send the request by hitting `Ctrl + Q`):

```
###
POST http://localhost:3000/api/request/demo/1 HTTP/1.1
Content-Type:  application/json

{
	"message": "Hello!"
}
```

- In the terminal subscribed to `request/demo/1`, the request body is printed, however nothing is printed in the terminal subscribed to `response/demo/1`. This means the server has successfully published to the "request" topic and is waiting for a component to respond. In production, there would be a component who has just received the sent message and would publish to the "response" topic.
  ![terminal](https://i.imgur.com/7XZcUhI.png)
- To simulate the behavior of another component run the command `mosquitto_pub -t response/demo/1 -m "{ \"message\": \"Hello to you too!\" }"` in another terminal
- Now we not only see the sent message in the "response" terminal, but we also see the HTTP response in VSCode, which is what the Server received on the "response" topic and returns to the client
![response](https://i.imgur.com/pUU3n8S.png) ![api](https://i.imgur.com/PZ0rnb9.png)

## Authors and acknowledgment

See in the [t3-project README](https://git.chalmers.se/courses/dit355/dit356-2022/t-3/t3-project/-/tree/main#user-content-authors-and-acknowledgment)

## Roadmap

See in the [t3-project README](https://git.chalmers.se/courses/dit355/dit356-2022/t-3/t3-project/-/tree/main#user-content-roadmap)
