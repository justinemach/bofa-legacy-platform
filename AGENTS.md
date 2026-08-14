# Working in this repository

## Environment

- Node **20** (`nvm use`) — Angular 18 requires `^18.19.1 || ^20.11.1 || >=22`.
- Install with `npm install --legacy-peer-deps`.
- Chrome is required for the Karma tests (`CHROME_BIN`).

## Before you open a PR

```bash
npm run build     # three libraries + five applications
npm test          # unit tests for every project
```

Both must pass. There is no lint target.

## Conventions

- Product applications never import from `@angular/material` for anything the
  design system already wraps. Use `bofa-ds` components.
- Anything a product needs from the platform comes from `bofa-core`
  (`SessionService`, `ApiClientService`, `EntitlementsGuard`, `bofaMoney`) or
  `bofa-compliance` (`AuditLogService`, `FeatureFlagService`,
  `DisclosureDialogComponent`).
- Every customer-impacting action records an audit event.
- Styling that reaches into Material's private DOM is confined to the component
  that owns the override, and must carry a comment explaining why.

## Ownership and scope

`.github/CODEOWNERS` maps every directory to the owning team. Stay inside the
paths your task names — the migration programme runs several workstreams in
parallel and cross-project edits cause merge conflicts. If you need a change in
a shared library, note it in your PR description as a follow-up for that
library's workstream rather than making it yourself.

## Migration work

Read `MIGRATION.md` first. It lists every known Angular 18 blocker, the file it
lives in, and which workstream owns it.

`docs/DEMO-RUNBOOK.md` describes how the migration programme is run end to end:
the workstream sequencing, the orchestrator and per-workstream playbooks, and
the rules every session works under. Read it if you are orchestrating the
migration rather than executing a single workstream.
