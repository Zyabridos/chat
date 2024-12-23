# Simple Chat Project

### Hexlet Tests and Linter Status  
[![Actions Status](https://github.com/Zyabridos/fullstack-javascript-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Zyabridos/fullstack-javascript-project-12/actions)

# Project description

Chat Project is a project currently under development.

# Project Setup

This project uses a `Makefile` to simplify common development tasks. Below are the steps for installation, development, and building the project.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (with npm)
- [Make](https://www.gnu.org/software/make/)

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

### Starting the Frontend

To start the frontend separately:

```bash
make start-frontend
```

This will navigate to the `frontend` directory and run `npm run dev`.

### Starting the Backend

To start the backend separately:

```bash
make start-backend
```

This will navigate to the `frontend` directory and run `npx start-server`.

## Building the Project

To build the frontend for production, run:

```bash
make build
```

This will:

1. Remove the existing `frontend/dist` directory.
2. Build the frontend using `npm run build`.

## Cleaning Up

Ensure the `dist` directory is cleaned before building:

```bash
rm -rf frontend/dist
```

## Summary of Makefile Commands

| Command               | Description                                        |
|-------------------    |----------------------------------------------------|
| `make install`        | Installs dependencies using `npm ci`.              |
| `make start-frontend` | Starts the frontend development server.            |
| `make start-backend`  | Starts the backend server.                         |
| `make develop`        | Runs both the frontend and backend simultaneously. |
| `make build`          | Builds the frontend for production.                |
