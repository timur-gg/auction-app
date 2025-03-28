# Auction App - NestJS Backend

psql -U artur -d auction_db -h localhost -W

## Overview

This project is a backend service for an auction platform, built using **NestJS**. It handles user authentication, project and unit management, auction creation, bidding functionality, and real-time bid updates.

## Architecture

The system follows a **microservices-inspired architecture** with a modular NestJS setup and communication with a **Go-based auction service**.

### Components:

- **Authentication & User Management:**

  - Uses JWT authentication.
  - Handles user roles (Buyer, Builder, Admin).

- **Project & Unit Management:**

  - Builders can create projects with address and unit details.
  - Each unit can have an associated auction.

- **Auction Service:**

  - Auctions are created for individual units.
  - Auctions have a whitelist of users allowed to participate.
  - Bids are placed in real time.

- **Bid Processing:**

  - Bids are sent via WebSockets to the **Go auction service**.
  - The Go service validates and processes bids before broadcasting updates.

- **Data Flow & Communication:**
  - **REST API** for client-to-NestJS communication.
  - **gRPC** for NestJS-to-Go service interaction.
  - **WebSockets** for real-time bidding between client and Go service.

## API Endpoints

### Authentication

- `POST /auth/register` - Create a new user.
- `POST /auth/login` - Authenticate user and receive JWT.
- `GET /auth/profile` - Retrieve logged-in user details.
- `UPDATE /auth/profile` - Update user profile with relevant data.

### Projects & Units

- `POST /projects` - Create a new project (Builder only).
- `GET /projects/:id` - Retrieve project details.
- `POST /projects/:id/units` - Add a unit to a project.
- `DELETE /projects/:id/units` - Delete a unit on a project.
- `DELETE /projects/:id` - Delete a project (project data will be updated with a 'deleted' flag.

### Auctions

- `POST /auctions` - Create an auction (Builder only).
- `GET /auctions/:id` - Retrieve auction details.
- `POST /auctions/:id` - Add buyer to auction whitelist (Buyer only).

## Technologies Used

- **NestJS** (Backend framework)
- **PostgreSQL** (Database)
- **Redis** (Caching, pub/sub for real-time updates)
- **gRPC** (Inter-service communication with Go)
- **WebSockets** (Real-time bid updates)
- **JWT** (Authentication & authorization)

## Setup Instructions

### Prerequisites

- Node.js v18+
- PostgreSQL database

## Building

## Running unit tests

Run `nx test models` to execute the unit tests via [Jest](https://jestjs.io).

## Running E2E tests

Here are some curl commands to test your NestJS authentication API endpoints:
For convenience, you can save the token in an environment variable:

```bash
curl -X POST http://localhost:3000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123!",
    "passwordConfirm": "Password123!"

  }'

TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/sign-in -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"Password123!"}' | grep -o '"accessToken":"[^"]*' | sed 's/"accessToken":"//')

# Then use it in subsequent requests
```

## 1. Sign Up

```bash
curl -X POST http://localhost:3000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123!",
    "passwordConfirm": "Password123!"

  }'
```

## 2. Sign In

```bash
curl -X POST http://localhost:3000/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123!"
  }'
```

This will return an access token that you'll need to save for the next requests.

## 3. Get User Profile

```bash
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer $TOKEN"
```

## 4. Sign Out

```bash
curl -X POST http://localhost:3000/api/auth/sign-out \
  -H "Authorization: Bearer $TOKEN"
```

## 5. Create Auction

For convenience, you can save the token in an environment variable:

```bash
curl -X POST http://localhost:3000/api/auctions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "unitId": "72a592cc-8a77-4dbd-94e1-dbaa710a4f21",
    "startPrice": 999.99,
    "startTime": "2023-12-01T10:00:00Z",
    "endTime": "2023-12-31T23:59:59Z"
  }'
```

## 6. Get Auctions

```bash
curl -X GET http://localhost:3000/api/auctions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

## 7. Get Auction by Id

```bash
curl -X GET http://localhost:3000/api/auctions/AUCTION_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

## 8. Update Auction by Id

```bash
curl -X PUT http://localhost:3000/api/auctions/06629ee5-b521-443d-83b6-feae4321d8dd \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "startPrice": 1299.99,
    "status": "active"
  }'
```

## 9. Create Project

```bash
curl -X POST http://localhost:3000/api/projects \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
"name": "Test Project",
"address": "456 Queen St",
"postalCode": "M5A 1S2",
"builderId": "builder-001",
"constructionStartDate": "2024-06-01",
"completionDate": "2025-06-01"
}'
```
