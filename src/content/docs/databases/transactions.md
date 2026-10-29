---
title: Transactions & Isolation Levels
description: ACID, isolation levels and the anomalies each one prevents.
sidebar:
  order: 20
---

## Concept

A transaction groups several operations into one unit: either all of them take effect, or none do.

## ACID

| Property | Meaning |
| --- | --- |
| **Atomicity** | All or nothing |
| **Consistency** | Constraints hold before and after |
| **Isolation** | Concurrent transactions don't see each other's partial work |
| **Durability** | Once committed, data survives crashes |

## Isolation levels

| Level | Dirty read | Non-repeatable read | Phantom read | Serialization anomaly |
| --- | --- | --- | --- | --- |
| Read Committed (PostgreSQL default) | No | Possible | Possible | Possible |
| Repeatable Read | No | No | No* | Possible |
| Serializable | No | No | No | No |

\* PostgreSQL's Repeatable Read also prevents phantoms because it uses snapshot isolation.

## Code

```sql
BEGIN ISOLATION LEVEL SERIALIZABLE;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
```

```ts
// Retry on serialization failure (SQLSTATE 40001)
for (let attempt = 0; attempt < 3; attempt++) {
	try {
		await db.transaction(async (tx) => transfer(tx, from, to, amount));
		break;
	} catch (err) {
		if (err.code !== '40001') throw err;
	}
}
```

## Common mistakes

- Using Serializable without retry logic — conflicts are expected, not bugs.
- Holding a transaction open across slow network calls, which blocks other writers and vacuum.
- Read-then-write without `SELECT ... FOR UPDATE` at Read Committed, causing lost updates.

## Related notes

- [PostgreSQL Indexes](../postgresql-indexes/)
