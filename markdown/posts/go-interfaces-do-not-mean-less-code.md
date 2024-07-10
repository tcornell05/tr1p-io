---
title: "Using Go Interfaces does not = Less code"
date: "2024-07-10"
description: "Go interfaces can be confusing to the majority of devs coming from different languages, for a variety of reasons. They are powerful and crucial to the internal workings of Go itself. However, a common misconception is that they need, or should be used. This is often not the case when getting your code off the ground.."
author: "tr1p"
image: "/img/sghetti-code.png"
keywords:
  - Interfaces
  - GoLang
  - Go
  - Go Interfaces
---

### Why Go Interfaces Do Not Always Mean Less Code

Go, known for its simplicity and efficiency, often gets praised for its robust concurrency model and minimalistic design. One feature that frequently garners attention is its use of interfaces. Interfaces in Go provide a powerful way to define behaviors and achieve polymorphism without the heavy syntax of traditional object-oriented languages. However, there’s a common misconception that utilizing interfaces in Go will naturally lead to writing less code. This isn’t always the case. In fact, focusing too much on interfaces early on can sometimes complicate your codebase and add unnecessary complexity. Here's why it's often better to write clean, DRY (Don't Repeat Yourself) code before considering interfaces for abstraction.

#### The Misconception: Interfaces Mean Less Code

The idea that interfaces will automatically reduce code is rooted in their ability to define common behaviors across different types. In theory, this should mean less duplication and more reusable code. However, in practice, this can lead to several pitfalls:

1. **Premature Abstraction**: Implementing interfaces too early can lead to premature abstraction, where you create layers of indirection before the actual need arises. This can make the code harder to understand and maintain.
   
2. **Overhead of Abstraction**: Introducing interfaces adds a level of abstraction that might not be necessary for all parts of your code. Each interface represents a contract that different types must adhere to, and managing these contracts can sometimes require more code, not less.

3. **Complexity in Implementation**: Forcing different types to conform to an interface can lead to convoluted implementations, especially when the types don’t naturally fit into the same abstraction.

#### The Alternative: DRY First, Interfaces Later

A more effective approach is to focus on writing DRY code initially, ensuring your program is clean, efficient, and free of unnecessary repetition. Here’s how you can do it:

1. **Identify Repetition and Patterns**: Before thinking about interfaces, look for repeated patterns in your code. These could be functions, data structures, or logic that appears in multiple places.

2. **Refactor for Reusability**: Refactor these repeated patterns into reusable functions or methods. This step ensures that your code is modular and easier to manage without adding unnecessary layers of abstraction.

3. **Evaluate the Need for Interfaces**: Once your code is DRY, evaluate where interfaces might genuinely add value. Ask yourself:
   - Do I have multiple types that share common behavior?
   - Will an interface make the code more readable or maintainable?
   - Is there a clear benefit to adding this level of abstraction?

4. **Introduce Interfaces Judiciously**: If the answer to the above questions is yes, introduce interfaces in a way that enhances the code without overcomplicating it. Ensure that the interfaces are well-defined and represent meaningful abstractions.

#### Practical Example

Consider a scenario where you have a program that processes different payment methods: credit card and PayPal. Instead of starting with an interface for payment methods, you might begin with concrete implementations:

```go
type CreditCard struct {
    Number string
    CVV    string
    Amount float64
}

func (cc CreditCard) ProcessPayment() string {
    // Mock processing logic
    return fmt.Sprintf("Processed credit card payment of %f", cc.Amount)
}

type PayPal struct {
    Email  string
    Amount float64
}

func (pp PayPal) ProcessPayment() string {
    // Mock processing logic
    return fmt.Sprintf("Processed PayPal payment of %f", pp.Amount)
}
```

Initially, you can keep these implementations separate. This keeps the code straightforward and focused on the task at hand. If you later find that you need to handle these payment methods polymorphically, you can introduce an interface:

```go
type PaymentProcessor interface {
    ProcessPayment() string
}

func Process(p PaymentProcessor) {
    fmt.Println(p.ProcessPayment())
}
```

Now, let's see how adding interfaces can lead to more code:

Without Interfaces:

```go
func main() {
    cc := CreditCard{Number: "1234-5678-9012-3456", CVV: "123", Amount: 100.0}
    pp := PayPal{Email: "user@example.com", Amount: 150.0}
    
    fmt.Println(cc.ProcessPayment())
    fmt.Println(pp.ProcessPayment())
}
```

With Interfaces:

```go
type PaymentProcessor interface {
    ProcessPayment() string
}

type CreditCard struct {
    Number string
    CVV    string
    Amount float64
}

func (cc CreditCard) ProcessPayment() string {
    return fmt.Sprintf("Processed credit card payment of %f", cc.Amount)
}

type PayPal struct {
    Email  string
    Amount float64
}

func (pp PayPal) ProcessPayment() string {
    return fmt.Sprintf("Processed PayPal payment of %f", pp.Amount)
}

func Process(p PaymentProcessor) {
    fmt.Println(p.ProcessPayment())
}

func main() {
    cc := CreditCard{Number: "1234-5678-9012-3456", CVV: "123", Amount: 100.0}
    pp := PayPal{Email: "user@example.com", Amount: 150.0}

    Process(cc)
    Process(pp)
}
```

As you can see, introducing the `PaymentProcessor` interface adds more code:

1. **Interface Definition**: You have to define the `PaymentProcessor` interface.
2. **Process Function**: You add an extra function to handle processing.
3. **Refactor Calls**: You change the direct calls to `ProcessPayment` to use the `Process` function.

While the interface-based approach provides flexibility and can be beneficial for larger or more complex systems, it’s clear that it does not inherently result in less code. Instead, it introduces more boilerplate and indirection.

#### Conclusion

While Go interfaces are a powerful tool for achieving polymorphism and defining shared behaviors, they don’t automatically lead to less code. In many cases, focusing too early on interfaces can add unnecessary complexity and abstraction. Instead, prioritize writing DRY code to ensure your program is clean and efficient. Introduce interfaces only when they provide clear benefits and align naturally with your abstractions. This approach leads to more maintainable and understandable code, leveraging Go’s strengths without falling into common pitfalls.
