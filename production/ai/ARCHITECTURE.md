# Production AI Layer

The original deterministic agent lab remains intact. This layer adds a provider registry, a stable tool registry, durable agent-run records, and repeatable provider evaluation.

```mermaid
flowchart LR
  I[Input] --> R[Provider registry]
  R --> M[Local / OpenAI-compatible / Groq-compatible]
  M --> T[Tool registry]
  T --> O[Validated output]
  O --> S[(Agent run store)]
  S --> E[Evaluation report]
```

Remote providers are opt-in through environment variables. The deterministic provider makes CI reproducible without a model API or network dependency.
