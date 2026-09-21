# MySQL Infrastructure

Local relational-data infrastructure for portfolio applications.

The setup uses Docker Compose so the database can be reproduced without installing MySQL directly on the host.

## Principles

- schema-first development
- environment variables for credentials
- migrations before production use
- least-privilege application users
- indexes based on measured query patterns
