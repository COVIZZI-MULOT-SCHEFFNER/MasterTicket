# Master Ticket Application

Welcome to the Master Ticket application, a robust platform for event reservation and management. Seamlessly set up and launch both the front and back end with Docker, ensuring a consistent development and deployment environment.

## Prerequisites

- Docker
- Docker Compose

## Quickstart with Docker Compose

To get the full stack up and running with Docker Compose, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/COVIZZI-MULOT-SCHEFFNER/MasterTicket.git
cd master-ticket
```

2. Use Docker Compose to build and launch the containers:
```bash
docker-compose up --build -d
```
Access the front office at http://localhost:3500 with its Swagger documentation available at http://localhost:3500/api. The back office is accessible at http://localhost:3600, and its Swagger documentation can be found at http://localhost:3600/api.

## Features
- Event reservation system
- Reservation tracking
- Profile management
- Email notifications with Mailhog simulation (configurable for personal SMTP servers)

## Additional Docker Commands
To stop and remove the Docker containers, use:
```bash
docker-compose down
```

## Mail Configuration
The application is configured to use Mailhog for email simulation. If you prefer to use a personal SMTP server, modify the mail configuration settings in docker-compose.yml.

We hope you enjoy the seamless event management experience with Master Ticket!