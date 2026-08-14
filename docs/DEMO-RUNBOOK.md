# BoA parallel-Devin migration demo — run sheet

**Repo:** `justinemach/bofa-legacy-platform` — Angular 14, 3 shared libraries, 5 product apps, 5 mock edge services.
**Target:** Angular 18.
**Story:** one Slack DM → nine PRs, eight of them written concurrently → and a reusable playbook the bank keeps afterwards.

---

## 1. Before the demo

| # | Do this | Why |
|---|---|---|
| 1 | Confirm the Devin GitHub app can see `bofa-legacy-platform` | Sessions can't clone or open PRs otherwise |
| 2 | Approve the environment blueprint for the repo (Node 16, `npm install --legacy-peer-deps`, `CHROME_BIN` for Karma) | Every child session boots ready instead of spending 5 minutes on setup |
| 3 | Have section 2b's text ready to paste | You create `!parallel_migration` live, on stage |
| 4 | Skim `MIGRATION.md` in the repo | It is the script for the whole demo |
| 5 | Run `nvm use && npm install --legacy-peer-deps && npm run build && npm test` on `main` | Prove green baseline; also warms the cache |
| 6 | Start the five apps (`npm start`, ports 4200-4204) and screenshot each | "Before" shots — visual parity is the payoff at the end |

---

## 2. The playbooks

Two playbooks, split so neither is Angular-specific.

| Playbook | Macro | Used by | Status before the demo |
|---|---|---|---|
| Migrate a single workstream to the new framework version | `!fw_workstream` | Every child session | **Already created** in your org |
| Parallel framework migration across a monorepo | `!parallel_migration` | The orchestrator session | **Create this live, on stage** (full text below) |

Creating the orchestrator one live is deliberate: it shows the playbook feature itself,
not just its output. Ask the kickoff Devin to make it, approve the suggestion in your
timeline, and it is usable in the very next message.

### 2a. Create it live

Paste this into the demo Devin session (or into any session — playbooks are org-wide):

```
Create a playbook titled "Parallel framework migration across a monorepo" with
the macro !parallel_migration, using exactly the content I'm pasting below.

<paste the block from section 2b>
```

Then approve the suggestion when it appears in your timeline. Talk over the approval:
*playbooks are org assets, they need a human to sign off, and once approved anyone in the
org can trigger them from Slack with a `!` macro.*

### 2b. Orchestrator playbook content (paste this)

```markdown
Playbook: Parallel framework migration across a monorepo

## Overview
Run a large framework or major-version migration across a monorepo by splitting it into
workstreams and executing them with parallel Devin sessions. This playbook is the
orchestrator: it does the blocking toolchain work itself, then fans the independent work
out to child sessions, one per workstream, and reports the resulting PRs. It is framework
agnostic — the same shape applies to an Angular major uplift, a React class-to-hooks
conversion, a Node runtime bump, or a design-system swap.

## What's Needed From User
- Repository (e.g. `owner/repo`) and the target version or end state (e.g. "Angular 14 → 18").
- A migration plan document in the repo if one exists (e.g. `MIGRATION.md`). If there is
  none, this playbook produces one as step 2 and asks the user to confirm it before fanning out.
- Confirmation of how the work may land: separate PR per workstream (default) or a stack.

## Procedure
1. Read the repo's `README.md`, `AGENTS.md`, ownership map (`.github/CODEOWNERS`) and any
   migration plan. Establish the baseline: install dependencies, then run the repo's build
   and test commands and record that they pass BEFORE any change.
2. Produce or validate the workstream breakdown and write it to `MIGRATION.md`:
   - **W0 toolchain** — runtime/version bumps, `ng update`-style staged upgrades, config keys
     removed by the new major, dead config deletion. Blocks everything.
   - **Shared libraries** — one workstream per shared package. Blocks the consuming apps.
   - **Applications** — one workstream per app. Fully parallel once the libraries land.
   - **Optional modernisation** — new idioms (standalone components, new control flow,
     functional guards). Explicitly deferred; never mixed into the version bump.
   For each workstream list the concrete blockers with file paths, so a child session never
   has to rediscover them.
3. Execute W0 yourself, open a PR, and get it merged before fanning out. Every other
   workstream branches from a `main` that already contains it.
4. Spawn one child session per shared-library workstream, in parallel. Give each session:
   the repo, its workstream ID, the exact file paths it owns, the build+test commands, and
   the instruction to open its own PR. Attach the per-workstream playbook (`!fw_workstream`)
   so each child follows the same procedure.
5. Wait for those sessions, review their PRs, and merge them.
6. Spawn one child session per application workstream, in parallel, the same way.
7. Wait for all of them. For any session that reports a blocker, decide whether to answer it,
   re-scope the workstream, or take the work back yourself — do not leave a workstream half-done.
8. Verify the integrated result on `main`: full build and full test suite green, and each app
   still renders and behaves as it did before the migration.
9. Report a table of every PR — workstream, PR link, CI status, files touched, anything
   deferred — to the user in the channel the task was started from.

## Specifications
- One workstream per session, one branch per workstream, one PR per workstream.
- No session edits files outside its workstream's paths. Cross-cutting needs are raised as
  follow-ups on the owning workstream, not fixed in place.
- Build and test must pass in every PR; no PR is opened on a red workstream.
- Behaviour, visual design and business logic are unchanged. The diff should contain only
  what the new framework version forces plus the deletions the plan calls for.
- Validation: on the merged result, the repo's full build and full test suite pass, and the
  deferred modernisation work exists as written-up follow-ups.

## Advice and Pointers
- The dependency graph is the parallelism plan: anything every app imports is a bottleneck
  and must land first; everything downstream of it can run concurrently.
- Bump one major at a time and run the framework's own migration schematics at each step.
  Skipping intermediate majors loses the automated migrations.
- The expensive failures in a major upgrade are silent: styling that reached into a
  library's private DOM still compiles and simply stops applying. Grep for deep selectors
  (`::ng-deep`, `!important` overrides of vendor classes) and check them visually, not just
  by compiling.
- Give child sessions file paths, not descriptions. "Fix the theming" costs a session an
  hour of exploration; "rewrite `projects/x/src/styles/_theme.scss` onto the `@use` API" does not.
- Take before/after screenshots of each app; visual parity is the acceptance evidence for
  design-system migrations.

## Forbidden Actions
- Do not fan out before the toolchain workstream is merged — every child would rebase onto a
  broken baseline.
- Do not let a child session edit shared code, lockfiles, or CI config owned by another workstream.
- Do not mix optional modernisation into the version bump.
- Do not weaken, skip, or delete tests to make a workstream green.
```

