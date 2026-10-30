---
title: Class 1
description: ArrayList and Time Complexity.
sidebar:
  order: 10 # class 2 → 20, class 3 → 30, ...
---

Topics covered:

1. [ArrayList](#arraylist)
2. [Time Complexity](#time-complexity)

## ArrayList

An `ArrayList` is a **resizable array**. Like an array, it stores elements in order and gives fast access by index. Unlike an array, its size is not fixed — it grows automatically as you add elements.

| | Array | ArrayList |
| --- | --- | --- |
| Size | Fixed when created | Grows and shrinks |
| Element types | Primitives or objects | Objects only (`Integer`, not `int`) |
| Length | `arr.length` | `list.size()` |
| Access | `arr[i]` | `list.get(i)` |

### Creating and using one

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> nums = new ArrayList<>();

        nums.add(10);          // [10]
        nums.add(20);          // [10, 20]
        nums.add(1, 15);       // [10, 15, 20]  — insert at index 1

        int first = nums.get(0);   // 10
        nums.set(2, 25);           // [10, 15, 25]
        nums.remove(0);            // [15, 25]  — removes by index
        nums.size();               // 2
        nums.contains(25);         // true

        for (int n : nums) {
            System.out.println(n);
        }
    }
}
```

Syntax is similar to creating any object:

```text
ArrayList<Integer>   nums     = new ArrayList<>();
------------------   ----         ---------------
ClassName<Type>      objectName = new ClassName<>()
```

The only difference is that we add a `Type` inside `< >`. Also note that we can't use **primitive** types like `int`, `double`, `char` or `boolean`. Instead we use their wrapper classes: `Integer`, `Double`, `Character`, `Boolean`. `String` is already a class, so `ArrayList<String>` works as is.

### How it grows

Internally an `ArrayList` holds a normal array. When that array is full and you `add()`, Java creates a bigger array (about **1.5×** the size) and copies every element into it.

Copying is `O(n)`, but it happens rarely, so `add()` at the end is **`O(1)` on average** (amortized).

### Operations

- Add element (at the end) - `O(1)` amortized
- Get element - `O(1)`
- Remove element - `O(n)` [the elements after it are shifted left to fill the gap]
- Set element at index - `O(1)` [direct index, nothing moves]
- Contains element - `O(n)` [searches the array one by one]

<!-- ### Common mistakes

- **`remove(int)` vs `remove(Object)`.** On an `ArrayList<Integer>`, `list.remove(1)` removes the element at **index 1**, not the value `1`. Use `list.remove(Integer.valueOf(1))` to remove the value.
- **Removing inside a for-each loop** throws `ConcurrentModificationException`. Use an `Iterator` or `list.removeIf(...)`.
- **Index out of range.** Valid indexes are `0` to `size() - 1`.
- **Using `int` as the type.** `ArrayList<int>` doesn't compile — use `ArrayList<Integer>`. -->

## Time Complexity

### Why measure code?

When buying a car, we look at parameters like speed, price and capacity to judge its performance and quality.

In the same way, we judge code by two parameters:

- **Time complexity** — how long the code takes to run
- **Space complexity** — how much extra memory it uses

### Best, average and worst case

The same code can take different amounts of time depending on the input. For example, say we search an array for the value `8`:

| Case | Array | Result |
| --- | --- | --- |
| Best case | `[8, 3, 1, 5, 4]` | Found in the 1st iteration |
| Average case | `[1, 4, 13, 8, 3, 2]` | Found after some iterations |
| Worst case | `[1, 2, 9, 16, 7, 11, 8]` | Found only after going through the whole array |

Time complexity is measured for the **worst case**, i.e. how much time the code takes in the worst-case scenario. That gives a guarantee: the code will never be slower than this.

### Big-O notation

Time complexity describes **how the running time of an algorithm grows as the input size `n` grows**. We write it in **Big-O notation**, which has two rules:

1. **Ignore constants**
2. **Keep only the largest term**

| Expression | Big-O |
| --- | --- |
| `3n + 5` | `O(n)` |
| `n² + 100n` | `O(n²)` |

It answers "how does this scale?", not "how many milliseconds does it take?".

### Common complexities

From fastest to slowest:

| Big-O | Name | Example |
| --- | --- | --- |
| `O(1)` | Constant | Access `arr[i]` |
| `O(log n)` | Logarithmic | Binary search |
| `O(n)` | Linear | Loop through an array once |
| `O(n log n)` | Linearithmic | Merge sort |
| `O(n²)` | Quadratic | Nested loops over the same array |
| `O(2ⁿ)` | Exponential | Naive recursive Fibonacci |

### How to calculate it

Count how many times each statement runs, then add them up and apply the Big-O rules.

- Every simple statement or declaration counts as **1 unit**.
- A loop's condition is checked **one more time** than its body runs: the last check is the one that fails and ends the loop.

#### Example 1: Single loop

```java
// A = [9, 6, 12, 17, 11], n = 5
int sum(int[] A, int n) {
    int s = 0;                  // -----> 1

    for (int i = 0; i < n; i++) {   // -----> n + 1
        s = s + A[i];           // -----> n
    }

    return s;                   // -----> 1
}
```

Let's break the loop down:

```text
i = 0, 0 < 5  ✔
i = 1, 1 < 5  ✔
i = 2, 2 < 5  ✔
i = 3, 3 < 5  ✔
i = 4, 4 < 5  ✔
i = 5, 5 < 5  ✘  → loop ends
```

- Condition satisfied: 5 times (`n`), so the body runs `n` times
- Condition not satisfied: 1 time
- Total condition checks: 5 + 1 = 6, i.e. `n + 1`

**`TC = 1 + (n + 1) + n + 1 = 2n + 3 = O(n)`**

**Space:** `A` stores an array of 5 elements, i.e. `n` units. `n`, `s` and `i` are scalar variables, 1 unit each.

**`SC = n + 1 + 1 + 1 = n + 3 = O(n)`**

:::note
Here the input array `A` is counted. If you count only the **extra** memory the code uses (auxiliary space), it's just `n`, `s` and `i`, so the auxiliary space is `O(1)`.
:::

#### Example 2: Nested loops

```java
for (int i = 0; i < n; i++) {       // -----> n + 1
    for (int j = 0; j < n; j++) {   // -----> n * (n + 1)
        s = s + A[i];               // -----> n * n
    }
}
```

**`TC = (n + 1) + (n² + n) + n² = 2n² + 2n + 1 = O(n²)`**

#### Example 3: Three nested loops

```java
for (int i = 0; i < n; i++) {           // -----> n + 1
    for (int j = 0; j < n; j++) {       // -----> n * (n + 1)
        s = 10;                         // -----> n * n

        for (int k = 0; k < n; k++) {   // -----> (n * n) * (n + 1)
            s = s + A[i];               // -----> n * n * n
        }
    }
}
```

**`TC = (n + 1) + (n² + n) + n² + (n³ + n²) + n³ = 2n³ + 3n² + 2n + 1 = O(n³)`**

#### Example 4: Loop with a step of 2

```java
for (int i = 0; i < n; i = i + 2) { // -----> n/2 + 1
    // statement                       -----> n/2
}
```

`i` goes 0, 2, 4, … so the loop runs only half as many times.

**`TC = (n/2 + 1) + n/2 = n + 1 = O(n)`**

#### Example 5: Inner loop depends on `i`

```java
for (int i = 0; i < n; i++) {           // -----> n + 1
    for (int j = i + 1; j < n; j++) {   // -----> runs (n - 1 - i) times
        s = s + A[i];                   // -----> (n - 1) + (n - 2) + ... + 0
    }
}
```

| `i` | Inner loop runs |
| --- | --- |
| 0 | `n - 1` times |
| 1 | `n - 2` times |
| … | … |
| `n - 1` | 0 times |

```text
TC = (n - 1) + (n - 2) + (n - 3) + ... + 1 + 0

