# Containerized Full-Stack Application

A full-stack application with a **Node.js/Express frontend** and a **Python/Flask backend**, containerized with Docker and orchestrated using Docker Compose. A Jenkins CI pipeline automates testing, image building, deployment to containers, health checks, and integration testing.

## Tech Stack

- **Frontend:** Node.js, Express.js
- **Backend:** Python, Flask
- **Containers:** Docker, Docker Compose
- **CI/CD:** Jenkins
- **Version Control:** Git, GitHub

## Architecture

```text
                 User
                   |
                   v
          Node.js / Express
              Frontend
                   |
                   v
             Flask Backend
                 API
                   |
                   v
          Docker Containers
```

The frontend and backend run as separate services connected through a Docker Compose network.

## Project Structure

```text
containerized-fullstack-app/
+-- backend/
|   +-- app.py
|   +-- Dockerfile
|   +-- requirements.txt
+-- frontend/
|   +-- Dockerfile
|   +-- package.json
+-- docker-compose.yml
+-- Jenkinsfile
+-- README.md```

## CI/CD Pipeline

The Jenkins pipeline includes these stages:

1. **Checkout** — Retrieves source code from Git.
2. **Validate Configuration** — Validates the Docker Compose configuration.
3. **Run Tests** — Installs backend dependencies and runs pytest.
4. **Build Docker Images** — Builds the application images.
5. **Start Application** — Starts the frontend and backend containers.
6. **Health Check** — Checks backend and frontend health endpoints.
7. **Integration Test** — Verifies the backend API response.
8. **Cleanup** — Stops and removes the application containers and network using `docker compose down`.

The Jenkins pipeline is configured to use a dedicated Docker-in-Docker daemon with the VFS storage driver.

## Prerequisites

- Git
- Docker Desktop or Docker Engine
- Docker Compose
- Jenkins, if running the CI pipeline

## Run Locally

Clone the repository:

```bash
git clone https://github.com/aseem-goyal/containerized-fullstack-app.git
cd containerized-fullstack-app
```

Validate the Compose configuration:

```bash
docker compose config
```

Build and start the application:

```bash
docker compose up --build -d
```

Inspect the running services:

```bash
docker compose ps
```

Check the backend health endpoint at `http://localhost:5000/health`.

Check the frontend at `http://localhost:3000`.

Stop the application:

```bash
docker compose down
```

## Testing

The Jenkins pipeline runs backend tests with pytest, checks the frontend and backend health endpoints, and verifies that the backend API returns a successful response.

## Learning Outcomes

- Containerizing a full-stack application
- Managing multi-container applications with Docker Compose
- Automating CI workflows with Jenkins
- Running application health checks and integration tests
- Managing code changes with Git and GitHub

## Author

**Aseem Goyal**