### 2c. Workstream playbook content (already created — for reference)

```markdown
Playbook: Migrate a single workstream to the new framework version

## Overview
Migrate one workstream — a single shared library or a single application inside a monorepo —
onto a new framework major version, in isolation, while every sibling workstream is being
migrated concurrently by other sessions. The output is one focused, mergeable PR that
changes behaviour in no way. This is the per-session companion to the parallel migration
orchestration playbook.

## What's Needed From User
- Repository and the workstream ID or the paths this session owns (e.g. `W4`, or
  `projects/digital-banking/**`).
- The migration plan document (e.g. `MIGRATION.md`) listing this workstream's known blockers.
- Confirmation that the toolchain workstream has already merged into the base branch.

## Procedure
1. Read the migration plan and `AGENTS.md`, and list this workstream's blockers and the exact
   files they live in. Everything not in your paths is out of scope.
2. Set up the environment exactly as the repo specifies (runtime version file, install flags),
   then build and test only your workstream and confirm it is green on the base branch first.
3. Fix compile-level breakage: removed or renamed APIs, changed module entry points,
   changed generic signatures, stricter template type checking.
4. Fix styling that depends on the old library internals — theming APIs, deep selectors into
   vendor DOM, deprecated component appearance/variant inputs. Replace them with the
   supported public API, keeping the rendered result identical.
5. Fix deprecated async and framework idioms the new version removed (e.g. `toPromise()`,
   positional `subscribe` arguments, deprecated lifecycle or injection patterns).
6. Update the workstream's own tests where the framework changed the harness, without
   changing what is asserted.
7. Run the workstream's build and tests, then run the full repo build to prove you have not
   broken a consumer.
8. Verify visually: run the app (or a consuming app for a library workstream) and compare the
   affected screens against pre-migration behaviour. Capture screenshots for the PR.
9. Open a PR titled with the workstream ID, describing what the framework forced, what you
   deliberately deferred, and the verification you ran. Attach the screenshots.
10. Report back the PR link, CI status, and anything you could not do without touching
    another workstream's files.

## Specifications
- The diff touches only this workstream's paths, plus its own tests.
- Build and test pass locally before the PR is opened, and CI is green before it is called done.
- Zero behavioural or visual change; the palette, copy, layout and business rules are identical.
- No remaining references in touched files to the removed/private APIs the plan called out.
- Validation: workstream tests pass, full repo build passes, and screenshots of the affected
  screens match the pre-migration state.

## Advice and Pointers
- Deep style overrides into a library's internals fail silently — they still compile and
  simply stop matching. Check them in a browser, never by compiling alone.
- Prefer the smallest change that the new version accepts. Rewriting a component into modern
  idioms while migrating it makes the diff unreviewable and hides regressions.
- If a blocker turns out to live in shared code you do not own, stop and report it rather
  than editing across the boundary.
- Lockfile churn is a merge-conflict factory when sessions run in parallel; do not add or
  bump dependencies unless your workstream genuinely requires it.

## Forbidden Actions
- Do not edit files outside your workstream, including shared config, CI, or the lockfile.
- Do not rebase or merge other workstreams' branches into yours.
- Do not delete, skip, or loosen tests to get to green.
- Do not perform optional modernisation (new control flow syntax, standalone conversion,
  functional guards) unless the plan assigns it to your workstream.
```

### 2d. The reuse story — the actual point

**The line to say out loud:** neither playbook mentions Angular, Material, or Bank of
America. The repo-specific detail lives in `MIGRATION.md` and `.github/CODEOWNERS`.

> Playbook = *how we migrate.* `MIGRATION.md` = *what this repo's blockers are.*

So the same two playbooks drive the next one unchanged:

- Angular 18 → 19 across this same estate
- React 17 → 19, or class components → hooks
- Node runtime bump, Webpack → Vite
- A design-system swap (the "silent breakage" step becomes the whole job)
- Java/Spring or .NET major upgrades — toolchain first, shared libraries next, leaf services in parallel is the same shape

For the next migration you write a new `MIGRATION.md` — or have Devin write it, that's
step 2 of the orchestrator playbook — and reuse the playbooks untouched.

And after the demo run: *"improve `!fw_workstream` based on session <link> — the children
kept missing X."* The second migration is cheaper than the first because the playbook
absorbed the first.

---

## 3. What you actually do, live

### Step 0 — create the orchestrator playbook on stage

Section 2a. Paste the create request, approve the suggestion in your timeline. Thirty seconds, and it sets up the whole "this is reusable" argument before any code moves.

### Step 1 — send the DM

```
!parallel_migration

Migrate justinemach/bofa-legacy-platform from Angular 14 to Angular 18.

Read MIGRATION.md first — it lists every known blocker, the file it lives in,
and the workstream that owns it.

Start with workstream W0 (toolchain) yourself: Node floor, the staged
ng update 14→15→16→17→18, the angular.json keys removed in v15/v16, and
deleting the dead tslint.json / e2e/protractor.conf.js. Open a PR for it and
stop there — I'll tell you when to fan out.

Rules for every session: Node per .nvmrc, install with --legacy-peer-deps,
`npm run build` and `npm test` must both pass before opening a PR, and stay
strictly inside your workstream's paths (.github/CODEOWNERS is the map).
Behaviour and brand palette must not change — this is a framework uplift, not
a redesign.
```

### Step 2 — talk while W0 runs

Use section 4. Devin bumps five Angular majors, rewrites `angular.json`, deletes the dead tooling, opens PR #1.

### Step 3 — merge PR #1, then send one line

```
Merged. Now spawn 8 parallel child sessions, one per workstream W1-W8 in
MIGRATION.md (W1-W3 first, then W4-W8 once those merge), attach the
!fw_workstream playbook to each, and report back a table of PRs with CI status.
```

### Step 4 — watch the fan-out

Eight sessions, eight branches, eight PRs. Open one child session next to the `!fw_workstream` playbook and show it following the steps literally.

### Step 5 — close

Orchestrator posts the PR table into the thread. Pull up the "before" screenshots against the migrated apps.

---

## 4. Talking points while it runs

**Blast radius.** All five apps import `bofa-ds`, so W1 is the bottleneck and everything downstream is genuinely parallel. That dependency graph *is* the parallelism plan — it's why this is eight Devins and not one long session.

**Silent breakage — the best moment in the demo.** Material 15's MDC rewrite renamed the private DOM: `.mat-button-wrapper` → `.mdc-button__label`, plus `.mat-form-field-infix`, `.mat-card-title`, `.mat-tab-label`, `.mat-header-cell`, `.mat-list-item-content`, `.mat-slide-toggle-thumb`. **None of it is a compile error.** The styling just stops applying. Codemods miss it; humans catch it in QA three weeks later. The playbook makes each session verify visually.

**Hard build breaks** to point at as they scroll past: `appearance="legacy"` / `appearance="standard"` removed, `<mat-chip-list>` gone, `entryComponents` removed from `@NgModule`, `.toPromise()` removed in RxJS 8.

**What Devin deliberately does *not* do.** `services/` is out of scope. Standalone components and `@if`/`@for` are left as W9 follow-ups rather than mixed into the version bump — a framework uplift with a redesign smuggled in is unreviewable.

**The deliverable is the playbook, not the run.** The nine PRs are this migration. The playbook is every migration after it.

---

## 5. Pre-flight checklist (morning of)

- [ ] `nvm use && npm install --legacy-peer-deps && npm run build && npm test` green on `main`
- [ ] Five apps start on 4200-4204 and look right
- [ ] "Before" screenshots captured
- [ ] Devin GitHub app has repo access
- [ ] Blueprint approved and a snapshot built
- [ ] Repo knowledge note saved (Node 16 · `--legacy-peer-deps` · verify with build+test · stay in your workstream)
- [ ] `!fw_workstream` exists and resolves in Slack
- [ ] Section 2b text on the clipboard (or in a scratch doc) for the live playbook creation
- [ ] Step 1 DM and Step 3 one-liner ready to paste
