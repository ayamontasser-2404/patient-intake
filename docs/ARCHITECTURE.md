# Patient intake — architecture

Keep this drawing in your head. The UI and the agent share field ids. They do not share a server yet. That is deliberate: Innovation MVPs freeze the contract before they pay for AWS.

```text
  Patient / staff
        |
        +-- web/          React + TypeScript screens, local state
        |
        +-- intake-agent/ LLM assistant, tools, session kv
                |
                +-- bot/lib/intake.ts   field list + merge rules

  Next slice (not in v1)

        web  ──POST /drafts──►  API Gateway
        agent ────────────────►  Lambda (TypeScript)
                                 DynamoDB item  visitId
```

## Why two programs

The interview needs a **React MVP** and an **LLM workflow** you can demo today. A shared TypeScript list of fields is the contract. DynamoDB waits until those ids stop moving. That is fullstack ownership without a fake platform.

## Web app

| Piece | Role |
| --- | --- |
| `web/src/pages` | Screens. Welcome owns no answers. PersonalInfo writes answers. Review only reads them. |
| `web/src/intake.ts` | Copy of the field ids for the form. Keep it in sync with the agent by hand in v1. |
| React state | Lives in `App`. Children receive props and call callbacks. Same rule as `doctor-search`. |

There is no backend. Refreshing the browser clears the draft. That is acceptable for a demo.

## Agent

| Path | Role |
| --- | --- |
| `bot/instructions.md` | Always-on prompt. Safety and question order live here. |
| `bot/lib/intake.ts` | Field list, merge, missing-field list. No prose. |
| `bot/tools/get_intake_schema.ts` | Read the field list. |
| `bot/tools/get_intake_draft.ts` | Read this session's draft. |
| `bot/tools/save_intake_draft.ts` | Merge answers. Idempotent. |
| `ctx.host.kv` | Stores the draft. Prefix keys with the session id. |
| `evals/smoke.eval.ts` | One path: schema then save. |

The model chooses what to say. TypeScript decides which keys exist and which are still missing.

## Data

```ts
type IntakeDraft = {
  visitId: string
  answers: Record<string, string>
  updatedAt: string
}
```

Unknown keys are dropped on save. Empty strings delete a key. Required fields with no value appear in `missing`.

## What you will add next

1. Visit and history screens that read the same field ids.
2. One shared `packages/intake` module so the web copy of the field list goes away.
3. `PUT /drafts/{visitId}` as a TypeScript Lambda behind API Gateway, item in DynamoDB, no PHI in logs.
4. Only then Cognito, if staff and patients must be different identities.

Do not add Redux, Step Functions, or Bedrock until the form is boring and the ids are stable. Python belongs on the OCR/speech slice, not on this form.
