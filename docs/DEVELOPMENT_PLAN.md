# Development Plan — Smart Patient Intake

**Target:** 2–3 focused days  
**Method:** phased delivery, vertical slices, small commits, tests at each stage

## Phase 0 — Product and engineering foundation

**Goal:** Make product and engineering decisions explicit before coding.

- [x] Define target users and problem.
- [x] Freeze MVP scope and acceptance criteria.
- [x] Define German healthcare document references.
- [x] Define architecture and technology baseline.
- [x] Define API contracts and shared data concepts.
- [x] Create Cursor project rules and bootstrap prompt.

**Exit criteria:** The team can explain what is being built, for whom, why, and what is intentionally excluded.

## Phase 1 — Repository and application foundation

**Goal:** Have a runnable monorepo with shared contracts and a healthy backend.

- [ ] SPI-01: Initialize pnpm workspace.
- [ ] Create `apps/web`, `apps/api`, and `packages/contracts`.
- [ ] Configure TypeScript, linting, formatting, and root scripts.
- [ ] Create minimal React application.
- [ ] Create Express application and `GET /api/health`.
- [ ] Configure environment variables and `.gitignore`.
- [ ] Add initial shared Zod schemas and status enums.

**Exit criteria:** `pnpm install` succeeds; frontend and backend start; health endpoint works; typecheck passes; no secrets or local data are committed.

## Phase 2 — Patient intake and staff dashboard

**Goal:** Complete the first useful vertical slice without AI or OCR.

- [ ] SPI-02: Configure SQLite and repository layer.
- [ ] SPI-03: Implement intake submission API.
- [ ] SPI-04: Build patient anamnesis form.
- [ ] Add server-side validation and field-level errors.
- [ ] Implement intake list and detail APIs.
- [ ] Build staff dashboard with search and status filters.
- [ ] Add loading, empty, success, and error states.

**Exit criteria:** A synthetic patient can submit the form; backend validates and persists it; staff can find and open it; original answers remain separate from AI output.

## Phase 3 — Document upload and OCR

**Goal:** Extract text from real PDF and image files safely.

- [ ] SPI-05: Implement document upload endpoint.
- [ ] Validate file signature, MIME type, extension, size, and PDF page count.
- [ ] Store files outside public web directories with generated storage keys.
- [ ] Extract embedded PDF text using PDF.js.
- [ ] Render scanned PDF pages and OCR them using Tesseract.js.
- [ ] OCR JPG/JPEG/PNG images.
- [ ] Store page-level text, extraction method, and confidence when available.
- [ ] Display processing status and extraction errors.

**Exit criteria:** Text PDFs, scanned PDFs, and supported images are processed; invalid files fail safely; OCR text is traceable to document and page; originals are preserved.

## Phase 4 — AI-assisted structured summary

**Goal:** Convert patient answers and extracted text into validated, source-attributed JSON.

- [ ] SPI-06: Define the shared patient summary Zod schema.
- [ ] Define the `SummaryProvider` interface.
- [ ] Implement deterministic mock provider for local development and tests.
- [ ] Build bounded, source-labelled summary context.
- [ ] Implement extraction-only prompt instructions.
- [ ] Parse strict JSON and validate it with Zod.
- [ ] Preserve conflicts, uncertainty, and missing information.
- [ ] Store summary separately from original intake and OCR data.
- [ ] Add retryable error handling.
- [ ] Add an optional real provider adapter only after explicit configuration and approval.

**Exit criteria:** Summary matches the shared schema; facts have source attribution where available; missing information is explicit; invalid model output is rejected; no unsupported clinical conclusions are generated.

## Phase 5 — Human review and approval

**Goal:** Complete the practice staff workflow.

- [ ] SPI-07: Build summary review screen.
- [ ] Display source references and OCR status alongside summary fields.
- [ ] Allow staff to edit and save the summary.
- [ ] Implement approve and return-for-correction actions.
- [ ] Enforce status transitions on the backend.
- [ ] Record review actions and timestamps.
- [ ] Invalidate approval if an approved summary is materially edited.

**Exit criteria:** Staff can compare AI output with original sources, edit and approve or return the intake, and source data remains unchanged.

## Phase 6 — Quality, documentation, and interview demo

**Goal:** Make the MVP reliable and easy to explain.

- [ ] SPI-08: Add schema, service, API, OCR, and workflow tests.
- [ ] Test malformed AI output and provider failures.
- [ ] Test invalid uploads, file limits, and OCR failures.
- [ ] Test source preservation and approval invalidation.
- [ ] Check accessibility and responsive behavior.
- [ ] Complete README setup instructions.
- [ ] Add synthetic demo fixtures and sample documents.
- [ ] Add architecture and API documentation.
- [ ] Prepare a short end-to-end demo.
- [ ] Prepare interview explanations of trade-offs and limitations.

**Exit criteria:** Main workflow works locally; tests, typecheck, and build pass; demo uses synthetic data only; limitations are documented.

## Suggested 2–3 day schedule

| Day | Phases | Expected outcome |
|---|---|---|
| Day 1 | 1 and 2 | Runnable app, patient submission, staff dashboard |
| Day 2 | 3 and 4 | Real OCR and structured AI summary |
| Day 3 | 5 and 6 | Human review, tests, documentation, demo |

If time becomes tight, preserve the critical workflow and safety requirements. Simplify visual polish or defer the real LLM adapter; do not remove schema validation, source attribution, safe upload handling, or human approval.

## Suggested commit sequence

- `chore: initialize pnpm monorepo`
- `feat(contracts): add intake and summary schemas`
- `feat(api): persist patient intake submissions`
- `feat(web): build patient intake form`
- `feat(web): add staff intake dashboard`
- `feat(documents): add secure local upload`
- `feat(ocr): extract text from pdfs and images`
- `feat(ai): add summary provider abstraction`
- `feat(ai): generate validated source-attributed summaries`
- `feat(review): add summary review and approval`
- `test: cover intake processing and review workflow`
- `docs: document setup architecture and demo`

## Working rules

- Implement one phase and one vertical slice at a time.
- Do not move to the next phase until the current phase exit criteria are met.
- Inspect generated code and understand it before accepting.
- Run relevant tests and typecheck before committing.
- Do not add real patient data or unapproved features.
