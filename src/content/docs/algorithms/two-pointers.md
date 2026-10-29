---
title: Two Pointers
description: Solving array and string problems in O(n) by moving two indices.
sidebar:
  order: 10
---

## Concept

Use two indices that move through the data according to a rule, replacing a nested `O(n²)` loop with a single `O(n)` pass.

## Patterns

- **Opposite ends**: start at both ends of a sorted array and move inward (pair sum, palindrome check, container with most water).
- **Same direction (fast/slow)**: one pointer reads, the other writes (remove duplicates, move zeroes), or detects cycles in linked lists.

## Code

```ts
// Pair with target sum in a sorted array — O(n) time, O(1) space
function twoSumSorted(nums: number[], target: number): [number, number] | null {
	let left = 0;
	let right = nums.length - 1;

	while (left < right) {
		const sum = nums[left] + nums[right];
		if (sum === target) return [left, right];
		if (sum < target) left++;
		else right--;
	}
	return null;
}
```

## When to use it

- Input is sorted (or sorting it is acceptable)
- You need pairs/subarrays satisfying a condition
- In-place array modification with `O(1)` extra space

## Common mistakes

- Applying opposite-ends logic to **unsorted** input.
- Off-by-one: `left < right` vs `left <= right`.
- Forgetting to skip duplicates in problems like 3Sum.
