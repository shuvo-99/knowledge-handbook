---
title: Class 3
description: Stack, its implementations, and three classic stack problems.
sidebar:
  order: 30
---

Topics covered:

1. [Stack](#stack)
2. [Implementation](#implementation): array, ArrayList, linked list, Collection Framework
3. [Problems](#problems): push at the bottom, reverse a string, reverse a stack

## Stack

Think about breakfast: you keep slices of bread **one on top of another**. The slice you can see is the one on **top**, and when you pick one, you pick it **from the top**. The slice you put down first is at the bottom, so it's the last one you get to.

A **stack** works the same way. Items are added and removed from **one end only**, called the **top**.

<figure>
<svg viewBox="0 0 520 280" role="img" aria-label="A stack holding 10 at the bottom, 20 in the middle and 30 on top. Push adds an item onto the top; pop removes the item from the top." style="width:100%;max-width:520px;height:auto;font-family:var(--sl-font-system-mono, monospace);">
  <defs>
    <marker id="st-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
    </marker>
  </defs>
  <path d="M180,70 V262 H340 V70" fill="none" stroke="currentColor" stroke-width="3" />
  <g fill="none" stroke="currentColor" stroke-width="2">
    <rect x="190" y="212" width="140" height="42" rx="6" />
    <rect x="190" y="164" width="140" height="42" rx="6" />
    <rect x="190" y="116" width="140" height="42" rx="6" />
  </g>
  <g fill="currentColor" font-size="18" text-anchor="middle">
    <text x="260" y="239">10</text>
    <text x="260" y="191">20</text>
    <text x="260" y="143">30</text>
  </g>
  <g stroke="currentColor" stroke-width="2" fill="none">
    <line x1="230" y1="20" x2="230" y2="106" marker-end="url(#st-arrow)" />
    <line x1="290" y1="106" x2="290" y2="20" marker-end="url(#st-arrow)" />
    <line x1="430" y1="137" x2="346" y2="137" marker-end="url(#st-arrow)" />
  </g>
  <g fill="currentColor" font-size="15">
    <text x="218" y="55" text-anchor="end" font-weight="bold">push</text>
    <text x="302" y="55" font-weight="bold">pop</text>
    <text x="440" y="142" font-weight="bold">top</text>
    <text x="440" y="238" opacity="0.7" font-size="13">bottom</text>
    <text x="440" y="254" opacity="0.7" font-size="13">(added first)</text>
  </g>
</svg>
<figcaption>Push puts an item on the top; pop takes the item off the top. 30 went in last, so it comes out first.</figcaption>
</figure>

Because the **last** item that goes in is the **first** one that comes out, a stack is called:

- **LIFO**: Last In, First Out
- **FILO**: First In, Last Out (same idea, seen from the other side)

### Operations

| Operation | What it does | Time complexity |
| --- | --- | --- |
| `push(x)` | Put `x` on the top | `O(1)` |
| `pop()` | Remove and return the top item | `O(1)` |
| `peek()` | Look at the top item **without** removing it | `O(1)` |
| `isEmpty()` | Check whether the stack has no items | `O(1)` |

All of them are `O(1)` because they only ever touch the top. Nothing has to be shifted or searched.

**Example:** start with an empty stack

```text
push(10)   push(20)   push(30)   peek() → 30   pop() → 30   pop() → 20

                       | 30 |      | 30 |
            | 20 |     | 20 |      | 20 |       | 20 |
| 10 |      | 10 |     | 10 |      | 10 |       | 10 |       | 10 |
+----+      +----+     +----+      +----+       +----+       +----+
```

## Implementation

A stack is an **idea** (add and remove from the top). We can build it on top of different data structures.

### Using an array

The **last filled** element of the array is the top. We keep an index `top` that points to it (`-1` means empty).

The problem is that an array has a **fixed size**. Before every push we have to check whether the array is full, and if it is, we **can't add** anything more.

```java
class ArrayStack {
    int[] arr = new int[3];   // size is fixed at 3
    int top = -1;             // -1 → stack is empty

    void push(int item) {
        if (top == arr.length - 1) {
            System.out.println("Stack is full!");
            return;
        }
        top++;
        arr[top] = item;
    }

    int pop() {
        if (top == -1) {
            System.out.println("Stack is empty!");
            return -1;
        }
        int value = arr[top];
        top--;
        return value;
    }
}
```

```text
push(10), push(20), push(30):   [10, 20, 30]   top = 2
push(40):                       Stack is full!  ✘
```

Because of this size limit, we **don't usually prefer an array** for a stack.

### Using an ArrayList

An `ArrayList` has a **dynamic size**, so it never gets "full". It works like an array: the **last element** is the top, and we add and remove at the end.

```java
import java.util.ArrayList;

public class Main {

    static class Stack {

        // ArrayList stores the stack elements
        ArrayList<Integer> list = new ArrayList<>();

        // Push: add element to the TOP (end of list)
        public void push(int item) {
            list.add(item);
        }

        // Pop: remove and return the TOP element
        public int pop() {
            if (isEmpty()) {
                System.out.println("Stack is empty!");
                return -1;
            }
            int top = list.get(list.size() - 1);
            list.remove(list.size() - 1);
            return top;
        }

        // Peek: look at TOP without removing
        public int peek() {
            if (isEmpty()) {
                System.out.println("Stack is empty!");
                return -1;
            }
            return list.get(list.size() - 1);
        }

        // Check if stack has no elements
        public boolean isEmpty() {
            return list.size() == 0;
        }
    }

    public static void main(String[] args) {
        Stack stack = new Stack();

        stack.push(10);    // list: [10]
        stack.push(20);    // list: [10, 20]
        stack.push(30);    // list: [10, 20, 30]

        while (!stack.isEmpty()) {
            System.out.println(stack.peek());   // 30, 20, 10
            stack.pop();
        }
    }
}
```

```text
index:   0    1    2
list:  [10, 20, 30]
                 ↑
          top = list.get(size - 1)
```

Why the **end** and not the beginning? Removing from the end of an `ArrayList` is `O(1)`. Removing from index `0` is `O(n)`, because every other element shifts left (see [Class 1](../class-1/#operations)).

### Using a linked list

A linked list also has a **dynamic size**. Here we keep the **newest (top) element as the head**, so push is just **add at the beginning** and pop is **delete from the beginning**, both `O(1)` (see [Class 2](../class-2/#add-at-the-beginning)).

```java
public class LLStack {

    // Node class
    static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    // Stack class
    static class Stack {
        Node top;   // top of the stack = head of the linked list

        // Check if stack is empty
        public boolean isEmpty() {
            return top == null;
        }

        // Push operation: add at the beginning
        public void push(int data) {
            Node newNode = new Node(data);

            if (isEmpty()) {
                top = newNode;
                return;
            }

            newNode.next = top;
            top = newNode;
        }

        // Pop operation: delete from the beginning
        public int pop() {
            if (isEmpty()) {
                System.out.println("Stack is empty");
                return -1;
            }

            int value = top.data;
            top = top.next;
            return value;
        }

        // Peek operation
        public int peek() {
            if (isEmpty()) {
                System.out.println("Stack is empty");
                return -1;
            }

            return top.data;
        }
    }

    public static void main(String[] args) {
        Stack s = new Stack();

        s.push(10);
        s.push(20);
        s.push(30);

        // System.out.println("Top element: " + s.peek()); // 30

        // System.out.println("Popped: " + s.pop()); // 30
        // System.out.println("Popped: " + s.pop()); // 20

        // System.out.println("Top element: " + s.peek()); // 10

        while (!s.isEmpty()) {
            System.out.println(s.peek());   // 30, 20, 10
            s.pop();
        }
    }
}
```

**Example:** `push(10)`, `push(20)`, `push(30)`, then `pop()`

```text
push(10):   top
             ↓
            [10] → null

push(20):   top
             ↓
            [20] → [10] → null

push(30):   top
             ↓
            [30] → [20] → [10] → null

pop() → 30:        top
                    ↓
            [30]   [20] → [10] → null
```

The head is always the top, so we never have to walk the list.

### Using the Collection Framework

Java already has a **built-in** `Stack` class in `java.util`, so in practice (and in problem solving) we just use it:

```java
import java.util.*;

public class StackCollection {
    public static void main(String[] args) {
        Stack<Integer> s = new Stack<>();
        s.push(10);
        s.push(20);
        s.push(30);

        while (!s.isEmpty()) {
            System.out.println(s.peek());   // 30, 20, 10
            s.pop();
        }
    }
}
```

:::note
Unlike our own versions, the built-in `pop()` and `peek()` don't return `-1` on an empty stack. They throw an `EmptyStackException`, so always check `isEmpty()` first.
:::

### Comparison

| Implementation | Size | Notes |
| --- | --- | --- |
| Array | Fixed | Must check for "full"; usually not preferred |
| ArrayList | Dynamic | Top = last element |
| Linked list | Dynamic | Top = head; needs extra memory for `next` |
| Collection Framework | Dynamic | Built in, ready to use |

## Problems

All three problems use the built-in `Stack` from the Collection Framework.

### Problem 1: Push at the bottom of the stack

*Asked at FAANG companies.*

**Problem:** given a stack, push a new item to the **bottom** instead of the top.

```text
Input:  | 30 |          data = 40          Output:  | 30 |
        | 20 |                                      | 20 |
        | 10 |                                      | 10 |
        +----+                                      | 40 |
                                                    +----+
```

#### Approach 1: use a second stack

Pop everything into a temporary stack, push `40`, then pop everything back. It works, but the temporary stack holds up to `n` items, so the extra space is **`O(n)`**.

#### Approach 2: recursion (same stack)

What if we're asked to do it **within the same stack**, without creating another stack or array? We can use **recursion**: each function call holds one popped item for us, then pushes it back on the way out.

1. If the stack is empty, push `data`. That's the bottom. Done.
2. Otherwise, pop the top and **remember** it.
3. Recursively push `data` at the bottom of the smaller stack.
4. Push the remembered item back.

```java
// PUSH AT THE BOTTOM OF THE STACK

import java.util.*;

public class p1 {

    public static void pushAtBottom(Stack<Integer> s, int data) {
        if (s.isEmpty()) {
            s.push(data);
            return;
        }

        int top = s.pop();
        pushAtBottom(s, data);
        s.push(top);
    }

    public static void main(String[] args) {
        Stack<Integer> s = new Stack<>();
        s.push(10);
        s.push(20);
        s.push(30);

        pushAtBottom(s, 40);

        while (!s.isEmpty()) {
            System.out.println(s.pop());   // 30, 20, 10, 40
        }
    }
}
```

#### Trace

Stack written as `[bottom … top]`. Each indent is one level deeper in recursion.

```text
pushAtBottom(s, 40)          s = [10, 20, 30]
│ pop → top = 30             s = [10, 20]
│ pushAtBottom(s, 40)
│ │ pop → top = 20           s = [10]
│ │ pushAtBottom(s, 40)
│ │ │ pop → top = 10         s = []
│ │ │ pushAtBottom(s, 40)
│ │ │ │ empty → push 40      s = [40]          ← base case
│ │ │ push 10                s = [40, 10]
│ │ push 20                  s = [40, 10, 20]
│ push 30                    s = [40, 10, 20, 30]
```

Going **down**, the calls empty the stack and each call keeps one item. At the bottom the stack is empty, so `40` goes in first. Coming back **up**, each call puts its item back on top, in the original order.

```text
 Going down (popping)                   Coming back up (pushing)

| 30 |                                                           | 30 |
| 20 |     | 20 |                                      | 20 |    | 20 |
| 10 |     | 10 |    | 10 |                  | 10 |    | 10 |    | 10 |
+----+     +----+    +----+    +----+   →    | 40 |    | 40 |    | 40 |
                               empty         +----+    +----+    +----+
                              push 40       push 10   push 20   push 30
```

**`TC = O(n)`**: every item is popped once and pushed once.

:::note
Recursion isn't completely free. Each call waits on the **call stack** until the call below it finishes, so `n` items means `n` calls waiting at once. The extra space is still `O(n)`, but it's the system's call stack rather than a stack or array that we create. The point of the problem is to practice using recursion as that hidden storage.
:::

### Problem 2: Reverse a string using a stack

*Asked at Microsoft, Flipkart and Amazon.*

**Problem:** reverse `"hello"` to get `"olleh"` using a stack.

**Idea:** a stack gives items back in **reverse order** (LIFO). Push every character, then pop them all.

```java
// REVERSE THE STRING USING STACK

import java.util.*;

public class p2 {
    public static void main(String[] args) {
        String str = "hello";

        Stack<Character> stack = new Stack<>();

        // Push all characters
        for (int i = 0; i < str.length(); i++) {
            stack.push(str.charAt(i));
        }

        // Pop and build reversed string
        String reversed = "";
        while (!stack.isEmpty()) {
            reversed += stack.pop();
        }

        System.out.println("Original: " + str);        // hello
        System.out.println("Reversed: " + reversed);   // olleh
    }
}
```

#### Trace

```text
Push h, e, l, l, o:              Pop one by one:

| o |  ← top                     pop o   reversed = "o"
| l |                            pop l   reversed = "ol"
| l |                            pop l   reversed = "oll"
| e |                            pop e   reversed = "olle"
| h |                            pop h   reversed = "olleh"
+---+
```

**`TC = O(n)`**, **`SC = O(n)`** for the stack.

:::tip
`reversed += ...` creates a new `String` every time. For long strings, use a `StringBuilder` and `sb.append(stack.pop())` instead.
:::

### Problem 3: Reverse a stack

**Problem:** reverse a stack **without any extra memory**, so no extra stack and no array.

```text
Input:  | 30 |          Output:  | 10 |
        | 20 |                   | 20 |
        | 10 |                   | 30 |
        +----+                   +----+
```

**Idea:** reuse `pushAtBottom` from Problem 1.

1. If the stack is empty, there's nothing to reverse.
2. Pop the top and remember it.
3. Recursively reverse the rest of the stack.
4. Push the remembered item **at the bottom**.

The item that was on top ends up at the bottom, and so on for every item.

```java
// REVERSE STACK

import java.util.*;

public class p3 {

    public static void pushAtBottom(Stack<Integer> s, int data) {
        if (s.isEmpty()) {
            s.push(data);
            return;
        }

        int top = s.pop();
        pushAtBottom(s, data);
        s.push(top);
    }

    public static void reverseStack(Stack<Integer> s) {
        if (s.isEmpty()) {
            return;
        }
        int top = s.pop();
        reverseStack(s);
        pushAtBottom(s, top);
    }

    public static void main(String[] args) {
        Stack<Integer> s = new Stack<>();
        s.push(10);
        s.push(20);
        s.push(30);

        reverseStack(s);

        while (!s.isEmpty()) {
            System.out.println(s.pop());   // 10, 20, 30
        }
    }
}
```

#### Trace

Stack written as `[bottom … top]`.

```text
reverseStack(s)                  s = [10, 20, 30]
│ pop → top = 30                 s = [10, 20]
│ reverseStack(s)
│ │ pop → top = 20               s = [10]
│ │ reverseStack(s)
│ │ │ pop → top = 10             s = []
│ │ │ reverseStack(s)
│ │ │ │ empty → return                             ← base case
│ │ │ pushAtBottom(s, 10)        s = [10]
│ │ pushAtBottom(s, 20)          s = [20, 10]
│ pushAtBottom(s, 30)            s = [30, 20, 10]
```

```text
 Going down (popping)                   Coming back up (pushAtBottom)

| 30 |                                                           | 10 |
| 20 |     | 20 |                                      | 10 |    | 20 |
| 10 |     | 10 |    | 10 |                  | 10 |    | 20 |    | 30 |
+----+     +----+    +----+    +----+   →    +----+    +----+    +----+
                               empty        bottom    bottom    bottom
                                             ← 10      ← 20      ← 30
```

Each `pushAtBottom` slides its item **under** everything already there. `30` was on top at the start and goes in last, at the very bottom.

**`TC = O(n²)`**: `reverseStack` makes `n` calls, and each one calls `pushAtBottom`, which is `O(n)`.
