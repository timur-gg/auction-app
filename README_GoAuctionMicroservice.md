# 🧠 Go Auction Microservice

A real-time bidding service for pre-construction condo auctions.  
Handles live bids, Redis-based state, WebSocket broadcasting to clients, and gRPC communication with the NestJS backend.

---

## 🚀 Features

- WebSocket server for live bid interaction
- Redis integration for auction state, bid validation, and countdown timers
- gRPC client to notify NestJS when auctions end
- Modular structure for scalability and performance
- Per-auction timer with 2-minute reset on each bid

---

## 📂 File Structure

```
auction-service/
├── cmd/
│   └── main.go                # Service entrypoint
├── internal/
│   ├── ws/
│   │   ├── hub.go             # Manages connected clients, broadcasts
│   │   ├── client.go          # WebSocket connection handler per client
│   │   └── handler.go         # HTTP handler for /ws route
│   ├── redis/
│   │   └── redis.go           # Redis client and helper functions
│   ├── grpc/
│   │   ├── client.go          # gRPC client to NestJS
│   │   └── auction.proto      # Proto file definition
│   ├── timer/
│   │   └── timer.go           # Countdown logic per auction
│   └── bidding/
│       └── bidding.go         # Core bid validation and state management
├── go.mod
└── README.md
```

---

## 🧰 Technologies Used

- Go 1.21+
- Redis (v7+)
- Gorilla WebSocket
- gRPC (Google Protobuf)
- NestJS (as gRPC server)

---

## 📦 Setup

### 1. Install Dependencies
```bash
go mod tidy
```

### 2. Run the Service
```bash
go run cmd/main.go
```

### 3. Connect to WebSocket
Connect from frontend to:
```
ws://localhost:8080/ws?auction_id=123&token=JWT_TOKEN
```

---

## 🔁 Example Auction Workflow

### ⏱ Auction Starts (from NestJS)
- Auction is created in DB
- NestJS seeds Redis:
  - `auction:123:status = open`
  - `auction:123:highestBid = {"": 0}`
  - `auction:123:participants = {uid1, uid2}`

---

### 💬 WebSocket Bid Flow

1. **Frontend connects via WebSocket** to `ws://.../ws?auction_id=123&token=abc`
2. **Client sends bid JSON:**
```json
{
  "user_id": "uid1",
  "amount": 505000
}
```
3. **Go service:**
   - Validates bid (increment, eligibility)
   - Updates Redis: `highestBid`, `bids`, resets `timer`
   - Broadcasts update to all auction participants

---

### ⏰ Timer Logic

- Each valid bid resets a 2-minute timer
- When timer hits zero with no new bids:
  - Auction is locked
  - gRPC call to NestJS with:
    ```json
    {
      "auction_id": "123",
      "winner_id": "uid1",
      "winning_bid": 610000,
      "timestamp": 1712928900
    }
    ```

---

### 🧠 NestJS Responsibilities

- Receives gRPC data
- Stores final result in Postgres
- Triggers post-auction document workflow
- Notifies builder and winning buyer

---

## 📌 Redis Key Format

| Key | Type | Example |
|-----|------|---------|
| `auction:123:status` | string | `open` / `ended` |
| `auction:123:highestBid` | hash | `{ "uid1": 600000 }` |
| `auction:123:bids` | ZSET | `{score: timestamp, value: "uid1:600000"}` |
| `auction:123:participants` | set | `uid1`, `uid2` |
| `auction:123:timer` | string | TTL-managed countdown |

---

## ✅ To-Do Features

- [ ] JWT verification on connect
- [ ] WebSocket ping/pong keepalive
- [ ] Pub/Sub Redis for fan-out
- [ ] Auction cancel/resume
- [ ] Rate limiting per client

---

## 📂 File Implementation Structure 

```
auction-service/
├── cmd/
│   └── main.go
│       - main(): Service entrypoint.
│       - initRedisClient(): Initializes Redis connection.
│       - initGRPCClient(): Initializes gRPC client to NestJS.
│       - serveHTTP(): Starts HTTP server and registers routes.
│
├── internal/
│   ├── ws/
│   │   ├── hub.go
│   │   │   - type AuctionHub: Central bid manager.
│   │   │   - Run(): Main loop handling clients and broadcasts.
│   │   │   - BroadcastToAuction(): Sends messages to auction rooms.
│   │   │
│   │   ├── client.go
│   │   │   - type Client: One WebSocket connection.
│   │   │   - ReadPump(): Listens to frontend.
│   │   │   - WritePump(): Sends messages to frontend.
│   │   │   - Close(): Disconnects cleanly.
│   │   │
│   │   └── handler.go
│   │       - ServeWS(): Upgrades HTTP to WebSocket and authenticates.
│   │       - authenticateConnection(): Validates JWT (optional).
│
│   ├── redis/
│   │   └── redis.go
│   │       - InitRedis(): Creates Redis client.
│   │       - GetCurrentBid(), SaveBid(): Bid handling helpers.
│   │       - IsUserEligible(), SetAuctionStatus(), ResetAuctionTimer(), LockAuction()
│   │       - type BidEntry: Struct to represent bid record.
│
│   ├── grpc/
│   │   ├── client.go
│   │   │   - InitAuctionGRPCClient(): Connects to NestJS.
│   │   │   - SendAuctionResult(): Finalizes auction in Nest.
│   │   │
│   │   └── auction.proto
│   │       - CompleteAuction(): RPC call for auction results.
│   │       - CompleteAuctionRequest, AuctionResponse: Message types.
│
│   ├── timer/
│   │   └── timer.go
│   │       - StartAuctionTimer(): Starts per-auction countdown.
│   │       - ResetTimer(): Resets time on new bids.
│   │       - EndAuction(): Ends auction and notifies Nest.
│
│   └── bidding/
│       └── bidding.go
│           - HandleBid(): Entry for bid logic.
│           - ValidateBid(): Checks increment, eligibility.
│           - BroadcastNewBid(): Sends bid updates to frontend.
│
├── go.mod
│   - Go module and dependency manifest.
│
└── README.md
    - This documentation file.
```

---

## 🔐 Authentication & Validation Strategy

### 1. WebSocket (Frontend ↔ Go)
**JWT (Bearer token via query param)**

- Validate token signature and expiry.
- Extract `userID` from JWT and verify it's in `auction:{id}:participants` (Redis).
- Check `auction:{id}:status == open`.

**Flow:**
1. Client connects to: `ws://.../ws?auction_id=123&token=JWT`
2. Go parses and validates JWT.
3. Checks Redis participant list.
4. If valid, accepts connection and allows bidding.

---

### 2. gRPC (Go → NestJS)
**Service-to-service auth using metadata**

- Add shared `authorization` token in metadata header.
- NestJS validates that token before processing gRPC calls.

**Example:**
```go
md := metadata.Pairs("authorization", "Bearer SERVICE_SECRET")
```

---

## 🔑 Shared Auth Strategy Summary

| Layer      | Auth Type        | What’s Validated                          |
|------------|------------------|-------------------------------------------|
| WebSocket  | JWT               | userID, token expiry, Redis participant   |
| Redis      | Internal logic    | Auction rules, validated in Go            |
| gRPC       | Bearer/mTLS       | Service identity via metadata header      |

**Bonus:** Use short-lived JWTs (5–15 min) with auction ID in the payload to limit misuse.
