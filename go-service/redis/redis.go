package redisdb

import (
    "context"
    "fmt"
    "os"
    "strconv"
    "time"
    "github.com/redis/go-redis/v9"
)



var ctx = context.Background()
var rdb *redis.Client

func InitRedis() *redis.Client {
    addr := os.Getenv("REDIS_ADDR")
    if addr == "" {
        addr = "localhost:6379"
    }

    rdb = redis.NewClient(&redis.Options{
        Addr: addr,
        DB:   0,
    })

    _, err := rdb.Ping(ctx).Result()
    if err != nil {
        panic(fmt.Sprintf("❌ Failed to connect to Redis: %v", err))
    }

    fmt.Println("✅ Connected to Redis")
    return rdb
}

func SaveBid(auctionID, userID string, amount float64) error {
    timestamp := time.Now().Unix()
    bidKey := fmt.Sprintf("auction:%s:bids", auctionID)
    score := float64(timestamp)
    value := fmt.Sprintf("%s:%.2f", userID, amount)

    // Add bid to sorted set
    if err := rdb.ZAdd(ctx, bidKey, redis.Z{Score: score, Member: value}).Err(); err != nil {
        return err
    }

    // Update highest bid
    return rdb.HSet(ctx, fmt.Sprintf("auction:%s:highestBid", auctionID), "userID", userID, "amount", amount).Err()
}

func GetCurrentHighestBid(auctionID string) (float64, string, error) {
    data, err := rdb.HGetAll(ctx, fmt.Sprintf("auction:%s:highestBid", auctionID)).Result()
    if err != nil || len(data) == 0 {
        return 0, "", err
    }

    amount, _ := strconv.ParseFloat(data["amount"], 64)
    return amount, data["userID"], nil
}

func ResetAuctionTimer(auctionID string) error {
    key := fmt.Sprintf("auction:%s:timer", auctionID)
    return rdb.Set(ctx, key, 120, 2*time.Minute).Err()
}

func GetRemainingTime(auctionID string) (int, error) {
    key := fmt.Sprintf("auction:%s:timer", auctionID)
    ttl, err := rdb.TTL(ctx, key).Result()
    if err != nil {
        return 0, err
    }
    return int(ttl.Seconds()), nil
}

func IsUserAllowedToBid(auctionID, userID string) (bool, error) {
    key := fmt.Sprintf("auction:%s:participants", auctionID)
    return rdb.SIsMember(ctx, key, userID).Result()
}
