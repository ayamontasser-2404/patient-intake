# Design system

Tokens first. Components second. Screens last. If a color is not in this file, do not put it on the canvas.

These values match the `doctor-search` theme so the two healthcare demos feel like one product.

## Color

| Token | Hex | Use |
| --- | --- | --- |
| `color.ink` | `#061c39` | Body text, headings |
| `color.muted` | `#6d809a` | Hints, captions |
| `color.brand` | `#0860b5` | Primary button, progress current step |
| `color.brand-hover` | `#064e94` | Primary button hover and focus fill |
| `color.navy` | `#173657` | Header bar |
| `color.chip` | `#ebf3fc` | Selected chip, progress track |
| `color.chip-text` | `#204e83` | Text on `chip` |
| `color.page` | `#fcfdfe` | Page background |
| `color.line` | `#e7edf2` | Dividers |
| `color.stroke` | `#e8eff5` | Input border |
| `color.card` | `#ffffff` | Cards, inputs |
| `color.danger` | `#b42318` | Errors only |

Do not use red for decoration. Do not use color as the only error signal. Pair it with text.

## Type

| Style | Size | Weight | Line height | Use |
| --- | --- | --- | --- | --- |
| `display` | 44px / 2.75rem | 700 | 1.15 | Welcome title |
| `title` | 28px / 1.75rem | 700 | 2.125rem | Screen title |
| `body` | 16px / 1rem | 400 | 1.5 | Paragraphs, input text |
| `label` | 14px / 0.875rem | 600 | 1.2 | Visible field labels |
| `hint` | 14px / 0.875rem | 400 | 1.4 | Help under a field |
| `button` | 16px / 1rem | 600 | 1 | Button labels |

Font family: **Inter**, then Helvetica, then Arial. Letter-spacing on labels: `0.08em`.

## Space

Use 8px as the base. Allowed numbers: 8, 16, 24, 32, 40, 48.

| Token | px |
| --- | --- |
| `space.xs` | 8 |
| `space.sm` | 16 |
| `space.md` | 24 |
| `space.lg` | 32 |
| `space.xl` | 40 |
| `space.2xl` | 48 |

Page max width: 600px. Side padding: 24px.

## Radius and control size

| Token | Value |
| --- | --- |
| `radius.control` | 15px |
| `radius.card` | 26px |
| `radius.button` | 15px |
| `size.control` | 56px min height |
| `size.touch` | 44px min for any tap target |

## Components

### Button

- Primary: `color.brand` fill, white text, min height 56px.
- Secondary: white fill, `color.stroke` border, `color.ink` text.
- One primary action per screen, on the right on wide viewports, full width on small ones.
- Disabled: 40% opacity, `aria-disabled="true"`, still focusable if it explains what is missing.

### Text field

- Label above the input, never placeholder-only.
- Border `color.stroke`, fill `color.card`, radius `radius.control`.
- Focus: 2px `color.brand` ring, offset 2px.
- Error: border `color.danger` plus a text message with `role="alert"`.

### Progress

- Three steps in v1: Welcome (not counted), Personal, Review.
- Current step uses `color.brand`. Completed uses `color.chip-text`. Upcoming uses `color.muted`.
- Include visible text: “Step 1 of 2”.

## Dark mode

v1 is light only. Do not invent a dark palette under time pressure. Contrast on this light page already meets AA.

## How to add a token

1. Add a row here.
2. Add the CSS variable in `web/src/index.css`.
3. Add the Figma variable with the same name.
4. Then use it. Never the other way around.
