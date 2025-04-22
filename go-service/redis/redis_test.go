package redisdb

import (
    "fmt"
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

// Empty auction should return zero values
func TestGetCurrentHighestBidEmpty(t *testing.T) {
    InitRedis()
    auctionID := "empty-auction"

    // Clean slate
    rdb.Del(ctx, fmt.Sprintf("auction:%s:highestBid", auctionID))
    rdb.Del(ctx, fmt.Sprintf("auction:%s:bids", auctionID))

    amount, user, err := GetCurrentHighestBid(auctionID)
    if err != nil {
        t.Fatalf("expected no error for empty auction, got %v", err)
    }
    if amount != 0 || user != "" {
        t.Errorf("expected amount=0 and user=\"\", got amount=%.2f, user=%s", amount, user)
    }
}


// Saved bid should be returned correctly
func TestGetCurrentHighestBidAfterSave(t *testing.T) {
    InitRedis()
    auctionID := "test-auction"
    userID := "test-user2"
    amountToSave := 123456.78

    // Clean slate
    rdb.Del(ctx, fmt.Sprintf("auction:%s:highestBid", auctionID))
    rdb.Del(ctx, fmt.Sprintf("auction:%s:bids", auctionID))

    // Save then retrieve
    if err := SaveBid(auctionID, userID, amountToSave); err != nil {
        t.Fatalf("SaveBid failed: %v", err)
    }

    amount, user, err := GetCurrentHighestBid(auctionID)
    if err != nil {
        t.Fatalf("GetCurrentHighestBid failed: %v", err)
    }
    if user != userID || amount != amountToSave {
        t.Errorf("expected user %s with amount %.2f, got user %s with amount %.2f",
            userID, amountToSave, user, amount)
    }
}
