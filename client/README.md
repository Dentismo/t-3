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
- Approving and denying their appointments, automatically sending a confirmation email to the recipient

### User Features

- Viewing a list of available clinics
- Viewing information about a clinic, including that clinic's location on a Google Map interface and time schedule
- Booking an appointment by filling out an appointment form
- Receiving emails about the appointment's status based on the dentist's decision

### Technology

- React and ReactDOM for creating custom frontend components and mounting them on the HTML DOM. Routing is handled using React Router and State Management is handled using React's native Hooks API
- React Big Calendar for displaying a Calendar view for viewing clinic's appointment schedules
- TypeScript for easier debugging and overall increased developer experience
- MaterialUI for creating and customizing material components, ease of styling and displaying icons
- Notistack for displaying Snackbars

## Visuals


### Use Case: User makes an appointment

![user](https://media.giphy.com/media/M7caU7Ex3L9Ki1VvEc/giphy.gif)

### Use Case: Dentist delegates appointment

![dentist](https://media.giphy.com/media/atDQoRzTqVtQImkFCD/giphy.gif)


## Installation

Running locally:

## Usage

not applicable
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Roadmap

maybe
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing

none
State if you are open to contributions and what your requirements are for accepting them.

## Authors and acknowledgment

- Georg Zsolnai (guszsoge@student.gu.se) - Developer, Product Owner, Scrum Master (weeks 1-4 and 6-7)
- Carl Dahlqvist Thuresson (carlthur@student.chalmers.se) - Developer, Scrum Master (week 5)
- Bardia Forooraghi (bardiaf@student.chalmers.se) - Developer, Backend Scrum Master (weeks 1-4)
- Ansis Plepis (gusplean@student.gu.se) - Developer, Frontend Scrum Master (weeks 1-4)
- Ivan Vidackovic (gusvidiv@student.gu.se) - Developer
- John Christopher Webb (johnchri@student.chalmers.se) - Developer
- Sam Jobara for being the greatest professor known to man

## Project status

Finished as of 17.12.2022.
