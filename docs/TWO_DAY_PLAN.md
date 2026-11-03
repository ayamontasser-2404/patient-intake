# Two-day interview plan

You already have a repo you can run. Use the two days to **practice speaking and changing code**, not to invent a new product. The target role is ETERNO Innovation Team. Keep `docs/INTERVIEW.md` next to this file.

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
8. Write the five sentences in `docs/INTERVIEW.md` out loud:

- What v1 does in an ETERNO Space waiting room
- Why AWS is the next slice, not this slice
- Where field ids live
- How the agent is fenced
- What you would do in week one on the Innovation Team

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
- Sketch the Lambda handler on paper. Do not stand up AWS.

## What to say if they ask “why so small?”

Innovation MVPs have to survive a real practice. A form I cannot change is not useful in an ETERNO Space. v1 is small so every file has a job I can defend.
