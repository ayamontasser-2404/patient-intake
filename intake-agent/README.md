# intake-agent

Staff assistant for the patient intake demo. Product context lives in the repo root README.

```bash
npx --yes "@grok/agent-sdk@0.5.0" validate --dir .
npx --yes "@grok/agent-sdk@0.5.0" tool call get_intake_schema --dir .
npx --yes "@grok/agent-sdk@0.5.0" login
npx --yes "@grok/agent-sdk@0.5.0" dev
```

Field ids are in `bot/lib/intake.ts`. To add one field, follow `bot/skills/add-a-field.md`.
