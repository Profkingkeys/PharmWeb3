# Production Trading Layer

The original paper-trading labs remain unchanged. This layer adds explicit exchange boundaries, request pacing, historical ingestion, a durable paper ledger, portfolio reconstruction and risk controls.

```mermaid
flowchart LR
  H[Historical data] --> I[Ingestion]
  I --> A[Exchange adapter]
  A --> L[Rate limiter]
  A --> O[Opportunity engine]
  O --> R[Risk engine]
  R -->|approved| P[Paper fill]
  P --> D[(Persistent ledger)]
  D --> V[Portfolio view]
```

No live order API is exposed here. A future authenticated exchange implementation can replace the fixture adapter without changing the risk or ledger contracts.
