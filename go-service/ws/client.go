package ws

import (
//     "log"
//     "net/http"
//     "github.com/gorilla/websocket"
)


// Client represents a single WebSocket connection to an auction room.
type Client struct {
    // AuctionID identifies which auction room this client is subscribed to
    AuctionID string
    // conn is the underlying WebSocket connection
//     conn *websocket.Conn
    // send is a buffered channel of outbound messages (as raw bytes)
    send chan []byte
    // hub reference to register/unregister
    hub *AuctionHub
}

func (c *Client) receive() []byte {
    return <-c.send
}
