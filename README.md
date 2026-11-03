# patient-intake

Digital Anamnese MVP for an outpatient practice. Built as interview material for the ETERNO Innovation Team.

A patient in the waiting room, or a staff member on a call, enters a short medical-history form. An assistant writes the **same field ids**. There is no backend and no real patient data. The next honest backend is one TypeScript Lambda and a DynamoDB item.

Use this README in the interview. Open `docs/INTERVIEW.md` the night before.

## 30-second pitch

> ETERNO Cloud already names digital medical history as a core practice workflow. This is that slice as a two-day Innovation MVP. React and TypeScript own the form. An LLM assistant fills the same field ids for staff. v1 stops at personal details plus review so I can change a field without a rewrite. Persistence is sketched as API Gateway, Lambda, and DynamoDB — not built — because the ids should freeze first.

## What to open in the interview

| Artifact | Path |
| --- | --- |
| Interview notes | `docs/INTERVIEW.md` |
| Spec | `docs/SPEC.md` |
| Architecture | `docs/ARCHITECTURE.md` |
| Two-day plan | `docs/TWO_DAY_PLAN.md` |
| Design tokens | `docs/DESIGN_SYSTEM.md` |
| Accessibility | `docs/ACCESSIBILITY_GUIDELINES.md` |
| Figma rules | `docs/FIGMA_WORKFLOW.md` |
| Agent | `intake-agent/` |
| Form | `web/` |
| Figma | [Patient Intake](https://www.figma.com/design/TNzpWrQxVTH5WF1FFR0N0x/Patient-Intake) |

## Why this fits ETERNO

- **React MVP, full workflow.** Three screens plus a staff agent, not a isolated widget.
- **Frontend-first fullstack.** UI and typed contract today. Serverless persistence is the named next slice, in their stack.
- **LLM with a fence.** The model talks. TypeScript owns keys, merge, and missing fields. No diagnosis.
- **Practice reality.** Fictional Berlin demo patient. No German SVNR. AA labels for a waiting-room tablet.
- **Fast iteration, not theatre.** No CDK, Cognito, or Step Functions until the form is stable.

Role posting: [Fullstack Engineer, Frontend Focus, Innovation Team](https://careers.eterno.group/en/jobs/8490488-fullstack-engineer-frontend-focus-innovation-team-mid-senior).

## How a React screen works here

A screen is a function. It receives data and returns UI. It does not fetch.

`PersonalInfo` receives the current answers and a callback. It does not keep a second copy of the draft.

```tsx
export function PersonalInfo({ answers, onChange, onContinue }: PersonalInfoProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onContinue()
      }}
    >
      <Field
        id="firstName"
        label="First name"
        value={answers.firstName ?? ""}
        onChange={(value) => onChange("firstName", value)}
        required
      />
    </form>
  )
}
```

Three rules, the same as `doctor-search`:

1. **Props go down.** `App` owns the draft. Pages only display it.
2. **Events go up.** A field calls `onChange`. It does not write to a store.
3. **The owner re-renders the tree.** When `App` saves an answer, Review sees it on the next render.

## How the agent works

The agent is not the form. It is a staff assistant for the same fields.

1. `get_intake_schema` returns the field list from `bot/lib/intake.ts`.
2. `get_intake_draft` reads this session’s demo draft.
3. `save_intake_draft` merges answers and returns `missing`.

The prompt in `bot/instructions.md` tells it to ask one missing required field at a time. The TypeScript does not write sentences.

## Run locally

Node.js 22 or newer.

Form:

```bash
cd web
npm install
npm run dev
npm test
```

Agent (from `intake-agent/`):

```bash
npx --yes "@grok/agent-sdk@0.5.0" validate --dir .
npx --yes "@grok/agent-sdk@0.5.0" tool call get_intake_schema --dir .
npx --yes "@grok/agent-sdk@0.5.0" login
npx --yes "@grok/agent-sdk@0.5.0" dev
```

Open the playground URL the CLI prints. Ask: `Start a demo intake for Maya Chen.`

## File map

```text
docs/                  product and design contracts
web/src/App.tsx        owns the draft
web/src/pages/         one file per screen
web/src/intake.ts      field ids for the form
intake-agent/bot/lib/  field ids and merge rules
intake-agent/bot/tools one tool per file
```

When you add a field, change `intake-agent/bot/lib/intake.ts` first, then the form, then Figma. The skill `intake-agent/bot/skills/add-a-field.md` is the checklist.

## Demo data

Maya Chen is fictional. Put that sentence on the welcome screen and in the agent prompt. Never paste a real chart or insurance card into this repo.
