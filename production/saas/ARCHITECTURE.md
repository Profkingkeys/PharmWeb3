# Production SaaS Layer

```mermaid
flowchart LR
  C[Client] --> K[Bearer API key]
  K --> A[API-key verifier]
  A --> T[Tenant guard]
  T --> S[Scoped service]
  S --> DB[(Tenant-scoped data)]
  A --> L[Audit / telemetry]
```

API keys are represented by salted scrypt hashes. Rotation revokes the prior record. Tenant identity is explicit at the request boundary, and ownership checks reject resources belonging to another tenant.
