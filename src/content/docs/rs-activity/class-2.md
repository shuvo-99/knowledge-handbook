---
title: Class 2
description: Linked List, Singly Linked List operations and the Kth-node-from-end problem.
sidebar:
  order: 20
---

Topics covered:

1. [Linked List](#linked-list)
2. [Singly Linked List](#singly-linked-list): insertion, deletion and traversal
3. [Problem: Kth node from the end](#problem-kth-node-from-the-end)

## Linked List

A **linked list** is a **linear data structure** made of **nodes chained together**. Each node holds a value and a link to the next node, so you can walk from the first node to the last one by following the links.

<figure>
<svg viewBox="0 0 700 200" role="img" aria-label="A linked list of three nodes. Node 1 at address 1000 holds data 10 and next 2000. Node 2 at address 2000 holds data 20 and next 3000. Node 3 at address 3000 holds data 30 and next null. Node 1 is the head and node 3 is the tail." style="width:100%;max-width:700px;height:auto;font-family:var(--sl-font-system-mono, monospace);">
  <defs>
    <marker id="ll-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
    </marker>
  </defs>
  <g fill="currentColor" font-size="13" text-anchor="middle" opacity="0.7">
    <text x="120" y="38">address: 1000</text>
    <text x="350" y="38">address: 2000</text>
    <text x="580" y="38">address: 3000</text>
  </g>
  <g fill="none" stroke="currentColor" stroke-width="2">
    <rect x="40" y="50" width="160" height="56" rx="6" />
    <line x1="110" y1="50" x2="110" y2="106" />
    <rect x="270" y="50" width="160" height="56" rx="6" />
    <line x1="340" y1="50" x2="340" y2="106" />
    <rect x="500" y="50" width="160" height="56" rx="6" />
    <line x1="570" y1="50" x2="570" y2="106" />
  </g>
  <g fill="currentColor" font-size="11" text-anchor="middle" opacity="0.6">
    <text x="75" y="64">data</text>
    <text x="155" y="64">next</text>
    <text x="305" y="64">data</text>
    <text x="385" y="64">next</text>
    <text x="535" y="64">data</text>
    <text x="615" y="64">next</text>
  </g>
  <g fill="currentColor" font-size="17" text-anchor="middle">
    <text x="75" y="91">10</text>
    <text x="155" y="91">2000</text>
    <text x="305" y="91">20</text>
    <text x="385" y="91">3000</text>
    <text x="535" y="91">30</text>
    <text x="615" y="91">null</text>
  </g>
  <g stroke="currentColor" stroke-width="2" fill="none">
    <line x1="185" y1="86" x2="268" y2="86" marker-end="url(#ll-arrow)" />
    <line x1="415" y1="86" x2="498" y2="86" marker-end="url(#ll-arrow)" />
    <line x1="120" y1="150" x2="120" y2="110" marker-end="url(#ll-arrow)" />
    <line x1="580" y1="150" x2="580" y2="110" marker-end="url(#ll-arrow)" />
  </g>
  <g fill="currentColor" font-size="15" font-weight="bold" text-anchor="middle">
    <text x="120" y="172">Head</text>
    <text x="580" y="172">Tail</text>
    <text x="120" y="190" font-size="12" font-weight="normal" opacity="0.7">(first node)</text>
    <text x="580" y="190" font-size="12" font-weight="normal" opacity="0.7">(last node)</text>
  </g>
</svg>
<figcaption>A linked list of 3 nodes. Each <code>next</code> stores the address of the following node; the last one is <code>null</code>.</figcaption>
</figure>

### What is a node?

**Nodes** are the elements of a linked list. Every node has **2 parts**:

| Part | What it stores |
| --- | --- |
| `data` | The actual value. It can be any type: `int`, `String`, `boolean`, … |
| `next` | A variable that stores the **address** (location / reference) of the next node |

The nodes are connected to each other by these **links**, which is why we call it a *linked* list. Like a normal array, it keeps elements in order one after another, but the nodes don't have to sit next to each other in memory. The links hold them together.

### Node class

In Java, each node is an **object** of a `Node` class:

```java
public class Node {
    int data;     // the value
    Node next;    // reference (address) of the next node

    Node(int data) {
        this.data = data;
        this.next = null;   // by default, next is null
    }
}
```

### Connecting the nodes

Since each node is an object, each node has its own **address** in memory. Say we create 3 nodes. Right now each one has a `data` value and its `next` is `null`, so they're not connected at all:

```java
Node n1 = new Node(10);   // n1.next = null
Node n2 = new Node(20);   // n2.next = null
Node n3 = new Node(30);   // n3.next = null
```

To connect them, we store the **address of Node 2 in the `next` of Node 1**, and the **address of Node 3 in the `next` of Node 2**:

```java
n1.next = n2;   // Node 1 → Node 2
n2.next = n3;   // Node 2 → Node 3
                // n3.next stays null → end of the list
```

Now Node 1 knows where Node 2 is, and Node 2 knows where Node 3 is. That's the **link**. Node 3's `next` is still `null`, which marks the **end** of the list.

```text
n1             n2             n3
[10 | •]-----> [20 | •]-----> [30 | null]
```

### Head and Tail

A linked list has two special terms:

- **Head**: the **first** node of the list (`n1` above). We only need the head to reach every other node.
- **Tail**: the **last** node of the list (`n3` above). Its `next` is `null`.

### Advantages

- **Dynamic data structure.** It grows and shrinks at runtime, so there's no fixed size to declare up front.
- **Insertion and deletion are easy.** Just change a few `next` links; no elements need to be shifted like in an array.
- **Used to build other data structures** such as **stack**, **queue** and **graph**.

### Disadvantages

- **Needs extra memory.** Every node stores a `next` reference in addition to its data.
- **Random access is not possible.** You can't jump to the 5th node like `arr[4]`; you have to start at the head and follow the links one by one.

### Types of linked list

| Type | How it's linked | Real-life example |
| --- | --- | --- |
| **Singly linked list** | Each node points to the **next** node only | Browser back / forward |
| **Doubly linked list** | Each node points to both the **next** and the **previous** node | Music player (previous / next song) |
| **Circular linked list** | The **last** node points back to the **first** node | Image viewer (after the last image, it loops back to the first) |

## Singly Linked List

In a singly linked list, each node points only to the **next** node, so we can move in **one direction**: from head to tail.

We'll look at 3 operations:

1. **Insertion (add)**: at the beginning, at the end, or in between
2. **Deletion**: from the beginning, from the end, or in between
3. **Traversal**: visiting every node one by one

### Setup

All the operations live inside a `LinkedList` class. It holds the `Node` class and two references: `head` (first node) and `tail` (last node). When the list is empty, both are `null`.

```java
public class LinkedList {

    // Node class
    public static class Node {
        int data;
        Node next;

        public Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    Node head;   // first node
    Node tail;   // last node

    // ... operations go here
}
```

### Traversal

Traversal comes first because every other operation that needs to "go to" a node uses it.

**Steps:**

1. Start with the head. If it's not `null`, access its data.
2. Go to the next node and access its data.
3. Repeat until you reach `null`.

```java
public void printList() {
    Node temp = head;            // start at the head
    while (temp != null) {       // stop when we fall off the end
        System.out.print(temp.data + " --> ");
        temp = temp.next;        // move to the next node
    }
    System.out.println("null");
}
```

We use a separate variable `temp` to walk through the list. If we moved `head` itself, we would lose the start of the list.

**Example:** list `10 → 20 → 30`

```text
temp = 10   print 10, move on
temp = 20   print 20, move on
temp = 30   print 30, move on
temp = null stop

Output: 10 --> 20 --> 30 --> null
```

**`TC = O(n)`**: we visit every node once.

### Insertion

#### Add at the beginning

**Steps:**

1. Create the new node.
2. Set `newNode.next = head`.
3. Set `head = newNode`.

```java
public void addFirst(int item) {
    Node newNode = new Node(item);
    if (head == null) {          // empty list: new node is both head and tail
        head = tail = newNode;
    } else {
        newNode.next = head;     // new node points to the old head
        head = newNode;          // new node becomes the head
    }
}
```

**Example:** `addFirst(5)` on `10 → 20 → 30`

```text
Before:           head
                   ↓
                 [10] → [20] → [30] → null

Step 1:   [5]

Step 2:   [5] → [10] → [20] → [30] → null
                 ↑
                head

Step 3:   head
           ↓
          [5] → [10] → [20] → [30] → null
```

:::caution
Do step 2 **before** step 3. If you set `head = newNode` first, you lose the reference to the old head and the rest of the list is gone.
:::

**`TC = O(1)`**: no matter how long the list is, it's always 3 steps.

#### Add at the end

**Steps:**

1. Create the new node.
2. Go to the last node.
3. Set `lastNode.next = newNode`.

There are two ways to reach the last node:

```java
public void addEnd(int item) {
    Node newNode = new Node(item);

    if (head == null) {          // empty list
        head = tail = newNode;
        return;
    }

    // Approach 1: we keep a tail reference, so we already know the last node
    tail.next = newNode;
    tail = newNode;

    // Approach 2: no tail reference, so walk from head to the last node
    // Node temp = head;
    // while (temp.next != null) {   // stop AT the last node, not after it
    //     temp = temp.next;
    // }
    // temp.next = newNode;
}
```

**Example:** `addEnd(40)` on `10 → 20 → 30`

```text
Before:   [10] → [20] → [30] → null
                         ↑
                        tail

After:    [10] → [20] → [30] → [40] → null
                                ↑
                               tail
```

**`TC`**: `O(1)` with a `tail` reference (approach 1), `O(n)` without one (approach 2).

:::note
In approach 2 the loop checks `temp.next != null`, not `temp != null` like in traversal. We need to stop **on** the last node so we can change its `next`.
:::

#### Add in between

Say we want to put a new node `z` between nodes `x` and `y`.

**Steps:**

1. Create the new node `z`.
2. Go to the node just **before** the required position (`x`).
3. Set `z.next = y` (that is, `z.next = x.next`).
4. Set `x.next = z`.

```java
public void addInBetween(int index, int data) {
    if (index == 0) {            // position 0 is just "add at the beginning"
        addFirst(data);
        return;
    }

    Node newNode = new Node(data);
    Node temp = head;
    int i = 0;

    while (i < index - 1) {      // stop at the node just before the position
        temp = temp.next;
        i++;
    }

    newNode.next = temp.next;    // z → y
    temp.next = newNode;         // x → z

    if (newNode.next == null) tail = newNode;   // inserted at the very end
}
```

**Example:** `addInBetween(2, 15)` on `5 → 10 → 20` (indexes start at 0)

```text
index:     0      1      2
          [5] → [10] → [20] → null
                 x      y

Step 2: walk to index 1 (index - 1). temp = x = [10]

Step 3: [15].next = [20]
          [5] → [10] → [20] → null
                        ↑
                      [15]

Step 4: [10].next = [15]
          [5] → [10] → [15] → [20] → null
index:     0      1      2      3
```

:::caution
Order matters here too. If you do `x.next = z` first, you lose the reference to `y`, and `z.next = x.next` would make `z` point to itself.
:::

**`TC = O(n)`**: in the worst case we walk almost the whole list to reach the position.

### Deletion

To delete a node, we don't erase it. We just **change the links so nothing points to it** anymore. Java's garbage collector then frees its memory.

#### Delete from the beginning

**Step:** move the head to the 2nd node.

```java
public void deleteBegin() {
    if (head == null) return;    // empty list, nothing to delete
    head = head.next;
    if (head == null) tail = null;   // the list had one node and is now empty
}
```

**Example:** `deleteBegin()` on `5 → 10 → 20`

```text
Before:   head
           ↓
          [5] → [10] → [20] → null

After:          head
                 ↓
          [5]   [10] → [20] → null
          (no one points to [5], so it's removed)
```

**`TC = O(1)`**

#### Delete from the end

**Step:** go to the **2nd last** node and set its `next` to `null`.

```java
public void deleteEnd() {
    if (head == null) return;    // empty list

    if (head.next == null) {     // only one node
        head = tail = null;
        return;
    }

    Node temp = head;
    while (temp.next.next != null) {   // stop at the 2nd last node
        temp = temp.next;
    }

    temp.next = null;            // cut off the last node
    tail = temp;                 // 2nd last node is the new tail
}
```

Why `temp.next.next`? When `temp` is the 2nd last node, `temp.next` is the last node and `temp.next.next` is `null`. That's where we stop.

**Example:** `deleteEnd()` on `10 → 15 → 20`

```text
Before:   [10] → [15] → [20] → null
                  ↑      ↑
                 temp   tail

After:    [10] → [15] → null      [20]
                  ↑
                 tail
```

**`TC = O(n)`**: even with a `tail` reference, we still have to walk to the 2nd last node, because a singly linked list can't go backwards.

#### Delete in between

**Step:** connect the `next` of the node **before** the deleted node to the node **after** the deleted node.

```java
public void deleteInBetween(int index) {
    if (head == null) return;    // empty list

    if (index == 0) {            // position 0 is just "delete from the beginning"
        deleteBegin();
        return;
    }

    Node temp = head;
    int i = 0;
    while (i < index - 1 && temp.next != null) {   // stop just before the node
        temp = temp.next;
        i++;
    }

    if (temp.next == null) return;   // index out of bounds

    temp.next = temp.next.next;      // skip over the deleted node

    if (temp.next == null) tail = temp;   // we deleted the last node
}
```

**Example:** `deleteInBetween(1)` on `10 → 15 → 20`

```text
index:     0      1      2
          [10] → [15] → [20] → null
          temp   delete

temp.next = temp.next.next   →   [10].next = [20]

          [10] ──────→ [20] → null
                 [15]
          (no one points to [15], so it's removed)
```

**`TC = O(n)`**

### Summary

| Operation | Time complexity |
| --- | --- |
| Traversal | `O(n)` |
| Add at beginning | `O(1)` |
| Add at end | `O(1)` with `tail`, `O(n)` without |
| Add in between | `O(n)` |
| Delete from beginning | `O(1)` |
| Delete from end | `O(n)` |
| Delete in between | `O(n)` |

### Full code

Everything above in one runnable file. Uncomment the lines in `main` one by one and watch how the list changes.

<details>
<summary>Show full code</summary>

```java
public class LinkedList {

    // Node class
    public static class Node {
        int data;
        Node next;

        public Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    Node head;
    Node tail;

    // Add at the beginning
    public void addFirst(int item) {
        Node newNode = new Node(item);
        if (head == null) {
            head = tail = newNode;
        } else {
            newNode.next = head;
            head = newNode;
        }
    }

    // Add at the end
    public void addEnd(int item) {
        Node newNode = new Node(item);

        if (head == null) {
            head = tail = newNode;
            return;
        }

        // Approach 1 - if you have a tail variable
        tail.next = newNode;
        tail = newNode;

        // Approach 2 - else iterate from head to the last node
        // Node temp = head;
        // while (temp.next != null) {
        //     temp = temp.next;
        // }
        // temp.next = newNode;
    }

    // Add at a given index
    public void addInBetween(int index, int data) {
        if (index == 0) {
            addFirst(data);
            return;
        }

        Node newNode = new Node(data);
        Node temp = head;
        int i = 0;

        while (i < index - 1) {
            temp = temp.next;
            i++;
        }

        newNode.next = temp.next;
        temp.next = newNode;

        if (newNode.next == null) tail = newNode;
    }

    // Delete from the beginning
    public void deleteBegin() {
        if (head == null) return;
        head = head.next;
        if (head == null) tail = null;
    }

    // Delete from the end
    public void deleteEnd() {
        if (head == null) return;

        if (head.next == null) {
            head = tail = null;
            return;
        }

        Node temp = head;
        while (temp.next.next != null) {
            temp = temp.next;
        }

        temp.next = null;
        tail = temp;
    }

    // Delete at a given index
    public void deleteInBetween(int index) {
        if (head == null) return;

        if (index == 0) {
            deleteBegin();
            return;
        }

        Node temp = head;
        int i = 0;
        while (i < index - 1 && temp.next != null) {
            temp = temp.next;
            i++;
        }

        if (temp.next == null) return;

        temp.next = temp.next.next;

        if (temp.next == null) tail = temp;
    }

    // Print the list
    public void printList() {
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " --> ");
            temp = temp.next;
        }
        System.out.println("null");
    }

    public static void main(String[] args) {
        LinkedList ll = new LinkedList();

        ll.addFirst(10);
        ll.printList();              // 10 --> null

        // ll.addFirst(5);
        // ll.printList();           // 5 --> 10 --> null

        // ll.addEnd(20);
        // ll.printList();           // 5 --> 10 --> 20 --> null

        // ll.addInBetween(2, 15);
        // ll.printList();           // 5 --> 10 --> 15 --> 20 --> null

        // ll.deleteBegin();
        // ll.printList();           // 10 --> 15 --> 20 --> null

        // ll.deleteEnd();
        // ll.printList();           // 10 --> 15 --> null

        // ll.deleteInBetween(1);
        // ll.printList();           // 10 --> null
    }
}
```

</details>

## Problem: Kth node from the end

**Problem:** given a singly linked list and a number `k`, find the `k`-th node from the **end**.

**Example:** list `10 → 20 → 30 → 40 → 50`, `k = 2` → answer is `40`.

### Idea: two pointers

The simple way is to count the length `n`, then walk `n - k` steps from the head. That takes **two passes** over the list.

We can do it in **one pass** with two pointers, `fast` and `slow`:

1. Move `fast` **`k` steps** ahead of `slow`.
2. Move both together, one step at a time, until `fast` reaches `null`.
3. Now `slow` is exactly `k` nodes behind the end, so it's the answer.

The trick: the gap between `fast` and `slow` stays `k`. When `fast` falls off the end, `slow` is `k` steps behind it.

```java
public void getKthFromEnd(int k) {
    if (head == null || k <= 0) throw new IllegalStateException();

    Node fast = head;
    Node slow = head;

    // Move fast k steps ahead
    for (int i = 0; i < k; i++) {
        if (fast == null) throw new IllegalStateException();   // k > length
        fast = fast.next;
    }

    // Move both until fast reaches the end
    while (fast != null) {
        fast = fast.next;
        slow = slow.next;
    }

    System.out.println("Kth Node from Last: " + slow.data);   // slow is k-th from end
}
```

**Dry run:** `10 → 20 → 30 → 40 → 50`, `k = 2`

```text
Step 1: move fast 2 steps
        [10] → [20] → [30] → [40] → [50] → null
         slow          fast

Step 2: move both until fast is null
        [10] → [20] → [30] → [40] → [50] → null
                slow          fast
        [10] → [20] → [30] → [40] → [50] → null
                       slow          fast
        [10] → [20] → [30] → [40] → [50] → null
                              slow          fast

fast is null → slow = 40 ✔
```

**`TC = O(n)`** in a single pass, **`SC = O(1)`** (just two pointers).
