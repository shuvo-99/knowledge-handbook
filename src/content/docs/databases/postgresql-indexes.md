---
title: PostgreSQL Indexes
description: What indexes are, how B-tree indexes work, and when they help or hurt.
sidebar:
  order: 10
---

## Concept

An index is a separate data structure that lets the database find rows without scanning the whole table. It trades extra storage and slower writes for faster reads.

## How it works

PostgreSQL's default index type is a **B-tree**: a balanced tree of sorted keys pointing to row locations (TIDs). A lookup walks from the root to a leaf in `O(log n)` steps.

B-trees support:

- equality: `=`
- ranges: `<`, `<=`, `>`, `>=`, `BETWEEN`
- prefix matching: `LIKE 'abc%'` (with the right collation or `text_pattern_ops`)
- `ORDER BY` on the indexed columns

Other index types exist for other access patterns: **GIN** (arrays, JSONB, full-text), **GiST** (geometric, ranges), **BRIN** (huge, naturally ordered tables), **Hash** (equality only).

## Code

```sql
-- Single-column index
CREATE INDEX idx_orders_customer_id ON orders (customer_id);

-- Composite index: column order matters (leftmost prefix rule)
CREATE INDEX idx_orders_customer_created ON orders (customer_id, created_at DESC);

-- Partial index: only index the rows you query
CREATE INDEX idx_orders_pending ON orders (created_at) WHERE status = 'pending';

-- Build without locking writes on a live table
CREATE INDEX CONCURRENTLY idx_users_email ON users (email);

-- Check whether the planner uses it
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;
```

## When to use it

- Columns in frequent `WHERE`, `JOIN` or `ORDER BY` clauses
- Foreign keys (PostgreSQL does **not** index them automatically)
- Selective queries that return a small fraction of rows

## Common mistakes

- **Indexing everything.** Each index slows down `INSERT`/`UPDATE`/`DELETE` and uses disk.
- **Wrong column order in composite indexes.** `(a, b)` helps `WHERE a = ?` and `WHERE a = ? AND b = ?`, but not `WHERE b = ?` alone.
- **Wrapping the column in a function.** `WHERE lower(email) = ?` can't use an index on `email`; create an expression index on `lower(email)` instead.
- **Low-selectivity columns.** An index on a boolean column rarely helps; the planner will prefer a sequential scan.

## Related notes

- [Transactions & Isolation Levels](../transactions/)
