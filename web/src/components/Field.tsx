type FieldProps = {
  id: string
  label: string
  hint: string
  required: boolean
  type: "text" | "date" | "tel" | "email"
  value: string
  error?: string
  onChange: (value: string) => void
}

export function Field({
  id,
  label,
  hint,
  required,
  type,
  value,
  error,
  onChange,
}: FieldProps) {
  const hintId = `${id}-hint`
  const errorId = `${id}-error`

  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required ? " (required)" : " (optional)"}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${hintId} ${errorId}` : hintId}
        onChange={(event) => onChange(event.target.value)}
      />
      <p id={hintId} className="hint">
        {hint}
      </p>
      {error ? (
        <p id={errorId} className="error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
