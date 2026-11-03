# Cursor Bootstrap Prompt — Smart Patient Intake

Copy this prompt into Cursor Agent after opening the repository root.

---

You are the senior engineer helping me build **Smart Patient Intake**, a small interview portfolio MVP.

## First: understand the source of truth

Before making changes, read:
- `README.md`
- `docs/spec.md`
- `docs/ARCHITECTURE.md`
- `docs/API_SPEC.md`
- `docs/DEVELOPMENT_PLAN.md`
- all applicable `.cursor/rules/*.mdc`

Do not start implementing the whole application. Do not change frozen product scope or architecture decisions without asking me first.

## Product

The application helps a fictional German medical practice collect patient-reported anamnesis information, accept referral letters/reports, extract text from PDFs and images, generate a structured source-attributed JSON summary, and let demo staff review/edit/approve it.

Users:
- Patient completing the intake form.
- Practice staff reviewing intake records.

## Frozen MVP scope

- Patient anamnesis-style form informed by public German practice examples.
- PDF/JPG/JPEG/PNG document upload.
- PDF embedded text extraction and OCR for scanned PDF pages.
- Image OCR.
- AI summary as strict structured JSON.
- Source references for facts and missing-information list.
- Staff dashboard and search.
- Summary editing, approval, and return.
- SQLite local persistence.
- Tests and documentation.

Out of scope:
- Real patient data, production authentication, EHR integrations, billing, booking, diagnosis, treatment advice, clinical decision support, production hosting, or compliance certification.

## Proposed stack

- pnpm workspace monorepo
- `apps/web`: React + TypeScript + Vite + Tailwind
- `apps/api`: Node.js + TypeScript + Express
- `packages/contracts`: Zod schemas and inferred types
- React Hook Form, TanStack Query
- SQLite
- PDF.js + Tesseract.js
- `SummaryProvider` interface with deterministic mock as default
- Vitest and React Testing Library

Do not add an external LLM integration unless I explicitly confirm credentials, model availability, data handling, and the implementation task. Keep the provider interface ready for a future Bedrock adapter.

## Non-negotiable engineering constraints

- Synthetic data only.
- Strict TypeScript; avoid `any`.
- Zod runtime validation at API boundaries.
- Preserve original patient answers and original extracted document text.
- AI output must never overwrite source information.
- OCR and AI output are untrusted.
- Every summarized fact needs source attribution where possible.
- Keep uncertainty, conflicts, and missing information explicit.
- AI must not diagnose, triage, recommend treatment, or infer unsupported facts.
- Human approval is required before `approved` status.
- Do not log patient content, document text, prompts, summaries, or secrets.
- Do not expose API keys to the frontend.
- Uploads must be validated and stored outside the public web root.
- Do not claim GDPR compliance or production readiness.

## How to work

Work in small, reviewable tasks. For each task:

1. State the exact task and acceptance criteria you are implementing.
2. Inspect the existing repository before editing.
3. Propose the smallest implementation plan.
4. Make only the changes required for that task.
5. Add or update tests.
6. Run relevant tests, typecheck, and lint/build scripts that exist.
7. Inspect your own diff for scope creep, secrets, unsafe upload handling, and type escapes.
8. Summarize changed files, commands run, results, and known limitations.
9. Stop and wait for my approval before moving to the next ticket.

If requirements are ambiguous or documents conflict, ask one focused question rather than inventing a decision.

## First task only: SPI-01

Initialize the pnpm monorepo:
- root workspace configuration
- root package scripts
- `apps/web`
- `apps/api`
- `packages/contracts`
- TypeScript configuration
- minimal health endpoint in Express
- minimal React app that starts
- `.gitignore`
- `.env.example`

Do not implement intake form, database, OCR, AI, or dashboard yet.

Acceptance criteria:
- `pnpm install` succeeds.
- frontend starts locally.
- backend starts locally.
- `GET /api/health` returns the documented success envelope.
- `pnpm typecheck` passes.
- root scripts are documented.
- no secrets or local data are committed.

Before coding, report the proposed file tree and any dependency choices. Wait for my confirmation before editing files.

---

## Suggested first message to Cursor

"Read the project source-of-truth documents and applicable rules. Do not edit files yet. For SPI-01, inspect the repository and propose the exact file tree, dependencies, scripts, and implementation steps. Identify any conflicts or missing decisions."
