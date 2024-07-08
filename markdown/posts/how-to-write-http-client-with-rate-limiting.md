---
title: "How to Effectively Query a Real-Time Rate-Limited API in Go"
date: "2024-07-03"
description: "When querying a real-time, rate-limited API in Go, it's crucial to respect the rate limits and handle retries effectively. Learn how to implement this in your Go applications"
author: "tr1p"
image: "/img/mono-vs-serverless.webp"
keywords:
    - Real-Time API Client with Go
    - REST
---
# How to Effectively Query a Real-Time Rate-Limited API in Go

## Introduction

This how-to guide describes how to effectively query a real-time, rate-limited API using Go. The implementation respects the API's rate limits and handles retries if the rate limit is exceeded, ensuring efficient and compliant data retrieval.

## Prerequisites

Before diving into the implementation, ensure you have the following:

- Go installed on your machine.
- Basic knowledge of Go programming, including goroutines and channels.
- Access to an API with documented rate limits.

## Step-by-Step Implementation

### 1. Setting Up the Project

First, create a new Go project:

```bash
mkdir real_time_api_pull
cd real_time_api_pull
go mod init real_time_api_pull
```


### 2. Import required packages

```go
package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
    "log"
    "time"
    "context"
    "os"
    "os/signal"
    "syscall"
)
```
### 2. Define Constants
```go
const (
    apiURL    = "https://api.example.com/data"
    rateLimit = 10 // Number of requests per minute
)
```
### 2. Create your function to query the API
```go
func fetchData(client *http.Client) {
    resp, err := client.Get(apiURL)
    if err != nil {
        log.Println("Error fetching data:", err)
        return
    }
    defer resp.Body.Close()

    // Check for rate limiting
    if resp.StatusCode == http.StatusTooManyRequests {
        retryAfter := resp.Header.Get("Retry-After")
        if retryAfter != "" {
            retryDuration, err := time.ParseDuration(retryAfter + "s")
            if err == nil {
                log.Printf("Rate limited, retrying after %s...\n", retryDuration)
                time.Sleep(retryDuration)
                fetchData(client)
                return
            }
        }
        log.Println("Rate limited, retrying after default 1 minute...")
        time.Sleep(time.Minute)
        fetchData(client)
        return
    }

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        log.Println("Error reading response body:", err)
        return
    }

    fmt.Println("Data received:", string(body))
}
```

### 2. Implement rate-limiting adhearance / Graceful shutdown
Use a ticker to respect the rate limit. A ticker triggers at regular intervals:
```go

func main() {
    client := &http.Client{}
    ticker := time.NewTicker(time.Minute / rateLimit)
    defer ticker.Stop()

    ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
    defer stop()

    for {
        select {
        case <-ticker.C:
            go fetchData(client)
        case <-ctx.Done():
            fmt.Println("Shutting down gracefully...")
            return
        }
    }
}
```

By following this approach, you can efficiently query a real-time, rate-limited API using Go's goroutines abd a basic ticker. This ensures that your application remains responsive, respects the rate limits, and handles retries appropriately if the rate limit is exceeded. Feel free to expand upon this basic implementation by adding more robust error handling, logging, and other necessary features to fit your specific use case. Cheers!

