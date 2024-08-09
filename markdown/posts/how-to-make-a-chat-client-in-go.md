---
title: "How to Build a TCP Terminal Chat Program in Go Using Standard Libraries"
date: "2024-08-09"
description: "Buckle up, we're building a tcp chat client in go, only using standard libraries. Also, we make it pretty with colors!"
author: "tr1p"
image: "/img/tcp-chat-demo.webm"
keywords:
  - Go Chat Service
  - GoLang
  - Go
  - TCP
  - Colors
---


# How to Build a TCP Terminal Chat Program in Go Using Standard Libraries

So, you're sitting there, staring at your terminal, thinking, "Wouldn't it be cool if I could just whip up a chat program in Go?" Well, guess what? You're in luck, my friend! Today, I'm going to take you on a magical journey through the land of Go, where we'll build a TCP chat program from scratch. Buckle up, it's going to be a fun ride.

### Step 1: Setting Up Shop

First things first, let's get organized.
Here’s the plan:

```
/internal
  /chat
    chatservice.go
    color.go
/cmd
  client.go
  server.go
```

What’s happening here? Well, `internal/chat` is where all the magic happens—the core chat service and some nifty color tricks. Meanwhile, `cmd` is where our chat client and server entry points live. 

### Step 2: Crafting the Chat Service

Onto the good stuff. The `ChatService` is where it all comes together. This bad boy will handle everything from managing client connections to passing notes between users like it's high school all over again.

```go
// internal/chat/chatservice.go
package chat

import (
    "bufio"
    "fmt"
    "net"
    "strings"
    "sync"
)

type ChatService struct {
    server  net.Listener
    clients map[string]*net.Conn
    mu      sync.Mutex
}

func New() *ChatService {
    return &ChatService{
        clients: make(map[string]*net.Conn),
    }
}

func (c *ChatService) StartServer(p int) error {
    port := fmt.Sprintf(":%v", p)
    l, err := net.Listen("tcp", port)
    if err != nil {
        return err
    }
    defer l.Close()

    c.server = l
    fmt.Printf("Server started on port: %v\n", p)

    for {
        conn, err := l.Accept()
        if err != nil {
            return err
        }
        go c.handleConnection(conn)
    }
}
```

What’s happening here?  We’re starting a TCP server, accepting connections, and letting Go’s goroutines handle all the heavy lifting. 

### Step 3: Let’s Get Chatty

Now that we’ve got the service running, it’s time to let our clients in on the fun. Here’s where we handle all those connections and keep the conversation flowing. It’s like being the ultimate party host, but without having to clean up afterwards. If you don't feel like making your own client, just use telnet. I think that should work, right?

```go
func (c *ChatService) handleConnection(conn net.Conn) {
    defer conn.Close()
    
    connReader := bufio.NewReader(conn)
    WriteToConn(&conn, "Welcome! Please enter your name: ")

    name, _ := connReader.ReadString('\n')
    name = strings.TrimSpace(name)

    c.mu.Lock()
    c.clients[name] = &conn
    c.mu.Unlock()

    WriteToConn(&conn, "Welcome, "+name+"! Send a message via the format toUser:Message")

    for {
        clientMsg, _ := connReader.ReadString('\n')
        parts := strings.SplitN(clientMsg, ":", 2)
        if len(parts) < 2 {
            WriteToConn(&conn, "Invalid Format, please use toUser:Message")
            continue
        }

        to := strings.TrimSpace(parts[0])
        from := strings.TrimSpace(name)
        body := strings.TrimSpace(parts[1])

        c.mu.Lock()
        clientConn := c.clients[to]
        c.mu.Unlock()

        if clientConn == nil {
            WriteToConn(&conn, Colorize("Message not sent. This user does not exist.", "red"))
            continue
        }

        WriteToConn(clientConn, Colorize(from+": ", "bold_green")+body)
    }
}
```

This is where the action happens. This is where the clients connection lives on. Clients join, pick a name, and start chatting away. The `handleConnection` method is like the bouncer at the door—making sure everyone behaves and that messages get to where they need to go.

### Step 4: Adding Some Flair

What’s a chat program without a little personality, right? Let’s throw in some color to make sure things don’t get too dull. After all, if you’re going to chat in the terminal, you might as well do it in style. Doesn't it make so much more sense how color works with text now!?

```go
// internal/chat/color.go
package chat

import "fmt"

// ANSI color codes map
var ColorMap = map[string]string{
    "red":    "\033[0;31m",
    "bold_green":  "\033[1;32m",
    "reset": "\033[0m",
}

func Colorize(text, color string) string {
    return fmt.Sprintf("%s%s%s", ColorMap[color], text, ColorMap["reset"])
}
```

Boom. Now we’re talking! With a simple call to `Colorize`, we can make our messages stand out like a peacock at a pigeon party.

### Step 5: Bringing in the Client

Alright, time to let someone actually use this thing. The client program is where the user gets to strut their stuff. They’ll connect to the server, enter their name, and start chatting like it’s 1999.

```go
// cmd/client.go
package main

import (
    "bufio"
    "fmt"
    "log"
    "net"
    "os"

    "github.com/tcornell05/go/demos/tcp-chat/internal/chat"
)

func main() {
    conn, err := net.Dial("tcp", ":8081")
    if err != nil {
        log.Fatalf("Dial Error: %v", err)
    }

    connReader := bufio.NewReader(conn)
    motd, _ := connReader.ReadString('\n')
    fmt.Print(chat.Colorize(motd, "green"))
    
    stdin := bufio.NewScanner(os.Stdin)
    fmt.Print(chat.Colorize(">> ", "bold_green"))
    if stdin.Scan() {
        name := stdin.Text()
        chat.WriteToConn(&conn, name)

        intro, _ := connReader.ReadString('\n')
        fmt.Println(chat.Colorize(intro, "purple"))
    }

    go func() {
        for {
            serverMsg, _ := connReader.ReadString('\n')
            fmt.Println(chat.Colorize(serverMsg, "purple"))
        }
    }()

    for stdin.Scan() {
        msg := stdin.Text()
        if len(msg) > 0 {
            chat.WriteToConn(&conn, msg)
        }
    }
}
```

### Step 6: The Server
This is the entry point for the server.

```go
// cmd/server.go
package main

import (
    "log"

    "github.com/tcornell05/go/demos/tcp-chat/internal/chat"
)

func main() {
    chatService := chat.New()
    if err := chatService.StartServer(8081); err != nil {
        log.Fatal(err)
    }
}
```

### The Final Act: Wrapping it Up

And there you have it! You’ve just built a terminal chat program in Go. It’s simple, it’s colorful, and it’s a whole lot of fun. You could stop here, but if you’re like me, you’re already thinking about the next steps—group chats, better error handling, maybe even emojis. The sky’s the limit!

If you want to check out the code, fork it, or just poke around, head on over to the [GitHub repo](https://github.com/tcornell05/go/demos/tcp-chat). Happy coding!
