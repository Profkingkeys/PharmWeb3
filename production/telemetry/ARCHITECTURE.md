# Production Telemetry

The exporter implements OTLP/HTTP JSON and emits trace spans to the standard `/v1/traces` endpoint when configured.

```mermaid
flowchart LR
  AI[AI agent] --> S[SaaS request]
  S --> T[Trading decision]
  T --> DB[Database]
  AI -. trace .-> X[(OTLP collector)]
  S -. trace .-> X
  T -. trace .-> X
  DB -. trace .-> X
  X --> D[APM / dashboards]
```

The local mode is deterministic. Set `OTEL_EXPORTER_OTLP_ENDPOINT` or `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` to switch to network export.
