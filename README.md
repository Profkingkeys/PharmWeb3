# Engineering Labs

Runnable and production-oriented systems behind the PharmWeb3 technical portfolio.

## Quick start

- npm test
- npm run test:production
- npm run eval:ai:production
- npm run demo:ai -- "show me AI projects"
- npm run demo:arbitrage:backtest
- npm run demo:forex:backtest
- npm run demo:production:trading
- npm run demo:production:pipeline

## Production layer

The repository now includes explicit engineering boundaries for:

- AI provider evaluation, tool registration and persistent agent runs
- exchange adapter interfaces, rate limiting, historical ingestion, paper ledger and risk controls
- API-key hashing, rotation, tenant authorization and OpenAPI contracts
- OTLP/HTTP JSON tracing across AI, SaaS, trading and database stages
- Android instrumentation tests and CI APK artifacts
- a public static engineering dashboard

## Showcase

Open demos/showcase/index.html for the main showcase and demos/showcase/dashboard.html for the production engineering dashboard.

A GitHub Pages workflow is included at .github/workflows/showcase-pages.yml.

## Standards

AI output is validated before privileged actions. Financial automation defaults to paper/sandbox execution. SaaS APIs require tenant context and production API keys are hashed rather than stored as plaintext. Telemetry follows the OTLP/HTTP JSON contract when an exporter endpoint is configured.

The Android workflow pins Gradle 8.10.2. The official Gradle wrapper binary is documented separately in labs/mobile/hybrid-webview/GRADLE_WRAPPER.md.
