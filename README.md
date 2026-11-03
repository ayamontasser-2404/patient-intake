# Smart Patient Intake

> Interview portfolio MVP: a German-practice-inspired patient intake workflow with document OCR, AI-assisted structured summarization, and human review.

**Status:** Phase 1 foundation is runnable. Intake, persistence, documents, OCR, AI summary, and staff review are not built yet.  
**Version:** 1.0  
**Important:** This is a demonstration project using synthetic data only. It is not a medical device, EHR, or production-ready system.

## Product in one sentence

Smart Patient Intake helps a medical practice collect structured patient-reported information and supporting documents, extract text from uploaded PDFs and images, generate a source-attributed structured summary, and let a staff user review and approve that summary.

## Problem

Patient information can arrive through forms, referral letters, and other documents. Staff may need to read and consolidate information from several sources before a consultation. This MVP explores whether a structured digital intake and AI-assisted summary can make that preparation workflow clearer.

The project hypothesis is that structured collection, OCR, and source-attributed summaries can reduce manual information sorting. This is a hypothesis, not a measured or proven outcome.

## Target users

- **Patient:** completes an anamnesis-style questionnaire and uploads relevant documents.
- **Practice staff / doctor:** reviews the intake, extracted text, AI summary, and approves or returns the record.

The MVP uses a simple demo-mode staff interface. It does not implement production authentication or real patient accounts.

## Main workflow

1. Patient completes the intake questionnaire.
2. Patient uploads a supported referral letter or medical report (PDF, JPG, JPEG, PNG).
3. Backend stores the synthetic demo submission and processes each document.
4. OCR extracts text. For PDFs, first extract embedded text; if pages are scanned, render pages and run OCR.
5. AI provider generates a structured JSON summary from patient-provided data and extracted document text.
6. Backend validates AI output against the shared Zod schema.
7. Staff reviews source-attributed facts, edits the summary, and approves or returns the intake.

## MVP features

- German-practice-inspired anamnesis form, based on public example forms rather than a claim of a nationally mandated template.
- Patient-reported reason for visit, symptoms, medical history, operations, allergies, medications, and optional family/lifestyle history.
- Upload of PDF and image documents with type and size validation.
- PDF text extraction plus OCR for scanned PDFs and images.
- AI summary as validated structured JSON, including source references and missing information.
- Staff dashboard with search and status.
- Summary editing, review, approval, and return-for-correction workflow.
- Error states and retry for document/AI processing.
- Automated tests for critical contracts and workflows.

## Reference documents

The project is inspired by real German healthcare paperwork and guidance. Keep copies only when permitted and retain the original source and date in the reference register.

| Reference | Intended use |
|---|---|
| Public general-practice Anamnesebogen example | Inform the patient questionnaire fields; not a universal standard |
| Public internal-medicine Anamnesebogen example | Cross-check common history fields; not a universal standard |
| KBV Muster 6 (Überweisungsschein) | Understand a standardized German referral document and use a legally reusable/appropriately sourced sample for testing |
| KBV / official privacy guidance | Inform privacy notices and distinguish necessary treatment processing from optional consent |

Add source URLs, access dates, licence/reuse notes, and any locally stored reference files under `docs/references/REFERENCE_REGISTER.md`. Do not assume a public PDF may be redistributed or copied into the product.

## Proposed technology defaults

These are implementation defaults for the MVP, not claims about ETERNO's internal architecture:

- Frontend: React, TypeScript, Vite
- Styling: Tailwind CSS
- Forms: React Hook Form + Zod
- Server state: TanStack Query
- Backend: Node.js, TypeScript, Express
- Shared contracts: Zod schemas and inferred TypeScript types in a workspace package
- Persistence: SQLite for a local demo
- OCR: PDF.js for PDF text extraction/rendering and Tesseract.js for OCR
- AI: provider interface; deterministic mock provider for local development; optional real provider adapter only when credentials and model access are configured
- Tests: Vitest, React Testing Library, and API integration tests

## Repository layout

