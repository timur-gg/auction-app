package ws

import (
	"log"
)

// Message encapsulates data to broadcast to a specific auction room
// AuctionID identifies the room, Data is the payload sent to all clients
// (could be JSON-encoded bid updates)
type Message struct {
	AuctionID string
	Data      []byte
}

// AuctionHub maintains the set of active clients for each auction room and broadcasts messages.
type AuctionHub struct {
	// rooms maps auctionID to the set of clients subscribed to that auction
	rooms      map[string]map[*Client]bool
	register   chan *Client
	unregister chan *Client
	broadcast  chan *Message
}

// NewAuctionHub creates an AuctionHub with initialized channels and empty room map.
func NewAuctionHub() *AuctionHub {
	return &AuctionHub{
		rooms:      make(map[string]map[*Client]bool),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		broadcast:  make(chan *Message),
	}
}


// Run listens on register, unregister, and broadcast channels to manage clients and messages.
func (h *AuctionHub) Run() {
	for {
		select {
		case client := <-h.register:
      log.Printf("Hub: registering client for auction %s ", client.AuctionID)
			clients := h.rooms[client.AuctionID]
			if clients == nil {
				clients = make(map[*Client]bool)
				h.rooms[client.AuctionID] = clients
			}
			h.rooms[client.AuctionID][client] = true

		case client := <-h.unregister:
			clients := h.rooms[client.AuctionID]
			if clients != nil {
				if _, ok := clients[client]; ok {
					delete(clients, client)
					close(client.send)
					if len(clients) == 0 {
						delete(h.rooms, client.AuctionID)
					}
				}
			}

		case msg := <-h.broadcast:
      log.Printf(" Hub: broadcasting to room %s", msg.AuctionID)
			clients := h.rooms[msg.AuctionID]
			for client := range clients {
				select {
				case client.send <- msg.Data:
				default:
					// If send channel is blocked, remove client
					close(client.send)
					delete(clients, client)
				}
			}

		}
	}
}

// BroadcastToAuction sends a message payload to all clients in the given auction room.
func (h *AuctionHub) BroadcastToAuction(auctionID string, data []byte) {
	h.broadcast <- &Message{
		AuctionID: auctionID,
		Data:      data,
	}
}

