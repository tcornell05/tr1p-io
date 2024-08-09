
---
title: "Start WET, Then Go DRY: The Pragmatic Use of Go Interfaces"
date: "2024-07-10"
description: "Go interfaces are powerful, but they don't always lead to less code. It’s better to start with repetition, identify natural patterns, and then abstract with interfaces or other structures."
author: "tr1p"
image: "/img/sghetti-code.png"
keywords:
  - Interfaces
  - GoLang
  - Go
  - Go Interfaces
---

### Start WET, Then Go DRY: The Pragmatic Use of Go Interfaces

Go, known for its simplicity and efficiency, often gets praised for its robust concurrency model and minimalistic design. One feature that frequently garners attention is its use of interfaces. Interfaces in Go provide a powerful way to define behaviors and achieve polymorphism without the heavy syntax of traditional object-oriented languages. However, there’s a common misconception that utilizing interfaces in Go will naturally lead to writing less code. This isn’t always the case. In fact, focusing too much on interfaces early on can sometimes complicate your codebase and add unnecessary complexity. Here's why it’s often better to start with WET (Write Everything Twice) code and let natural repetition guide your use of interfaces and other abstractions.

#### The Misconception: Interfaces Mean Less Code

The idea that interfaces will automatically reduce code is rooted in their ability to define common behaviors across different types. In theory, this should mean less duplication and more reusable code. However, in practice, this can lead to several pitfalls:

1. **Premature Abstraction**: Implementing interfaces too early can lead to premature abstraction, where you create layers of indirection before the actual need arises. This can make the code harder to understand and maintain.
   
2. **Overhead of Abstraction**: Introducing interfaces adds a level of abstraction that might not be necessary for all parts of your code. Each interface represents a contract that different types must adhere to, and managing these contracts can sometimes require more code, not less.

3. **Complexity in Implementation**: Forcing different types to conform to an interface can lead to convoluted implementations, especially when the types don’t naturally fit into the same abstraction.

#### WET is Fine Initially: Let Repetition Guide Your Abstraction

When starting a new project or feature, it’s natural to write similar code in multiple places—this is often referred to as WET (Write Everything Twice). And that’s okay. In the early stages, it’s more important to get your code working than to worry about perfect abstraction. Over time, as you write more code and naturally start repeating certain patterns, that’s when you should consider refactoring and introducing abstractions like interfaces.

##### Why Start WET?

1. **Clarity and Focus**: Writing code directly and repetitively allows you to focus on solving the immediate problem without getting bogged down by designing abstractions prematurely. It helps you understand the problem space better.

2. **Avoiding Premature Abstraction**: Prematurely abstracting code can lead to over-engineering. If you haven’t yet seen how your code will evolve, you might create abstractions that don’t fit well with future requirements, making your code harder to maintain.

3. **Natural Abstraction Points**: By starting WET, you’ll begin to notice where you’re repeating yourself. These repetitions are natural indicators of where an abstraction (like an interface) might be beneficial.

##### Moving from WET to DRY

Once you’ve identified these repetitions, that’s when you can start refactoring your code:

1. **Identify Repeated Patterns**: Look for places in your code where you’re performing similar operations or handling similar logic. These are prime candidates for refactoring.

2. **Introduce Interfaces or Structs**: When you see that multiple types are performing the same kinds of actions, consider introducing an interface to encapsulate this behavior. Similarly, if you have data structures that share common fields, a struct might be the right abstraction.

3. **Refactor with Purpose**: The key is to refactor with a clear goal in mind—whether it’s reducing repetition, making the code easier to extend, or simplifying testing.

#### Practical Example: From WET to DRY

Let’s say you start with a WET implementation where you handle different types of notifications:

```go
func SendEmailNotification(email string, message string) {
    fmt.Printf("Sending email to %s: %s\n", email, message)
}

func SendSMSNotification(phone string, message string) {
    fmt.Printf("Sending SMS to %s: %s\n", phone, message)
}
```

At first, this approach works fine. But as your application grows and you introduce more notification types, you start to notice the repetition. That's when you can refactor and introduce an interface:

```go
type Notifier interface {
    SendNotification(message string)
}

type EmailNotifier struct {
    Email string
}

func (e EmailNotifier) SendNotification(message string) {
    fmt.Printf("Sending email to %s: %s\n", e.Email, message)
}

type SMSNotifier struct {
    Phone string
}

func (s SMSNotifier) SendNotification(message string) {
    fmt.Printf("Sending SMS to %s: %s\n", s.Phone, message)
}

func NotifyAll(notifiers []Notifier, message string) {
    for _, notifier := range notifiers {
        notifier.SendNotification(message)
    }
}
```

Now you’ve introduced an interface that eliminates repetition, making your code DRY and easier to maintain.

#### Conclusion: Embrace WET, Transition to DRY

Starting WET allows you to focus on solving the problem at hand without unnecessary abstraction. As you develop, the points of repetition will naturally emerge, guiding you to refactor and introduce interfaces or other abstractions where they truly add value. This approach ensures that your code evolves organically, staying both simple and efficient.
