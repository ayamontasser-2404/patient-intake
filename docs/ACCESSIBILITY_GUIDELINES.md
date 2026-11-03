# Accessibility guidelines

Clinic intake is used by people who are unwell, anxious, or using a shared tablet in a waiting room (including an ETERNO Space). Accessibility is part of the product, not a polish pass.

v1 target: **WCAG 2.2 AA**.

## Keyboard

- Tab order follows the visual order: title, progress, fields, primary action.
- Every control has a visible focus ring (`color.brand`, 2px).
- Do not trap focus except in a future modal. v1 has no modal.
- Enter in a field does not submit until the required fields are valid.

## Labels and names

- Every input has a `<label>` bound with `htmlFor`.
- Placeholder text is an example, never the only label.
- Buttons say the action: “Continue”, “Back”, “Start intake”. Not “OK” or “Submit”.
- The page `<title>` matches the screen: “Personal information · Patient intake”.

## Contrast

- `color.ink` on `color.page` and `color.card` is the default body text.
- `color.muted` is only for hints, and it still needs 4.5:1. If a hint fails, use `color.ink`.
- White text on `color.brand` is for buttons only.
- Do not put `color.muted` on `color.chip`.

## Touch and motion

- Minimum hit area 44×44px.
- No information in hover alone.
- No auto-playing motion. Progress is a static list.

## Errors and status

- Validate on Continue, not on every keystroke.
- Errors are text, next to the field, in `color.danger`.
- Prefix the message with the field name: “Date of birth must use YYYY-MM-DD.”
- After a failed Continue, move focus to the first invalid field.

## Language and cognitive load

- One task per screen.
- Short sentences. No clinical jargon on the welcome screen.
- Mark the demo clearly: “Fictional demo. Do not enter a real patient’s data.”
- Required fields say “required” in the label, not only with an asterisk.

## Assistive tech checks before you stop

1. Keyboard-only pass of Welcome → Personal → Review.
2. Screen reader reads each label before the input.
3. Zoom 200%. No clipped primary button.
4. `prefers-reduced-motion`: nothing moves.

## What we will not ship

- Color-only validation
- Placeholder-only fields
- A timer that clears the form
- Captcha on v1
