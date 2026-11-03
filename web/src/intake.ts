export type FieldId =
  | "firstName"
  | "lastName"
  | "dateOfBirth"
  | "phone"
  | "email"

export type Answers = Partial<Record<FieldId, string>>

export const PERSONAL_FIELDS: {
  id: FieldId
  label: string
  required: boolean
  type: "text" | "date" | "tel" | "email"
  hint: string
}[] = [
  {
    id: "firstName",
    label: "First name",
    required: true,
    type: "text",
    hint: "Legal first name as on the clinic card.",
  },
  {
    id: "lastName",
    label: "Last name",
    required: true,
    type: "text",
    hint: "Legal last name as on the clinic card.",
  },
  {
    id: "dateOfBirth",
    label: "Date of birth",
    required: true,
    type: "date",
    hint: "Use the date picker. Format is YYYY-MM-DD.",
  },
  {
    id: "phone",
    label: "Mobile phone",
    required: true,
    type: "tel",
    hint: "A number the clinic can use today.",
  },
  {
    id: "email",
    label: "Email",
    required: false,
    type: "email",
    hint: "Optional. Used only for visit reminders.",
  },
]

export function missingPersonal(answers: Answers): FieldId[] {
  return PERSONAL_FIELDS.filter(
    (field) => field.required && !answers[field.id]?.trim(),
  ).map((field) => field.id)
}
