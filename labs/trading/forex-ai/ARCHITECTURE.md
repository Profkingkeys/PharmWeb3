# Forex AI Architecture

```mermaid
flowchart LR
  C[OHLC candles] --> F[Feature extraction]
  F --> A[AI setup classifier]
  A --> V[Risk validation]
  V --> P[Paper order]
  P --> T[Telemetry]
```
