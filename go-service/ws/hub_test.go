package ws

import (
    "sync"
    "testing"
    "time"
)


func TestAuctionHub_Broadcast(t *testing.T) {
    hub := NewAuctionHub()
    go hub.Run() // start the select loop

    // 1) create two clients in the same auction room
    client1 := &Client{AuctionID: "room1", send: make(chan []byte, 1)}
    client2 := &Client{AuctionID: "room1", send: make(chan []byte, 1)}

    // 2) register them
    hub.register <- (*Client)(client1) // you'll need to cast or adapt your real Client type
    hub.register <- (*Client)(client2)

    // allow the hub to process registrations
    time.Sleep(10 * time.Millisecond)

    // 3) broadcast a message
    payload := []byte(`{"bid":500}`)
    hub.BroadcastToAuction("room1", payload)

    t.Log("broadcast sent; about to wait for clients")

    // 4) both clients should receive it
    var wg sync.WaitGroup
    wg.Add(2)

    for _, c := range [] *Client{client1, client2} {
        go func(fc *Client) {
            defer wg.Done()
            select {
            case msg := <-fc.send:
                if string(msg) != string(payload) {
                    t.Errorf("expected %s, got %s", payload, msg)
                }
            case <-time.After(50 * time.Millisecond):
                t.Error("timeout waiting for broadcast")
            }
        }(c)
    }
    wg.Wait()

    // 5) clean up: unregister clients
        hub.unregister <- (*Client)(client1)
        hub.unregister <- (*Client)(client2)
}
