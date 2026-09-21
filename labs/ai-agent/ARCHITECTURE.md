# AI Agent Architecture

```mermaid
flowchart LR
  U[User] --> R[Router]
  R --> P[AI / Tool Plugin]
  P --> V[Validator]
  V --> T[Tool]
  T --> O[Structured output]
  O --> E[Execution trace]
```

The default demo uses deterministic local tools so it can run offline. The optional OpenAI-compatible adapter uses the same application boundary when a real model provider is configured.
