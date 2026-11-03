# Phase 1 Prompt — Repository and Application Foundation

Copy this prompt into Cursor Agent after opening the repository root.

---

You are working on **Smart Patient Intake**, a small interview portfolio MVP. Your current task is **Phase 1 only: Repository and Application Foundation**.

## 1. Read the source of truth first

Before proposing or changing code, read:

- `README.md`
- `docs/spec.md`
- `docs/ARCHITECTURE.md`
- `docs/API_SPEC.md`
- `docs/DEVELOPMENT_PLAN.md`
- `AGENT.md`
- all relevant `.cursor/rules/*.mdc`

Treat these documents as authoritative. If they conflict, stop and identify the conflict. Do not silently change product scope or architecture.

## 2. Phase 1 goal

Create a working pnpm TypeScript monorepo with:

- `apps/web`: minimal React + TypeScript + Vite application.
- `apps/api`: minimal Node.js + TypeScript + Express API.
- `packages/contracts`: shared package scaffold for Zod schemas and inferred types.
- Root workspace scripts and TypeScript configuration.
- Environment example and Git ignore rules.
- A working `GET /api/health` endpoint.

This phase is infrastructure only. It must not implement patient intake, database persistence, document upload, OCR, AI, or staff dashboard functionality.

## 3. Proposed repository structure

Use this as the target, adapting only where necessary:

```text
smart-patient-intake/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   └── api/
│       ├── src/
│       │   ├── app.ts
│       │   └── server.ts
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   └── contracts/
│       ├── src/
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── docs/
├── prompts/
├── .cursor/
│   └── rules/
├── .env.example
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── README.md
```

Do not create empty placeholder modules for future features unless needed for a working package boundary.

## 4. Dependency and configuration decisions

- Use a currently supported Node.js LTS version. State the required version in README or `.nvmrc`/`.node-version`.
- Use pnpm workspaces.
- Use strict TypeScript.
- Use React, Vite, Express, and Zod.
- Use compatible, stable dependency versions; do not blindly copy old version numbers.
- Keep dependencies minimal.
- Configure CORS narrowly for the local frontend origin.
- Use environment variables for port and allowed frontend origin.
- Do not add an ORM or SQLite in Phase 1.
- Do not add OCR or AI dependencies in Phase 1.
- Do not add authentication in Phase 1.

Before installing, report the selected versions and any compatibility considerations.

## 5. API requirements

Implement:

`GET /api/health`

Expected response:

```json
{
  "data": {
    "status": "ok"
  }
}
```

Requirements:
- Return HTTP 200.
- Use the documented success envelope where practical.
- Do not expose secrets, environment variables, or internal infrastructure details.
- Add a minimal automated test for the endpoint if the chosen test setup is straightforward; otherwise explain the smallest follow-up needed.
- Keep `app.ts` separate from `server.ts` so the app can be imported in tests without opening a network port.

## 6. Frontend requirements

Create a minimal but polished placeholder landing screen:

- Product name: Smart Patient Intake.
- Short description: “A demo workflow for structured patient intake and AI-assisted document review.”
- Clearly mark it as a demo using synthetic data only.
- Do not build the actual intake form or dashboard yet.
- Ensure the page renders without console errors.
- Use semantic HTML and a responsive layout.

## 7. Root scripts

Provide working scripts for at least:

- `pnpm dev` — start web and API in parallel.
- `pnpm build` — build all workspaces.
- `pnpm typecheck` — typecheck all workspaces.
- `pnpm test` — run tests in workspaces that have them.
- `pnpm lint` — lint workspaces if lint is configured.

If a script is not yet meaningful, make it return a clear success/no-tests message rather than failing mysteriously. Document all scripts.

## 8. Security and repository hygiene

- Never create or commit `.env`.
- Keep `.env.example` free of real secrets.
- Ignore database files, uploaded files, build output, coverage, logs, and local environment files.
- Do not add real patient data or real medical documents.
- The local API is unauthenticated and for synthetic local demo use only.
- Do not log request payloads or personal information.
- Do not expose server environment variables to Vite.

## 9. Work process — do not skip

First response:
1. Confirm you read the source-of-truth files.
2. Inspect the current repository.
3. Report the proposed exact file tree.
4. List dependencies and versions you propose.
5. Explain the commands and acceptance checks.
6. Identify any conflict or missing decision.

**Do not edit files until I approve the plan.**

After approval:
1. Implement only Phase 1.
2. Run install, dev startup checks, build, typecheck, tests, and lint where configured.
3. Inspect the diff for unnecessary files, secrets, unsafe configuration, and scope creep.
4. Report exact commands run and their results.
5. List any limitations.
6. Stop and wait for approval before Phase 2.

## 10. Phase 1 acceptance criteria

Phase 1 is complete only when:

- `pnpm install` succeeds from the repository root.
- `pnpm dev` starts both frontend and API.
- The frontend loads in the browser.
- `GET /api/health` returns HTTP 200 and the documented JSON shape.
- `pnpm build` succeeds.
- `pnpm typecheck` succeeds.
- `pnpm test` succeeds (or clearly reports no tests configured yet).
- `.env.example` exists and no `.env` or secrets are committed.
- `.gitignore` excludes local data and generated files.
- README contains accurate setup and script instructions.
- No Phase 2 or later features have been implemented.

Start by inspecting and proposing. Wait for approval before editing.

---
