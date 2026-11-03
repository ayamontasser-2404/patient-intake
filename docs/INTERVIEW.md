# Interview notes — ETERNO Innovation Team

Role: [Fullstack Engineer, Frontend Focus, Innovation Team (Mid/Senior)](https://careers.eterno.group/en/jobs/8490488-fullstack-engineer-frontend-focus-innovation-team-mid-senior)

Hiring manager: Anton Marcuse, Chief Innovation Officer – Engineering. Berlin, hybrid, two days in the office.

Read this the night before. Demo from `README.md`. Do not memorise a script.

## What ETERNO actually is

ETERNO Cloud is the AI-native operating system for outpatient practices in Germany. It already covers appointment scheduling, **digital medical history**, documentation, billing, patient communication, and decision support. They test in their own ETERNO Spaces in Berlin, Hamburg, and Frankfurt. The Innovation Team ships MVPs in React and TypeScript, then owns the serverless path (API Gateway, Lambda, DynamoDB) and LLM features (Bedrock, OCR, speech).

This repo is a **digital Anamnese MVP**: the waiting-room form plus a staff assistant that writes the same field ids. That is one slice of the product they already name in the company story.

## 4-minute walkthrough

1. Open `web/` Welcome. Point at the fictional-demo banner. Say this would run in an ETERNO Space waiting room, not on a real patient today.
2. Fill Maya Chen. Show labels, focus ring, and Continue validation.
3. Review. Say App owns the draft. Pages only display it.
4. Open the agent playground. Ask it to start Maya’s intake. Show `get_intake_schema` then `save_intake_draft`. Say the model talks, TypeScript owns the keys.
5. Stop. Say the next slice is one Lambda and a DynamoDB item, not a new frontend framework.

## Job line → this repo

| They asked for | You show |
| --- | --- |
| React + TypeScript at the core | `web/` with three routes, typed answers, tests |
| Complete product experience, not isolated components | Welcome, Personal, Review plus a staff agent on the same fields |
| Own features end to end | UI now. Shared schema now. Persistence named in architecture, not faked |
| Serverless APIs and a database when the feature needs it | Next slice: API Gateway → Lambda (TS) → DynamoDB draft item |
| AI-powered user experiences | `intake-agent/` asks one missing required field, never diagnoses |
| Workflows for healthcare professionals **and** patients | Patient fills the form. Staff can complete it on a call with the agent |
| OCR, speech, real-time later | Out of v1 on purpose. History fields are already named for a later OCR pass |
| Fast iteration without fragile systems | Two-day MVP. No Redux. No CDK until the form is boring |
| Contribute to UX and architecture | Tokens, AA rules, Figma workflow, and a written spec |
| Evaluate new tech critically | An LLM is a tool user. Field ids stay in TypeScript |
| Regulated, real patients | Fictional demo data. No SVNR. GDPR-shaped “do not store what has no field” |

## Sentences to keep ready

**Why this problem.** Paper Anamnese still sits between “patient found a slot” and “doctor has a structured history”. ETERNO already lists digital medical history as a core Cloud process. This is that slice, cut to an MVP.

**Why so small.** Innovation Team MVPs have to ship, then survive a practice. A form I cannot change is not useful in an ETERNO Space.

**Where fullstack starts.** The form is React. The contract is `INTAKE_FIELDS`. The next honest backend is one TypeScript Lambda and a DynamoDB item keyed by `visitId`. Python stays available for OCR later. I did not stand up AWS for a two-day demo.

**How the LLM is bounded.** The model cannot invent a field. Unknown keys are dropped. Missing required fields come from code. That is how you put Bedrock next to a regulated workflow without letting the model become the schema.

**Accessibility.** Waiting-room tablet, anxious patient, German and English. Visible labels, 44px targets, AA contrast. Same bar I would use in an ETERNO Space.

**What I would do in week one.** Sit with a medical assistant in a Space. Watch one Anamnese. Add the visit screen. Put drafts in DynamoDB. Keep the agent on the same ids.

## Questions they may ask

- **Why not AWS already?** Because the form still changes. Persistence is cheap once the ids are stable. Standing up CDK first would be theatre.
- **Why not Python?** v1 is a React MVP with a typed contract. Python is the right tool when OCR or a pipeline shows up. The schema does not care which runtime saves it.
- **How would you handle PHI / GDPR?** No real data in this repo. No SVNR. Store only named fields. Encrypt at rest in DynamoDB. Short retention for drafts. Access logs. I would ask how ETERNO Cloud already classifies Anamnese data before inventing a second policy.
- **How do you test an LLM feature?** Deterministic tools and one smoke eval on the path “schema then save”. Do not assert prose.
- **How do you work with design?** Tokens in `DESIGN_SYSTEM.md` equal CSS variables equal Figma variables. Screens are instances, not new blues.

## Questions you ask them

1. Who is the first user for a new Anamnese flow — patient in the Space, or staff on the phone?
2. Does Innovation share the Cloud design system, or do MVPs start on a side stack and graduate?
3. Where does a draft live today in ETERNO Cloud, and what is not allowed to leave the practice boundary?
4. When an LLM writes a history field, who confirms it before it reaches documentation?
5. What did the last Innovation MVP look like when it moved into the Cloud platform?

## What not to say

- That this is production medical software. It is a demo.
- That you would add Bedrock, Cognito, and Step Functions this week.
- That the agent diagnoses or chooses treatment.
- That you skipped accessibility because it is an MVP.
