# Next Upgrade

The portfolio has moved from runnable demonstrations into a production-oriented engineering layer.

## Completed

### AI
- provider evaluation matrix with deterministic CI coverage
- local, OpenAI-compatible and optional Groq-compatible provider adapters
- stable tool registry
- persistent agent-run records
- automated evaluation reporting with accuracy and latency fields
- calculator implementation without dynamic code execution

### Trading
- exchange adapter boundary
- venue-aware fixture market data
- rate limiting
- historical CSV ingestion
- persistent paper-trading ledger
- portfolio reconstruction
- explicit risk engine and stop-loss calculation
- paper-only execution boundary

### SaaS
- salted scrypt API-key hashing
- API-key verification and rotation
- tenant and scope authorization
- OpenAPI 3.1 reference contract
- cross-tenant ownership tests

### Telemetry
- OTLP/HTTP JSON exporter
- trace, span and parent-span propagation
- AI → SaaS → trading → database example pipeline
- exporter integration test

The exporter follows the OTLP/HTTP JSON wire contract. It is not a claim that the full OpenTelemetry SDK has been installed.

### Android
- instrumentation test configuration
- Activity launch smoke test
- debug APK artifact upload in CI
- emulator-based instrumentation job
- Gradle 8.10.2 pinning

### Showcase
- production engineering dashboard
- architecture diagram
- GitHub Pages deployment workflow

## Remaining hardening

- generate and commit the official Gradle wrapper files, including gradle-wrapper.jar
- persist API-key records through the MySQL schema
- run OpenAPI contract tests against the live HTTP server
- deploy an OTLP collector and connect a public APM dashboard
- add authenticated exchange adapters with secret management, retries and circuit breakers
- replace fixture quotes with real historical market-data ingestion
- verify GitHub Pages deployment and publish its live URL
