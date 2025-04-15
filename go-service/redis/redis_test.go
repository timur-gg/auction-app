package redisdb

import (
    "testing"
)

func TestSaveAndGetBid(t *testing.T) {
    InitRedis()

    auctionID := "test-auction"
    userID := "test-user2"
    amount := 999000.00

    if err := SaveBid(auctionID, userID, amount); err != nil {
        t.Fatalf("SaveBid failed: %v", err)
    }

    gotAmount, gotUser, err := GetCurrentHighestBid(auctionID)
    if err != nil {
        t.Fatalf("GetCurrentHighestBid failed: %v", err)
    }

    if gotUser != userID || gotAmount != amount {
        t.Errorf("Expected %s with %.2f, got %s with %.2f", userID, amount, gotUser, gotAmount)
    }
}
