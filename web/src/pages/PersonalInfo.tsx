import { useState, type FormEvent } from "react"
import { Field } from "../components/Field.tsx"
import { Progress } from "../components/Progress.tsx"
import {
  missingPersonal,
  PERSONAL_FIELDS,
  type Answers,
  type FieldId,
} from "../intake.ts"

type PersonalInfoProps = {
  answers: Answers
  onChange: (id: FieldId, value: string) => void
  onContinue: () => void
}

export function PersonalInfo({
  answers,
  onChange,
  onContinue,
}: PersonalInfoProps) {
  const [errors, setErrors] = useState<Partial<Record<FieldId, string>>>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const missing = missingPersonal(answers)
    if (missing.length > 0) {
      const next: Partial<Record<FieldId, string>> = {}
      for (const id of missing) {
        const field = PERSONAL_FIELDS.find((item) => item.id === id)
        next[id] = `${field?.label ?? id} is required.`
      }
      setErrors(next)
      document.getElementById(missing[0])?.focus()
      return
    }
    setErrors({})
    onContinue()
  }

  return (
    <main className="page">
      <p className="banner">Fictional demo. Do not enter a real patient’s data.</p>
      <Progress step={1} />
      <h1 className="title">Personal information</h1>
      <form onSubmit={handleSubmit} noValidate>
        {PERSONAL_FIELDS.map((field) => (
          <Field
            key={field.id}
            id={field.id}
            label={field.label}
            hint={field.hint}
            required={field.required}
            type={field.type}
            value={answers[field.id] ?? ""}
            error={errors[field.id]}
            onChange={(value) => onChange(field.id, value)}
          />
        ))}
        <div className="actions">
          <button className="button button-primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </main>
  )
}
