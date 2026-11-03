# Patient intake — spec

This is the product contract. If code and this file disagree, change the code.

## Problem

A patient who already found a doctor still fills a paper form. Staff retype the answers. The clinic needs a short digital intake that a person can finish in the waiting room, and that staff can complete with an assistant when the patient is on the phone.

## Users

| User | Job |
| --- | --- |
| Patient | Enter their own details before the visit. |
| Clinic staff | Complete the same form with the patient on a call. |
| Engineer (you) | Change one field without rewriting the app. |

There is no login in v1. This is a demo. Every name is fictional.

## v1 in two days

The patient can:

1. Open a welcome screen and start intake.
2. Enter first name, last name, date of birth, and phone.
3. Review what they entered and see which required fields are still empty.
4. Talk to the intake agent in the playground and have it write the same field ids into a demo draft.

Staff can ask the agent to fill the draft one field at a time. The agent never diagnoses.

## Out of scope

- Real patient records, EHR, or insurance eligibility
- Accounts, passwords, or SSO
- Payments
- Full social security numbers
- Clinical advice

## Field list

The agent schema in `intake-agent/bot/lib/intake.ts` is the source of truth. v1 UI ships **personal** fields plus review. Visit, insurance, and history stay in the schema so the next screen has a name waiting.

| id | Section | Required | v1 UI |
| --- | --- | --- | --- |
| firstName | personal | yes | yes |
| lastName | personal | yes | yes |
| dateOfBirth | personal | yes | yes |
| phone | personal | yes | yes |
| email | personal | no | yes |
| reason | visit | yes | later |
| preferredLanguage | visit | yes | later |
| payer | insurance | no | later |
| memberId | insurance | no | later |
| allergies | history | yes | later |
| medications | history | yes | later |

## Demo patient

Use **Maya Chen**, born `1988-04-12`, phone `+49 30 0000 0000`. Say the record is fictional on every screen that shows data.

## Success

- You can explain every file in this repo in one sitting.
- You can add one field by editing `INTAKE_FIELDS` and one form input.
- A keyboard-only user can finish the personal step.
- Contrast meets WCAG AA on text and buttons. See `ACCESSIBILITY_GUIDELINES.md`.
