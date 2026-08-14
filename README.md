# Bank of America — Consumer & Wealth Front-End Estate

Angular **18.2** monorepo containing the shared front-end platform libraries and
five product applications. The toolchain has been uplifted to Angular 18
(programme `BOFA-9000`); the per-library and per-application workstreams are
tracked in `MIGRATION.md`.

> This repository is a demo estate. The code is representative of a real legacy
> Angular workspace — shared design system, class guards, NgModules, Material
> overrides reaching into private DOM — but the data is fictitious.

---

## Layout

```
bofa-legacy-platform/
├── projects/
│   ├── bofa-ds/                    library  · design system over Angular Material
│   ├── bofa-core/                  library  · session, entitlements, API client, money pipe
│   ├── bofa-compliance/            library  · audit trail, feature flags, disclosure dialog
│   ├── digital-banking/            app      · retail accounts + transfers      (port 4200)
│   ├── card-services/              app      · consumer card catalogue          (port 4201)
│   ├── mortgage-origination/       app      · home-loan application wizard     (port 4202)
│   ├── wealth-advisor/             app      · Merrill holdings workstation     (port 4203)
│   └── small-business-banking/     app      · ACH payroll batches              (port 4204)
├── services/                       five dependency-free mock edge services (ports 7001-7005)
```

Every application depends on all three libraries, so a change in
`bofa-ds` has a blast radius of five applications. That coupling is the
central constraint of the migration.

| | bofa-ds | bofa-core | bofa-compliance |
|---|---|---|---|
| digital-banking | ✅ | ✅ | ✅ |
| card-services | ✅ | ✅ | ✅ |
| mortgage-origination | ✅ | ✅ | ✅ |
| wealth-advisor | ✅ | ✅ | ✅ |
| small-business-banking | ✅ | ✅ | ✅ |

Team ownership is recorded in `.github/CODEOWNERS`.

## Running it

Requires Node 20 (`.nvmrc`) — Angular 18 requires `^18.19.1 || ^20.11.1 || >=22`.

```bash
nvm use                 # 20.20.2
npm install --legacy-peer-deps

npm run build:libs      # build the three libraries
npm run build           # build everything (libraries + five apps)
npm test                # unit tests for every project

npm start               # digital-banking      → http://localhost:4200
npm run start:cards     # card-services        → http://localhost:4201
npm run start:mortgage  # mortgage-origination → http://localhost:4202
npm run start:wealth    # wealth-advisor       → http://localhost:4203
npm run start:sbb       # small-business-banking → http://localhost:4204

npm run services        # the five mock edge services on 7001-7005
```

## Known technical debt

The uplift to Angular 18 is tracked in [`MIGRATION.md`](./MIGRATION.md), which
lists every known blocker, where it lives, and how the work is split across
parallel workstreams.
