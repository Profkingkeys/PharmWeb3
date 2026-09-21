# AI Builder Lab

A practical collection of AI-agent patterns used as engineering components rather than chat-only demos.

## Patterns

- tool selection
- structured outputs
- deterministic validation around model output
- agent state and execution traces
- human approval boundaries
- external API adapters

## Design rule

The model proposes or interprets an action; application code validates the action before execution. This keeps business rules, permissions, and safety constraints outside the model.
