# Two-day interview plan

You already have a repo you can run. Use the two days to **practice speaking and changing code**, not to invent a new product.

## Day 1 — understand and demo the agent

### Morning (about 3 hours)

1. Read `README.md`, then `docs/SPEC.md`, then `docs/ARCHITECTURE.md`. Out loud if you can.
2. Draw the architecture box on paper from memory. Check the file.
3. From `intake-agent/`:

```bash
npx --yes "@grok/agent-sdk@0.5.0" validate --dir .
npx --yes "@grok/agent-sdk@0.5.0" tool call get_intake_schema --dir .
npx --yes "@grok/agent-sdk@0.5.0" login
npx --yes "@grok/agent-sdk@0.5.0" dev
```

4. In the playground, start an intake for Maya Chen. Watch the tools fire.

### Afternoon (about 3 hours)

5. Add one optional field, `emergencyName`, using `intake-agent/bot/skills/add-a-field.md`.
6. Call `get_intake_schema` again and confirm the id.
7. Revert or keep the field. Either is fine. The point is that you can change it.
8. Write five interview sentences:

- What the user can do in v1
- What you refused to build
- Where field ids live
- How the agent avoids diagnosis
- How you would add insurance next week

## Day 2 — design system and the form

### Morning (about 3 hours)

1. Read `docs/DESIGN_SYSTEM.md`, `docs/ACCESSIBILITY_GUIDELINES.md`, and `docs/FIGMA_WORKFLOW.md`.
2. Open the Figma file linked in the README. Name each token you see on the welcome screen.
3. Run the web app:

```bash
cd web
npm install
npm run dev
```

4. Tab through the personal form with the keyboard. Confirm every input has a visible label.

### Afternoon (about 3 hours)

5. Code one small change yourself: disable **Continue** until first name, last name, date of birth, and phone are filled. Keep the rule in `web/src/intake.ts`, not in the button.
6. Run `npm test` in `web/`.
7. Practice a 4-minute walkthrough: Welcome → Personal → Review → agent playground.

## If you have extra time

- Add the visit screen. Copy PersonalInfo. Do not refactor into a generic form factory yet.
- Record a 90-second demo.
- Do not start a backend.

## What to say if they ask “why so small?”

The clinic cannot use a form you cannot change. v1 is small so every file has a job you can defend.
