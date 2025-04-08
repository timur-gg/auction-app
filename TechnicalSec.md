
# Software Requirements Specification: Pre-Construction Auction Platform

## System Design

- Modular web platform that enables builders to auction pre-construction condo units to buyers in real-time.
- Centralized NestJS API that handles user and project data.
- External Go microservice dedicated to real-time bid handling and auction lifecycle.
- PostgreSQL as the source of truth for persistent data.
- Redis used for pub/sub and caching of auction states.
- Real-time bidding over WebSockets.
- Document and identity verification for KYC compliance.

## Architecture Pattern

- **Backend**: Monolithic NestJS backend with clear domain modules (auth, users, projects, auctions).
- **Real-Time Service**: Go-based microservice for real-time auction state and bid processing.
- **Frontend**: React SPA using a component-driven architecture and state containers.
- **Microservices-Inspired** with NestJS and Go communicating over gRPC.
- WebSocket bridge from frontend to Go auction service.

## State Management

- **Frontend**: Zustand or React Query for managing user state, auction state, and caching.
- Auction states are derived from live WebSocket streams.
- Persistent user sessions managed via JWT in secure cookies or localStorage.

## Data Flow

```
[User] → [React Frontend]
         → REST (NestJS API):
            - Auth
            - Units & Projects
            - Auction metadata
         → WebSocket (Go):
            - Live bidding (emit bid / receive bid-update & countdown)
[NestJS] ↔ gRPC ↔ [Go Auction Service]
         ↔ PostgreSQL
         ↔ Redis (Auction pub/sub + caching)
```

## Technical Stack

- **Frontend**: React, TypeScript, TailwindCSS, Zustand or React Query
- **API Gateway**: NestJS (Node.js + TypeScript)
- **Auction Engine**: Go (WebSocket, gRPC)
- **Database**: PostgreSQL
- **Cache / Messaging**: Redis (Pub/Sub, live cache)
- **Auth**: JWT (PassportJS)
- **Containerization**: Docker, Docker Compose

## Authentication Process

- User registration (Buyers and Builders) via `/auth/register`
- Login with email and password returns JWT token.
- Authenticated users can access their profile and restricted routes.
- Role-based access control (`Buyer`, `Builder`, `Admin`).
- Builder accounts verified by admin to create auctions.
- Auction whitelist: buyers must register for each auction to be eligible to bid.

## Route Design

### Public
- `/` – Landing page (map and trending units)
- `/unit/:id` – Unit details
- `/project/:id` – Project overview

### Buyer Portal
- `/buyer/dashboard` – Favorites, current/registered auctions
- `/buyer/verify` – KYC document upload
- `/buyer/auction/:id` – Live auction room

### Builder Portal
- `/builder/dashboard` – Projects and auctions
- `/builder/project/:id/edit` – Update units and floorplans
- `/builder/documents` – View and upload documents

### Admin (optional)
- `/admin/users` – Verify and manage users
- `/admin/projects` – Approve or flag project info
- `/admin/auctions` – Moderate auction rules

## API Design

### Authentication
- `POST /auth/register` – Create new account
- `POST /auth/login` – JWT-based login
- `GET /auth/profile` – Get current user info
- `PUT /auth/profile` – Update profile data

### Projects & Units
- `POST /projects` – Create project (Builder)
- `GET /projects/:id` – View project
- `POST /projects/:id/units` – Add unit
- `DELETE /projects/:id/units` – Delete unit
- `DELETE /projects/:id` – Flag project as deleted

### Auctions
- `POST /auctions` – Create auction (Builder)
- `GET /auctions/:id` – Get auction details
- `POST /auctions/:id` – Add buyer to whitelist

### WebSocket Events
- `connect/auction/:id`
  - `emit: bid {amount}`
  - `receive: bid-update {highestBid, bidder}`
  - `receive: countdown {secondsLeft}`

## Database Design ERD

```
Users
- id
- email
- password_hash
- role (buyer, builder, admin)
- is_verified
- created_at

Builders
- id
- user_id (FK)
- company_name
- license_number

Projects
- id
- builder_id (FK)
- name
- address
- description
- status

Units
- id
- project_id (FK)
- floor
- unit_number
- sqft
- bedrooms
- price_min
- status (upcoming, auction, sold)

Auctions
- id
- unit_id (FK)
- start_time
- end_time
- current_bid
- bid_increment
- winning_user_id (FK)

Bids
- id
- auction_id (FK)
- user_id (FK)
- amount
- timestamp

Documents
- id
- user_id (FK)
- type (id, income, etc.)
- file_url
- status (pending, approved, rejected)
```
