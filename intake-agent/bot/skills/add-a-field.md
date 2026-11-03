# Add one intake field

Use this when a developer asks how to extend intake without rewriting the agent.

1. Open `bot/lib/intake.ts`.
2. Append one object to `INTAKE_FIELDS`. Keep `id` in camelCase.
3. Set `required: true` only if the clinic cannot book the visit without it.
4. Run `npx --yes "@grok/agent-sdk@0.5.0" tool call get_intake_schema --dir .`.
5. Confirm the new id is in the JSON.
6. Add the same id to the web form later. Do not invent a second name.
