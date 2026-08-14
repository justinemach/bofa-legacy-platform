# BOFA-9000 — Angular 14 → 18 uplift

Angular 14 left long-term support in November 2023. This document is the
programme's working plan: what blocks the uplift, where it lives, and how the
work is split so several engineers (or several Devin sessions) can run in
parallel without colliding.

Angular only supports **one major at a time**, so the version bump itself is
`14 → 15 → 16 → 17 → 18`, each step with `ng update @angular/core @angular/cli`
plus its migration schematics. The interesting work is everything the
schematics cannot do for us.

---

## Blockers, by workstream

### W0 — Toolchain (must land first, blocks everything)

| # | What | Where |
|---|---|---|
| 0.1 | Node 16 is below Angular 18's floor (`^18.19.1 \|\| ^20.11.1 \|\| >=22`) | `.nvmrc`, `package.json` engines, `.github/workflows/ci.yml` |
| 0.2 | Five staged `ng update` runs, TypeScript 4.7 → 5.4, RxJS 7.5 → 7.8, zone.js 0.11 → 0.14 | `package.json`, `package-lock.json` |
| 0.3 | `angular.json` keys removed in v15/v16: `defaultProject`, `browserTarget` (now `buildTarget`), string `polyfills` (now an array), separate `test.ts` entrypoint with `require.context` | `angular.json`, `projects/*/src/test.ts` |
| 0.4 | Dead configs to delete: `tslint.json` (codelyzer never ran), `e2e/protractor.conf.js` (Protractor EOL) | repo root, `e2e/` |

### W1 — Design system `bofa-ds` (blocks all five apps)

Angular Material 15 replaced every component with an MDC implementation. The
internal DOM changed, so anything reaching past the public API breaks silently:
the app still compiles and the styling simply stops applying.

| # | What | Where |
|---|---|---|
| 1.1 | Legacy Sass theming API: `@import '~@angular/material/theming'`, `mat-core()`, `mat-palette()`, `mat-light-theme()`, `mat-typography-config()`. Modern API is `@use '@angular/material' as mat` + `mat.m2-define-palette` / `mat.m2-define-light-theme` | `projects/bofa-ds/src/styles/_bofa-theme.scss` |
| 1.2 | `::ng-deep .mat-button-wrapper` → `.mdc-button__label` | `bofa-button.component.scss` |
| 1.3 | `appearance="legacy"` was removed; only `fill` and `outline` survive | `bofa-field.component.html` |
| 1.4 | `.mat-form-field-infix` / `.mat-form-field-label` / `.mat-form-field-underline` renamed; padding overrides should move to density + `--mdc-outlined-text-field-*` tokens | `bofa-field.component.scss` |
| 1.5 | `.mat-card-title` / `.mat-card-subtitle` / `.mat-card-header-text` restructured under MDC | `bofa-panel.component.scss` |
| 1.6 | `<mat-chip-list>` no longer exists — chips split into `mat-chip-set` / `mat-chip-listbox` / `mat-chip-grid`, and `.mat-chip` classes changed | `bofa-tag-list.component.{html,scss}` |

### W2 — Platform core `bofa-core` (blocks all five apps)

| # | What | Where |
|---|---|---|
| 2.1 | `.toPromise()` (removed in RxJS 8) → `firstValueFrom()` | `api-client.service.ts` |
| 2.2 | Class-based `CanActivate` guard is deprecated in v15+ → functional `CanActivateFn` | `entitlements.guard.ts` |
| 2.3 | `ModuleWithProviders` + `forRoot()` provider pattern → `makeEnvironmentProviders` / `provideBofaCore()` (optional modernisation) | `bofa-core.module.ts` |

### W3 — Compliance `bofa-compliance`

| # | What | Where |
|---|---|---|
| 3.1 | `entryComponents` was removed from `@NgModule` in v15 — build error | `bofa-compliance.module.ts` |
| 3.2 | `::ng-deep .mat-dialog-container` → `.mat-mdc-dialog-container` | `disclosure-dialog.component.scss` |
| 3.3 | `.toPromise()` and the deprecated positional `subscribe(next, error, complete)` signature | `audit-log.service.ts`, `feature-flag.service.ts` |

### W4-W8 — One workstream per product application

Each app owns its own Material overrides and its own deprecated calls. These
five can run fully in parallel once W1-W3 have landed.

| Workstream | App | App-specific blockers |
|---|---|---|
| W4 | `digital-banking` | `.toPromise()` in `accounts.service.ts`; `*ngIf`/`*ngFor` → `@if`/`@for` |
| W5 | `card-services` | `::ng-deep .mat-tab-label` / `.mat-ink-bar` renamed under MDC tabs |
| W6 | `mortgage-origination` | `appearance="standard"` removed; `::ng-deep .mat-step-header` / `.mat-horizontal-content-container`; `.toPromise()` in `rate-quote.service.ts` |
| W7 | `wealth-advisor` | `::ng-deep .mat-header-cell` / `.mat-cell` / `.mat-row` → `.mat-mdc-*`; deprecated positional `subscribe()` |
| W8 | `small-business-banking` | `::ng-deep .mat-list-item-content` (MDC list restructured); `.mat-slide-toggle-thumb` → `.mdc-switch__handle` |

### W9 — Optional modernisation (after the estate is green on 18)

Standalone components, `@if`/`@for` control flow, `inject()`, functional
interceptors, and the new application builder. All have schematics; none should
be mixed into the version bump.

---

## How the work is parallelised

```
        ┌──────────────────────────────┐
        │ W0  toolchain + ng update    │   one session, lands on main first
        └───────────────┬──────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
     ┌──▼───┐       ┌───▼────┐    ┌─────▼──────┐
     │ W1 ds│       │W2 core │    │W3 compliance│  three sessions in parallel
     └──┬───┘       └───┬────┘    └─────┬──────┘
        └───────────────┼───────────────┘
                        │
   ┌──────┬─────────────┼─────────────┬──────────┐
   │      │             │             │          │
 ┌─▼──┐ ┌─▼───┐    ┌────▼────┐   ┌────▼───┐  ┌───▼────┐
 │ W4 │ │ W5  │    │   W6    │   │  W7    │  │  W8    │   five sessions in parallel
 └────┘ └─────┘    └─────────┘   └────────┘  └────────┘
```

Rules that keep the parallel sessions from colliding:

1. **One workstream per session, one branch per workstream.** Branch naming:
   `devin/bofa-9000-w4-digital-banking`.
2. **Never edit outside your workstream's paths.** `.github/CODEOWNERS` is the
   authoritative map. If you need a change in a library, raise it as a
   follow-up on the library's workstream instead of editing it.
3. **W0 lands on `main` first.** W1-W3 branch from it, W4-W8 branch from a
   `main` that already has W1-W3.
4. **Definition of done for every workstream:** `npm run build` and `npm test`
   both pass, no `::ng-deep` selector referencing a pre-MDC class remains in the
   touched files, and the screen renders identically to the Angular 14
   screenshot in the PR description.
5. **Behaviour must not change.** The uplift changes framework versions and the
   selectors/APIs the framework forced us to change — nothing else. Brand
   palette values, copy, and business logic stay byte-identical.

## Verification

```bash
nvm use && npm install --legacy-peer-deps
npm run build     # libraries + five apps
npm test          # every project
npm start         # eyeball digital-banking on :4200
```
