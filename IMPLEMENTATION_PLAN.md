# HongT Enterprise Implementation Plan

## Execution protocol

- Implement one bounded slice per turn.
- Stop after each slice for review.
- Do not advance until the current slice passes tests and the review requirement is met.
- Preserve the existing React SPA and API contracts while adding enterprise capabilities.

## Phase 1 - Foundation and data layer

- [x] 1. Add and test the vehicle status state machine.
- [ ] 2. Extend environment validation and document required configuration.
- [ ] 3. Expand the Prisma schema with brands, locations, vehicles, media, inquiries, refresh tokens, price history, and audit logs.
- [ ] 4. Add PostgreSQL migrations and indexes.
- [ ] 5. Implement the seed script and seed fixture data.
- [ ] 6. Add focused state machine and seed validation tests.

## Phase 2 - Auth, RBAC, and public showroom

- [ ] 1. Implement refresh token rotation and lockout rules.
- [ ] 2. Implement public showroom, catalog, comparison, and inquiry endpoints.
- [ ] 3. Add caching, rate limiting, validation, and public response sanitization.
- [ ] 4. Add public API integration tests.

## Phase 3 - Admin CMS, media, and audit

- [ ] 1. Implement admin vehicle CRUD and status/pricing workflows.
- [ ] 2. Implement optimistic concurrency and transactional audit/price history.
- [ ] 3. Implement media presigning, registration, reorder, and cleanup.
- [ ] 4. Implement dashboard and CRM endpoints.
- [ ] 5. Add critical integration and conflict tests.

## Review checkpoints

- Checkpoint 1: state machine behavior is correct.
- Checkpoint 2: schema, migrations, and seed data are valid.
