# PharmWeb3

> **AI × Healthcare × Web3 — building practical software for better access to healthcare.**

**Kingsley Umoh (Profkingkeys)** — Founder & Technical Lead, PharmWeb3  
**Portfolio:** https://pharmweb3.com/portfolio  
**Product:** https://pharmweb3.com/  
**GitHub:** https://github.com/Profkingkeys

PharmWeb3 is a product venture exploring how pharmacy practice, artificial intelligence, software engineering and carefully scoped Web3 infrastructure can work together to reduce barriers to healthcare.

The public product currently describes three connected pillars: **education & engagement, AI-assisted triage with pharmacist handoff, and financial support through medical-bill supplements and medication-voucher workflows.** The product also states that the AI layer has clinical boundaries and does not replace licensed professional care.

---

## What I build

I work across the product stack rather than treating frontend, backend, AI and infrastructure as separate worlds.

### AI & prompt engineering
- LLM application design
- Prompt engineering
- Tool-calling agents
- Structured model outputs
- AI workflow orchestration
- AI-assisted research pipelines
- Human-in-the-loop approval patterns
- Model fallback and provider routing

### Full-stack & SaaS
- JavaScript / Node.js
- Express
- Python / FastAPI
- REST APIs
- Authentication and authorization
- JWT / Passport
- Socket.IO
- Email and notification workflows
- SaaS-style product architecture

### Data & infrastructure
- MySQL
- MongoDB / Mongoose
- Supabase
- Relational schema design
- Environment-based configuration
- Docker-based local infrastructure
- Telemetry and observability

### Mobile & hybrid applications
- Android
- Kotlin
- Java
- WebView
- JavaScript ↔ native bridges
- Browser/mobile compatibility layers

### Web3
- Solana-oriented product concepts
- Token metadata
- IPFS-linked assets
- Wallet-oriented workflows
- Web3 product and reward mechanics

### Product engineering
- UX-driven frontend development
- System architecture
- Technical documentation
- Product prototyping
- SaaS/product strategy
- Founder-level product thinking

---

## Selected engineering work

| Project | What it demonstrates |
|---|---|
| **PharmWeb3** | Healthcare + AI + Web3 product direction and token infrastructure |
| **PharmWeb3 Full Stack** *(private)* | Node/Express backend, JWT auth, Passport, Socket.IO, email, product workflows |
| **PharmWeb3 AI API** *(private)* | FastAPI, Groq, OpenAI-compatible APIs, NVIDIA fallback, Edge TTS, structured AI workflows |
| **PharmaCare** | Healthcare-focused responsive frontend |
| **PW3QA** | Android WebView + JavaScript networking bridge |
| **Chess Game** | Stateful interactive frontend and third-party library integration |
| **Revolexa** *(private)* | Health/AI product interface and product storytelling |
| **AI Builder Lab** | Agent/tool architecture and structured automation |
| **Trading Labs** | AI-assisted arbitrage/forex research with paper execution |
| **Research Lab** | AI-assisted biomedical literature and evidence workflows |

---

## Engineering philosophy

I prefer systems where the important parts can be inspected.

```text
Problem
  ↓
User workflow
  ↓
Product interface
  ↓
AI / automation
  ↓
Business rules
  ↓
Data + APIs
  ↓
Mobile / Web3 integrations
  ↓
Telemetry
  ↓
Measured iteration
```

For high-impact domains, AI does not get unrestricted control of the system. Application code validates model output before sensitive actions.

For healthcare, private health information stays outside public blockchain payloads.

For financial automation, research systems default to paper/sandbox execution rather than claiming live profitability.

---

## Venture-scale product direction

The larger vision is not “a token with a website.” It is a software platform around healthcare access:

**Acquire knowledge → interact with AI → reach a pharmacist when necessary → qualify for support → receive measurable assistance.**

Potential long-term layers include:

- AI-assisted healthcare navigation
- pharmacist workflow software
- health-literacy incentives
- medication-voucher infrastructure
- medical financial-assistance rails
- anonymized research tooling
- partner APIs and SaaS products
- data/telemetry infrastructure for healthcare operations

These are product directions, not claims that every component is already deployed.

---

## Repository map

```text
PharmWeb3/
├── ABOUT_ME.md
├── PORTFOLIO.md
├── STACK.md
├── ROADMAP.md
├── SECURITY.md
├── CONTRIBUTING.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── PORTFOLIO_POSITIONING.md
│   ├── VENTURE_OVERVIEW.md
│   └── SOURCE_MAP.md
├── labs/
│   ├── ai/
│   ├── trading/
│   └── mobile/
├── infra/
│   └── mysql/
├── observability/
├── research/
│   └── cancer-ai/
├── token.json
└── LICENSE
```

---

## Runnable engineering labs

The repository now includes executable AI, trading, SaaS, telemetry, MySQL and Android/WebView labs with tests and CI.

Run the Node labs with `npm test`, `npm run demo:ai`, `npm run demo:arbitrage`, `npm run demo:forex` and `npm run demo:telemetry`. The MySQL and Android paths are wired into GitHub Actions.

---

## Start here

1. [About Me](./ABOUT_ME.md)
2. [Portfolio](./PORTFOLIO.md)
3. [Stack](./STACK.md)
4. [Architecture](./docs/ARCHITECTURE.md)
5. [Venture Overview](./docs/VENTURE_OVERVIEW.md)
6. [AI Builder Lab](./labs/ai/)
7. [Trading Labs](./labs/trading/)
8. [Mobile Lab](./labs/mobile/)

**For the work behind the public product:** https://pharmweb3.com/portfolio
