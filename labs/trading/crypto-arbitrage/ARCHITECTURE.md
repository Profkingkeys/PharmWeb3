# Crypto Arbitrage Architecture

```mermaid
flowchart LR
  M[Market snapshots] --> S[Spread engine]
  S --> R[Risk + fee checks]
  R --> A[AI decision plugin]
  A -->|PAPER_TRADE| E[Paper executor]
  A -->|REVIEW| H[Human review]
  E --> T[Telemetry]
```

There is no live exchange execution in this portfolio lab.
