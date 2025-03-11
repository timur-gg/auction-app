# Auction App - NestJS Backend

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

Run `nx build models` to build the library.

## Running unit tests

Run `nx test models` to execute the unit tests via [Jest](https://jestjs.io).
