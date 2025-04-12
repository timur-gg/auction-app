package main

import (
	"fmt"
	"log"
	"net/http"
)

func handleRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello from Go Auction Service 🚀")
}

func main() {
	http.HandleFunc("/", handleRoot)

	port := "8080"
	fmt.Printf("Starting Go service on port %s...\n", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
