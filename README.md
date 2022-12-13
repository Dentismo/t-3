# T3 Project

## Name

Dentismo Client/Server component

## Description

This package is the Client/Server component of the Dentismo System. It is the entry point of the system and it consists of:

- The [`client`](https://git.chalmers.se/courses/dit355/dit356-2022/t-3/t3-project/-/blob/main/client/README.md) package which provides users with a Graphical Interface for interacing with the system
- The [`server`](https://git.chalmers.se/courses/dit355/dit356-2022/t-3/t3-project/-/blob/main/server/README.md) package which runs the HTTP server used by the `client` package to communicate with other components via a MQTT broker

### The Flow

1. Every action dispatched against the system begins in the frontend, where a certain user event is handled (on form submit, on button click etc).
2. The client then makes an API call against the server, which triggers the server to subscribe and publish to the MQTT broker on the topic corresponding to the API route.
3. One of the backend components, which is subscribed to the topic from **Step 2**, then responds to the received message by processing the incoming payload and publishing the response
4. The server receives the response from the MQTT broker and returns it as an HTTP response to the client
5. The client receives the response and parses it to JSON.

See the `server` package [README](https://git.chalmers.se/courses/dit355/dit356-2022/t-3/t3-project/-/blob/main/server/README.md) for a demonstration or the [MQTT Topic Definition](https://git.chalmers.se/courses/dit355/dit356-2022/t-3/documentation/-/blob/main/MQTT.md) for a more in-depth guide on how communications are handled.

### Technology

#### Frontend Technologies

- [React](https://reactjs.org/docs/react-api.html) and [ReactDOM](https://reactjs.org/docs/react-dom.html) for creating custom frontend components and mounting them on the HTML DOM. Routing is handled using [React Router](https://reactrouter.com/en/main) and State Management is handled using React's native [Hooks API](https://reactjs.org/docs/hooks-reference.html)
- [React Big Calendar](https://www.npmjs.com/package/react-big-calendar) for displaying a Calendar view for viewing clinic's appointment schedules
- [TypeScript](https://www.typescriptlang.org/) for easier debugging and overall increased developer experience (utilized only in the `client` package)
- [MaterialUI](https://mui.com/) for creating and customizing material components, ease of styling and displaying icons
- [Notistack](https://notistack.com/) for displaying Snackbars

#### Backend Technologies

- [MongoDB Atlas](https://www.mongodb.com/atlas/database) for creating a non-relational database
- [Mongoose](https://mongoosejs.com/) for establishing a connection with the MongoDB database and persisting data to it
- [Express](https://expressjs.com/) for starting a HTTP server
- [MQTT.js](https://github.com/mqttjs/MQTT.js) for creating a MQTT client for the Node runtime
- [bcrypt](https://www.npmjs.com/package/bcrypt) for hashing dentist passwords before publishing them
- [Nodemailer](https://nodemailer.com/about/) for setting up a SMTP transporter and sending emails

## Installation

Requirements:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-The-Command-Line) - confirm by running `git --version`
- [Node](https://nodejs.org/en/) - confirm by running `node --version`
- [Node Package Manager](https://www.npmjs.com/) (comes with Node) - confirm by running `npm --version`
- [Mosquitto](https://mosquitto.org/) - confirm by running `mosquitto -h`

To run the application locally:

- Clone the **Client/Server** component by running `git clone https://git.chalmers.se/courses/dit355/dit356-2022/t-3/t3-project.git` in a terminal and start it by running `npm run start`
- Clone the **Availability** component by running `git clone https://git.chalmers.se/courses/dit355/dit356-2022/t-3/authentication` and start it by running `cd authentication && npm run start`
- Clone the **Availability Checker** component by running `git clone https://git.chalmers.se/courses/dit355/dit356-2022/t-3/availability-checker.git` in a terminal and start it by running `cd availability-checker && npm run start`
- Clone the **Booking Manager** component by running `git clone https://git.chalmers.se/courses/dit355/dit356-2022/t-3/booking-manager.git` in a terminal and start it by running `cd booking-manager && npm run start`
- Clone the **Clinic Portal** component by running `git clone https://git.chalmers.se/courses/dit355/dit356-2022/t-3/clinic-portal.git` in a terminal and start it by running `cd clinic-portal && npm run start`
- Open http://localhost:8080 in your browser if the application wasn't automatically started

Once in the browser, you should see the home page.
![taw](https://i.imgur.com/3imbo4G.png) To access the dashboard page, you must login as dentist. You can use the following credentials to login using a demo account: demo@dentismo.com password123
![dashboard](http://image.to/dashboard)

## Authors and acknowledgment

- Georg Zsolnai (guszsoge@student.gu.se) - Developer, Product Owner, Scrum Master (weeks 1-4 and 6-7)
- Carl Dahlqvist Thuresson (carlthur@student.chalmers.se) - Developer, Scrum Master (week 5)
- Bardia Forooraghi (bardiaf@student.chalmers.se) - Developer, Backend Scrum Master (weeks 1-4)
- Ansis Plepis (gusplean@student.gu.se) - Developer, Frontend Scrum Master (weeks 1-4)
- Ivan Vidackovic (gusvidiv@student.gu.se) - Developer
- John Christopher Webb (johnchri@student.chalmers.se) - Developer

## Roadmap

- As was already discussed, in order for the frontend to communicate with other components, it does so by using HTTP, and relying on the server to subscribe and publish to the MQTT broker. This approach was used due to time constraints and difficulties in implementing a MQTT client for React. This would be the first issue for future releases, as it would remove the need for a HTTP server, thus increasing the system's Fault Tolerance.

- Due to time constraints, for displaying clinic time schedules, we used [React Big Calendar](https://github.com/jquense/react-big-calendar). In future releases, we would like to move to a custom implementation of a Calendar component, since we could make it more customizable, fit better to our theme, and make a more appropriate API for feeding it events to display, thus increasing the system's Usability and Modifiability.

- Another problem we faced was the high number of terminal sessions running in parallel, which made the development process much more confusing and difficult. The solution to this is to deploy our backend components and to use an MQTT Broker running on the cloud. This would make our system more testable (since now different users can publish to the same MQTT Broker), traceable (since all logs and activity belonging to a component can be viewed in a single place), deployable (since we will be able to automatically deploy our system after pushing to the remote repository, made possible by custom pipelines).

## Project Status

Finished as of 17.12.2022.
