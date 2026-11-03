# patient-intake

A clinic intake demo you can explain and keep coding yourself.

A patient (or a staff member on a call) enters a short set of fields. An assistant agent can fill the **same field ids** in a playground. There is no backend and no real patient data.

Use this README in the interview. Use `docs/` when they ask “why”.

## 30-second pitch

> This is a two-day healthcare demo. The form is a small React app. The assistant is an Agent SDK project. Both use one list of field ids. Design tokens, accessibility rules, and the Figma file are written down so I can change a screen without guessing colors. v1 stops at personal details plus review. The next screens already have names in the spec.

## What to open in the interview

| Artifact | Path |
| --- | --- |
| Spec | `docs/SPEC.md` |
| Architecture | `docs/ARCHITECTURE.md` |
| Two-day plan | `docs/TWO_DAY_PLAN.md` |
| Design tokens | `docs/DESIGN_SYSTEM.md` |
| Accessibility | `docs/ACCESSIBILITY_GUIDELINES.md` |
| Figma rules | `docs/FIGMA_WORKFLOW.md` |
| Agent | `intake-agent/` |
| Form | `web/` |
| Figma | [Patient Intake](https://www.figma.com/design/TNzpWrQxVTH5WF1FFR0N0x/Patient-Intake) |

## Why this fits a product interview

- **You can take the keyboard.** Every file is small. Adding a field is a list edit, not a rewrite.
- **Healthcare habits.** Demo data only. No social security number. The agent does not diagnose.
- **Design as engineering.** Tokens, AA contrast, and a Figma workflow sit next to the code.
- **Agent as a tool user.** The model talks. TypeScript owns the schema and the missing-field list.

If the company is clinical, talk safety and accessibility. If the company is a platform, talk the agent tools and the eval. If they build UI, walk the form and the tokens.

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
