# Contributing

This repository is both a product repository and an engineering portfolio.

## Before adding code

- Keep existing product behavior intact unless a change is intentional.
- Put experiments in the appropriate lab instead of mixing them into production-oriented paths.
- Never commit secrets, private keys or personal health information.
- Document external services and required environment variables.
- Prefer small, reviewable commits.

## AI code

AI-generated code must still be reviewed like human-written code.

For agent workflows:

1. validate model output;
2. enforce application-level permissions;
3. log important tool executions;
4. avoid sending secrets into prompts;
5. define clear failure states.

## Financial automation

Trading examples use paper/sandbox execution by default. Live execution should never be enabled by accident.

## Healthcare

Clinical claims, medication guidance and patient-data flows require appropriate professional review. AI is not treated as an autonomous medical decision-maker.