```text
smart-patient-intake/
├── apps/
│   ├── web/                  # React patient and staff UI
│   └── api/                  # Express API and application services
├── packages/
│   └── contracts/            # Shared Zod schemas and inferred types
├── docs/
│   ├── spec.md
│   ├── ARCHITECTURE.md
│   ├── API_SPEC.md
│   ├── DEVELOPMENT_PLAN.md
│   └── references/
│       └── REFERENCE_REGISTER.md
├── .cursor/
│   └── rules/
├── tests/
├── .env.example
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## Local development

Prerequisites:

- Node.js 22.17.0, recorded in `.nvmrc`. Node.js 24 and Node.js 26 are also supported. Node.js 22 remains a supported LTS release through April 2027.
- pnpm 10.34.9, recorded in the root `packageManager` field.

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Copying `.env` is optional in Phase 1. When it is absent, the API uses `PORT=4000` and `WEB_ORIGIN=http://localhost:5173`. Never commit `.env`, real patient data, uploaded documents, SQLite database files, or secrets.

- Web: http://localhost:5173
- API: http://127.0.0.1:4000/api/health

The API binds to loopback only. It is unauthenticated and is for synthetic local demo use.

Phase 1 does not implement patient intake, database persistence, document upload, OCR, AI summary, or the staff dashboard.

### Scripts

| Script | What it does |
|---|---|
| `pnpm dev` | Builds `@spi/contracts`, then starts the web app and API together. |
| `pnpm build` | Builds every workspace. |
| `pnpm typecheck` | Builds `@spi/contracts`, then typechecks every workspace. |
| `pnpm test` | Builds `@spi/contracts`, runs the API and contract tests, and prints that the web app has no tests yet. |
| `pnpm lint` | Lints every workspace with ESLint. |
| `pnpm --filter @spi/api start` | Runs the compiled API. Build first. |
| `pnpm --filter @spi/web preview` | Serves the production web build. Build first. |

Phase 1 tests live in `apps/api` and `packages/contracts`. The root `tests/` directory is reserved for a later phase and is not created yet. Shared contracts currently contain only the health response schema.

## Safety and privacy boundaries

- Use synthetic data only. Never upload real patient documents or enter real patient information.
- Do not use real patient identifiers in screenshots, logs, test fixtures, or demos.
- Do not expose AI credentials in the browser.
- Treat OCR output and AI output as untrusted, potentially incorrect data.
- Preserve original patient answers and extracted text; AI edits must not overwrite source material.
- Every summarized fact should carry a source reference where possible.
- Uncertain or unreadable text must be flagged, not guessed.
- AI must not diagnose, triage, recommend treatment, or make clinical decisions.
- A human reviewer must approve the summary before its status becomes `approved`.
- A generic GDPR checkbox is not a substitute for a proper privacy notice or a legally appropriate consent flow. The demo should not claim legal compliance.
- File uploads require MIME/extension checks, size/page limits, safe filenames, storage outside the public web root, and no execution of uploaded content.
- This project is not GDPR-certified, clinically validated, or suitable for production use.

## Definition of done

A successful local demo must show this end-to-end flow:

1. Submit a synthetic patient intake.
2. Upload a text PDF, scanned PDF, or supported image.
3. Extract text, reporting OCR status and errors.
4. Generate a structured summary with source attribution.
5. Validate the response against the shared schema.
6. View the intake in the staff dashboard.
7. Edit the summary and save changes.
8. Approve or return the intake.
9. Verify that original answers and document text remain unchanged.
10. Run tests and explain the architecture and limitations.

## Development approach

Implement one vertical slice at a time. Do not ask an AI coding assistant to generate the entire application in one pass. Read the relevant Cursor rules, make a small change, run tests, inspect the diff, and commit working increments.

See:
- [Product specification](docs/spec.md)
- [Architecture](docs/ARCHITECTURE.md)
- [API contracts](docs/API_SPEC.md)
- [Development plan](docs/DEVELOPMENT_PLAN.md)
- [Reference register](docs/references/REFERENCE_REGISTER.md)
- [Cursor bootstrap prompt](AGENT.md)

## Agent instructions

- [Project-wide agent instructions](AGENT.md)
- [Phase 1 implementation prompt](prompts/PHASE_1_PROMPT.md)
