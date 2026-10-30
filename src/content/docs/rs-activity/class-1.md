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

### How to find it
**Example-1**

```java
A = [9,6,12,17,11]
n = 5

int Sum(A,n){
  
  int s = 0;    //-------> 1

  for ( int i=0; i<n; i++){  //-------> n+1
    s = s + A[i]; //-----> n
  }

  return s;  //-----> n
};
```

Note - statement / declarations are count as 1 unit

Lets's break it down.
```
i= 0, 0 < 5 correct mark 
i= 1, 1 < 5 correct mark 
i= 2, 2 < 5 correct mark 
i= 3, 3 < 5 correct mark 
i= 4, 4 < 5 correct mark 
i= 5, 5 < 5 correct mark 
i= 6, 6 < 5 cross mark 
```
now conditioned, 
satisfied - 5 times
not satisfied - 1 times
------------------------
Total = 6 (5 +1) times loop iterated
i.e (n+1) - times loop iterated

Went inside the loop = 5 i.e n times 

**`TC = 1 + n + 1 + n = O(n)`**

**Example-2**

```java
for ( int i=0; i<n; i++){   //-----> n+1
  for ( int j=0; j<n; j++){ //-----> (n)*(n+1)
    s = s + A[i];           //-----> (n*n)
  }
}
```
**`TC = n + 1 + n^2 + n + n^2 = O(n^2)`**

**Example-3**

```java
for ( int i=0; i<n; i++){   //-----> n+1
  for ( int j=0; j<n; j++){ //-----> (n)*(n+1)
    s = 10;                 //-----> (n*n)

    for ( int k=0; k<n; j++){   //-----> (n*n)(n+1)
      s = s + A[i];             //-----> (n*n*n)
    }
  }
}
```
**`TC = n + 1 + n^2 + n + n^2 + n^3 + n^2 + n^3 = O(n^3)`**

**Example-4**

```java
for ( int i=0; i<n; i=i+2){ //-----> (n/2)+1
  // statement                -----> n/2
}
```
**`TC = n/2 = O(n)`**

**Example-5**

```java
for ( int i=0; i<n; i++){       //-----> n+1
  for ( int j=i+1; j<n; j++){   //-----> n+1
    s = s + A[i];               //-----> n+1
  }
}
```
```
TC = (n-1) + (n-2) + (n-3) + ..... + 1 + 0

We know,

for 0 to n = n(n+1)/2

Therfore, for 0 to n-1 = ((n-1)(n-1+1))/2 = O(n^2) 
``` 

**Example-6**

```java
for ( int i=0; i<n; i = i+k){ //-----> (n/k) + 1
  for ( int j=0; j<=k; j++){  //-----> (n/k)*(k+2)
    // Statement                -----> (n/k)*(k+1)
  }
}
```
**`TC = (n/k) * (k+1) = n + n/k = O(n)`**

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

## Questions / follow-ups

-
