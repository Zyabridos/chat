# Simple Chat Project

### Hexlet Tests and Linter Status  
[![Actions Status](https://github.com/Zyabridos/fullstack-javascript-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Zyabridos/fullstack-javascript-project-12/actions)

## Project Description

This is a 3-page chat application where users can log in, sign up, and participate in chats. The app includes the following features:

- **Login/Signup**: Log in using the credentials (username: admin, password: admin) or create a new account on the signup page.
- **Channels**: Users can join different chat channels, write messages, and switch between channels.
- **Channel Management**: Users can rename or delete channels they have created.

# Deployed version
[Deployed project](https://slack-chat-jade.vercel.app)
Login: admin, password: admin. Or alternativelly you can Sign in by creating an account

# Project Setup

This project uses a `Makefile` to simplify common development tasks. Below are the steps for installation, development, and building the project.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (with npm)
- [Make](https://www.gnu.org/software/make/)
- [Docker](https://www.docker.com/) (for containerized setup)

## Installation

To install project dependencies, run:

```bash
make install
```

This will run `npm ci` to install dependencies.

## Development

To start both the frontend and backend in development mode, run:

```bash
make develop
```

## Building the Project

To build the frontend for production, run:

```bash
make build
```

This will:

1. Remove the existing `frontend/dist` directory.
2. Build the frontend using `npm run build`.

## Start the Project

To start the built app, run:

```bash
make start
```

This command will launch the app. By default, it should be accessible at localhost:3000. If you cannot access the app at this address, check the terminal output for the correct URL or any errors related to the server startup.


## Summary of Makefile Commands

| Command               | Description                                        |
|-------------------    |----------------------------------------------------|
| `make install`        | Installs dependencies using `npm ci`.              |               
| `make develop`        | Runs both the frontend and backend simultaneously. |
| `make build`          | Builds the frontend for production.                |
| `make start`          | Starts the built application.                      |

## Docker Usage
You can also run the app inside a Docker container. This is especially useful for testing or deploying in a consistent environment.

### Build Docker Image
```bash
make docker-build
```
This builds the Docker image and tags it as chat-frontend.

### Start Docker Container
```bash
make docker-start
```
Runs the container and exposes the app on [http://localhost:3000](http://localhost:3000)

### Stop Docker Container
```bash
make docker-stop
```
Stops and removes the container.

### Clean Up Docker Resources
```bash
make docker-clean
```
Stops and removes the container and image, and prunes volumes.