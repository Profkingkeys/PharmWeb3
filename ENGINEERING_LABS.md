# Engineering Labs

These are runnable engineering projects behind the PharmWeb3 portfolio.

| Lab | Command | Test |
|---|---|---|
| AI Agent | `npm run demo:ai -- "show me AI projects"` | `npm run test:ai` |
| Crypto Arbitrage | `npm run demo:arbitrage` | `npm run test:trading` |
| Forex AI | `npm run demo:forex` | `npm run test:trading` |
| SaaS API | `npm run demo:saas` | `npm run test:saas` |
| Telemetry | `npm run demo:telemetry` | `npm run test:telemetry` |
| MySQL | `docker compose -f infra/mysql/docker-compose.yml up -d` | GitHub Actions |
| Android | Open `labs/mobile/hybrid-webview` in Android Studio | GitHub Actions |

## Engineering rules

AI output is treated as untrusted input and validated before privileged actions. Trading defaults to paper mode. Secrets live in environment variables. Healthcare data is kept outside public blockchain payloads.

The labs intentionally separate **decision → validation → execution → telemetry** so individual layers can be tested and replaced.