We know, 1 + 2 + ... + n = n(n + 1) / 2

Therefore, 1 + 2 + ... + (n - 1) = (n - 1)(n - 1 + 1) / 2
                                 = n(n - 1) / 2
                                 = (n² - n) / 2
                                 = O(n²)
```

#### Example 6: Outer loop jumps by `k`

```java
//n=50, k=5
for (int i = 0; i < n; i = i + k) {  // -----> n/k + 1
    for (int j = 0; j <= k; j++) {   // -----> (n/k) * (k + 2)
        // statement                    -----> (n/k) * (k + 1)
    }
}
```

The outer loop runs `n/k` times (same as example-4), and the inner loop runs `k + 1` times for each of them.

**`TC = (n/k) * (k + 1) = n + n/k = O(n)`**

### Practice

Calculate these yourself first, then open the answer to verify.

#### Example 7

```java
for (int i = 0; i < n; i++) {
    for (int j = 0; j < i; j++) {
        // statement
    }
}
```

<details>
<summary>Show answer</summary>

The inner loop runs `i` times, so for `i = 0, 1, 2, …, n - 1`:

```text
0 + 1 + 2 + ... + (n - 1) = n(n - 1) / 2
```

**`TC = O(n²)`**

</details>

#### Example 8

```java
int p = 0;
for (int i = 1; p <= n; i++) {
    p = p + i;
}
```

<details>
<summary>Show answer</summary>

| `i` | `p` |
| --- | --- |
| 1 | 0 + 1 = 1 |
| 2 | 1 + 2 = 3 |
| 3 | 1 + 2 + 3 = 6 |
| … | … |
| `k` | 1 + 2 + ... + k = k(k + 1) / 2 |

The loop stops when `p > n`:

```text
k(k + 1) / 2 > n
k² > n          (roughly)
k > √n
```

**`TC = O(√n)`**

</details>

#### Example 9

```java
for (int i = 1; i < n; i = i * 2) {
    // statement
}
```

<details>
<summary>Show answer</summary>

`i` doubles every step: `1, 2, 4, 8, …, 2ᵏ`. The loop stops when `2ᵏ ≥ n`:

```text
2ᵏ ≥ n
k ≥ log₂ n
```

**`TC = O(log n)`**

</details>


<!-- Rules of thumb:

- Loops **one after another** → add: `O(n) + O(n) = O(n)`
- Loops **inside each other** → multiply: `O(n) × O(n) = O(n²)`
- Halving or doubling each step → `O(log n)`

### ArrayList operation costs

Connecting the two topics:

| Operation | Time complexity | Why |
| --- | --- | --- |
| `get(i)`, `set(i, x)` | `O(1)` | Direct index into the internal array |
| `add(x)` at the end | `O(1)` amortized | Occasional resize copies everything |
| `add(i, x)` in the middle | `O(n)` | Shifts later elements right |
| `remove(i)` | `O(n)` | Shifts later elements left |
| `contains(x)`, `indexOf(x)` | `O(n)` | Checks elements one by one |
| `size()` | `O(1)` | Stored as a field |

### Common mistakes

- **Hidden loops.** Calling `list.contains(x)` inside a loop is `O(n)` × `O(n)` = `O(n²)`.
- **Keeping constants.** `O(2n)` is just `O(n)`.
- **Confusing best and worst case.** Big-O usually means the worst case unless stated otherwise. -->
