# Telemetry Architecture

```mermaid
flowchart LR
  A[Application action] --> S[Span]
  S --> E[Structured event]
  E --> X[Console / exporter]
  S --> F[Error status]
```
