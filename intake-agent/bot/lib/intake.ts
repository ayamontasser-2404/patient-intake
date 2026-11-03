export type IntakeField = {
  id: string
  section: "personal" | "visit" | "insurance" | "history"
  label: string
  required: boolean
  hint: string
}

export type IntakeDraft = {
  visitId: string
  answers: Record<string, string>
  updatedAt: string
}

export const INTAKE_FIELDS: IntakeField[] = [
  {
    id: "firstName",
    section: "personal",
    label: "First name",
    required: true,
    hint: "Legal first name as on the clinic card.",
  },
  {
    id: "lastName",
    section: "personal",
    label: "Last name",
    required: true,
    hint: "Legal last name as on the clinic card.",
  },
  {
    id: "dateOfBirth",
    section: "personal",
    label: "Date of birth",
    required: true,
    hint: "ISO date, YYYY-MM-DD.",
  },
  {
    id: "phone",
    section: "personal",
    label: "Mobile phone",
    required: true,
    hint: "A number the clinic can use today.",
  },
  {
    id: "email",
    section: "personal",
    label: "Email",
    required: false,
    hint: "Optional. Used only for visit reminders.",
  },
  {
    id: "reason",
    section: "visit",
    label: "Reason for visit",
    required: true,
    hint: "Short phrase in the patient's words. Do not diagnose.",
  },
  {
    id: "preferredLanguage",
    section: "visit",
    label: "Preferred language",
    required: true,
    hint: "Language for spoken and written clinic messages.",
  },
  {
    id: "payer",
    section: "insurance",
    label: "Insurance payer",
    required: false,
    hint: "Leave empty for a self-pay or walk-in visit.",
  },
  {
    id: "memberId",
    section: "insurance",
    label: "Member id",
    required: false,
    hint: "Never store a full social security number.",
  },
  {
    id: "allergies",
    section: "history",
    label: "Allergies",
    required: true,
    hint: "Write 'none' when the patient reports no allergies.",
  },
  {
    id: "medications",
    section: "history",
    label: "Current medications",
    required: true,
    hint: "Write 'none' when the patient takes no medicines.",
  },
]

const FIELD_IDS = new Set(INTAKE_FIELDS.map((field) => field.id))

export function emptyDraft(visitId: string): IntakeDraft {
  return { visitId, answers: {}, updatedAt: new Date().toISOString() }
}

export function mergeDraft(
  draft: IntakeDraft,
  answers: Record<string, string>,
): IntakeDraft {
  const next = { ...draft.answers }
  for (const [id, value] of Object.entries(answers)) {
    if (!FIELD_IDS.has(id)) continue
    const trimmed = value.trim()
    if (trimmed.length === 0) {
      delete next[id]
    } else {
      next[id] = trimmed
    }
  }
  return {
    visitId: draft.visitId,
    answers: next,
    updatedAt: new Date().toISOString(),
  }
}

export function missingFields(draft: IntakeDraft): IntakeField[] {
  return INTAKE_FIELDS.filter((field) => {
    if (!field.required) return false
    return !draft.answers[field.id]
  })
}

export function draftSummary(draft: IntakeDraft) {
  return {
    visitId: draft.visitId,
    updatedAt: draft.updatedAt,
    answers: draft.answers,
    missing: missingFields(draft).map((field) => field.id),
    complete: missingFields(draft).length === 0,
  }
}

export function draftKey(sessionId: string, visitId: string): string {
  return `intake:${sessionId}:${visitId}`
}
