# Master Ticket Application
Welcome to the Master Ticket application, where you can manage and attend the best events around! This project is structured to run both front-end and back-end components using Docker for ease of setup and consistency across environments.

## Prerequisites
- Docker
- Docker Compose
- Node.js (if running the front-end outside Docker)
- npm or yarn

## Getting Started
Using Docker Compose
To run the entire application stack (including the front-end if integrated):

1. Clone the repository:
```bash
git clone https://github.com/COVIZZI-MULOT-SCHEFFNER/MasterTicket.git
cd master-ticket
```

2. Build and run the containers:
```bash
docker-compose up --build -d
```

This command builds the Docker images for both the back-end services and the React front-end (if configured), and starts the containers.

Running Front-End Separately
If the front-end is not included in Docker and you prefer to run it locally for development purposes:

1. Navigate to the front-end directory:
```bash
cd masterticket-app
```

2. Install dependencies:
```bash
npm install
```
3. Start the application:
```bash
npm start
```
This will start the React application on http://localhost:3000 by default.

## Using the Application
Once the application is running, access the front-end via your web browser:

- Local Development: http://localhost:3000
- Docker Setup: URL depends on your Docker configuration; typically it remains http://localhost:3000 if port forwarding is configured similarly.

## Additional Commands
To stop and remove containers:
```bash
docker-compose down
```