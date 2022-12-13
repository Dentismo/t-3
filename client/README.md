# T3 Project

## Name

Dentismo Client: The frontend of the Dentismo System

## Description

This package is the Client-side of the Dentismo Client/Server component. It provides a simple, understandable graphical interface for dentists to respond to their appointments, and users to see information about provided Clinics and fill out appointment forms. To interact with other components, the Dentismo Client only directly talks to the Dentismo Server.

### Pages

- Home Page (`­/`) - Explains our provided services and lists available Clinics (each navigating to `/clinic/:id`)
- Clinic Page (`/clinic/:id`) - Displays information about the Clinic - name, address (with a Google Map view) and opening times per work day. A Calendar view is also displayed, where users can see the corresponding Clinic's schedule. Selecting a time slot will prompt the user with an Appointment Form
- Login Page (`/login`) - Displays a login form, which is intended for Dentists to authorize themselves
- Dashboard Page (`/dashboard`) - Displays a tab interface for viewing the corresponding Clinic's appointments that are either pending, approved or denied.

### Dentist Features

- Logging in using email/password credentials
- Viewing a list of user-requested appointments sorted by their status (pending, approved, and denied), appointment date, and appointment time
- Approving and denying their appointments, automatically sending a confirmation email to the recipient. If it is needed for any reason, it is also possible to resend confirmation emails to already delegated appointments.
- Deleting appointments that have already been delegated.

### User Features

- Viewing a list of available clinics
- Viewing information about a clinic, including that clinic's location on a Google Map interface, dentists as well as time schedule
- Booking an appointment with a clinic by filling out an appointment form
- Receiving emails about the appointment's status based on the dentist's decision

### Technology

- [React](https://reactjs.org/docs/react-api.html) and [ReactDOM](https://reactjs.org/docs/react-dom.html) for creating custom frontend components and mounting them on the HTML DOM. Routing is handled using [React Router](https://reactrouter.com/en/main) and State Management is handled using React's native [Hooks API](https://reactjs.org/docs/hooks-reference.html)
- [React Big Calendar](https://www.npmjs.com/package/react-big-calendar) for displaying a Calendar view for viewing clinic's appointment schedules
- [TypeScript](https://www.typescriptlang.org/) for easier debugging and overall increased developer experience
- [MaterialUI](https://mui.com/) for creating and customizing material components, ease of styling and displaying icons
- [Notistack](https://notistack.com/) for displaying Snackbars

## Visuals

### Use Case: User makes an appointment

![user](https://media.giphy.com/media/M7caU7Ex3L9Ki1VvEc/giphy.gif)

### Use Case: Dentist delegates appointment

![dentist](https://media.giphy.com/media/atDQoRzTqVtQImkFCD/giphy.gif)

## Installation

Requirements:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-The-Command-Line) - confirm using `git --version`
- [Node](https://nodejs.org/en/) - confirm using `node --version`
- [Node Package Manager](https://www.npmjs.com/) (comes with Node) - confirm using `npm --version`

To run the application locally:

- First clone the project by running `git clone git@git.chalmers.se:courses/dit355/dit356-2022/t-3/t3-project.git` in a terminal
- Move into the `client` directory by running `cd t3-project/client`
- Before running the application, you must install required dependencies using `npm install`
- Run the development server using `npm run start` and navigate to http://localhost:8080 in your browser if the application wasn't started automatically
- For creating an optimized, ready to serve JS [bundle](https://medium.com/@gimenete/how-javascript-bundlers-work-1fc0d0caf2da), run `npm run build` and serve the `build` directory by running `npm install -g server && serve -s build`

## Authors and acknowledgment

See in the [t3-project README](https://git.chalmers.se/courses/dit355/dit356-2022/t-3/t3-project/-/tree/main#user-content-authors-and-acknowledgment)

## Roadmap

See in the [t3-project README](https://git.chalmers.se/courses/dit355/dit356-2022/t-3/t3-project/-/tree/main#user-content-roadmap)
