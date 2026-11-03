# Figma workflow

This file is the rule for moving between Figma and code. The Figma file is [Patient Intake](https://www.figma.com/design/TNzpWrQxVTH5WF1FFR0N0x/Patient-Intake).

## File map

| Page | What belongs there |
| --- | --- |
| Foundations | Color, type, space, and the Button / Field / Progress components |
| Screens | One frame per route, named after the route |

Frame size for v1: **390 × 844** (mobile) and **1280 × 800** (desktop). Start with mobile. Desktop is the same column, max width 600px, centered.

## Variables

Name Figma variables like CSS tokens:

- `color/ink`
- `color/brand`
- `space/md`
- `radius/control`

Bind fills, gaps, and radius to variables. Do not type a hex on a screen frame after Foundations exists.

## Auto layout

- Every screen is a vertical auto-layout frame.
- Padding `space/md` (24).
- Gap `space/sm` (16) between fields, `space/md` between sections.
- Primary button is the last child, hug its height, fill the width on mobile.

## Components before screens

Build in this order:

1. Color and space variables
2. Text styles: display, title, body, label, hint, button
3. Button (primary, secondary)
4. Field (empty, filled, error)
5. Progress
6. Screen frames that only contain instances

If a screen needs a one-off shape, stop and add a component or a token first.

## From Figma to code

1. Select the frame in Figma.
2. Read `DESIGN_SYSTEM.md` and copy token names, not pixel guesses.
3. Implement the route in `web/src/pages`.
4. Use the same field `id` as `intake-agent/bot/lib/intake.ts`.
5. Check `ACCESSIBILITY_GUIDELINES.md` before you open a PR.

## From code to Figma

When you change a token in CSS, change this document and the Figma variable in the same hour. Do not let the file drift for the interview.

## What “done” means for a screen

- Named frame: `Personal / mobile`
- Uses Button and Field instances
- Shows the demo banner
- Has a focus example (one field with the brand ring)
- Has an error example on a hidden or second frame, `Personal / error`

## Do not

- Paste screenshots into Figma as the source of truth
- Draw a new blue that is almost `color.brand`
- Put real patient names on the canvas
