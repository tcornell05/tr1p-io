---
title: "Start WET, Then Go DRY: The Pragmatic Use of Go Interfaces"
date: "2024-07-10"
description: "Go interfaces are powerful, but they don't always lead to less code. It's better to start with repetition, identify natural patterns, and then abstract with interfaces or other structures."
author: "tr1p"
image: "/img/sghetti-code.png"
keywords:
  - Interfaces
  - GoLang
  - Go
  - Go Interfaces
---

### Start WET, Then Go DRY: The Pragmatic Use of Go Interfaces

There's a common misconception in Go that using interfaces will naturally lead to writing less code. It won't — at least not automatically. Reaching for interfaces too early often adds complexity you didn't need yet and abstractions that won't survive contact with real requirements.

The better approach: start WET (Write Everything Twice), let repetition accumulate, and let that repetition tell you where abstractions actually belong.

#### The Real Reason to Use Interfaces

Reducing code duplication is a side effect of interfaces, not the goal. The actual reason to introduce an interface is to **invert a dependency** — usually so you can test something in isolation, or swap an implementation without touching call sites.

You can have perfectly DRY code with zero interfaces and still end up with a tightly coupled, untestable mess. If you're introducing an interface purely to avoid repeating yourself, make sure you're not just shuffling complexity around.

Also worth knowing: the idiomatic Go convention is **accept interfaces, return concrete types**. Your functions should declare what behavior they need (via an interface parameter), but hand back something real and concrete. This keeps things flexible at the boundary without leaking abstraction everywhere.

#### Why Start WET?

Early in a project you don't know enough yet. You don't know which parts of your code will change together, which call sites will share logic, or what shape your data structures will settle into. Writing the same thing twice is a feature here — it keeps your options open.

Premature abstraction is worse than duplication. An interface introduced too early becomes a contract you're forced to honor even as your understanding of the problem shifts. The cost of unpicking a bad abstraction is higher than the cost of a little repetition.

Start concrete. Get the code working. The places worth abstracting will reveal themselves.

#### When to Make the Move

Repetition alone isn't sufficient reason to refactor. Look for repetition **at call sites** — places where you're writing functionally identical code that only differs by type. That's the signal.

Here's a realistic example. You have two functions:

```go
func ProcessUserPayment(db *sql.DB, userID int) error {
    // fetch, validate, charge, log
}

func ProcessVendorPayment(db *sql.DB, vendorID int) error {
    // fetch, validate, charge, log — nearly identical logic
}
```

Both functions need a database, but your tests now require a real `*sql.DB`. That's painful. The fix isn't just DRY-ing up the logic — it's flipping the dependency:

```go
type PaymentStore interface {
    GetPaymentDetails(id int) (PaymentDetails, error)
    RecordTransaction(t Transaction) error
}

func ProcessPayment(store PaymentStore, id int) error {
    // one implementation, testable with a mock store
}
```

Now you've solved two problems at once: the duplication, and the tight coupling to a concrete database type.

#### WET Might Be the Right Final Answer

Not every repeated pattern deserves an abstraction. If you have two similar functions that handle genuinely different concerns, forcing them through a shared interface just to eliminate a few lines is often a net negative. The code becomes harder to read, and you've created a contract that might not hold when requirements change.

Ask yourself: **is this repetition actually a problem?** If the two things are likely to diverge, leaving them separate is fine. Duplication is easier to delete than a bad abstraction is to untangle.

#### The Practical Path

1. Write the concrete implementation. Don't think about interfaces yet.
2. When you find yourself writing nearly identical logic a second time, note it — don't immediately fix it.
3. When you hit a third instance, or when you need to test something that's hard to isolate, that's your signal.
4. Introduce the interface at the point of consumption, not at the point of implementation. Define only what you actually need.
5. Refactor with a specific goal: easier testing, swappable implementations, or genuine reduction in duplicated logic at call sites.

#### Conclusion

Go's standard library defines small, focused interfaces — `io.Reader`, `io.Writer` — that emerged from real usage, not upfront design. That's the model worth following. Start concrete, ship working code, and let the natural pressure points guide where abstraction earns its place.

WET isn't a failure state. It's how you gather the information you need to abstract well.
