import { Link } from "react-router"
import { Progress } from "../components/Progress.tsx"
import { missingPersonal, PERSONAL_FIELDS, type Answers } from "../intake.ts"

type ReviewProps = {
  answers: Answers
}

export function Review({ answers }: ReviewProps) {
  const missing = missingPersonal(answers)

  return (
    <main className="page">
      <p className="banner">Fictional demo. Do not enter a real patient’s data.</p>
      <Progress step={2} />
      <h1 className="title">Review</h1>
      <p className="body">
        Check the answers before the clinic uses them. Nothing is sent to a
        server in this demo.
      </p>
      <dl className="review-list">
        {PERSONAL_FIELDS.map((field) => (
          <div key={field.id}>
            <dt>{field.label}</dt>
            <dd>{answers[field.id]?.trim() || "Not entered"}</dd>
          </div>
        ))}
      </dl>
      {missing.length > 0 ? (
        <p className="error" role="alert">
          Missing required fields: {missing.join(", ")}.
        </p>
      ) : (
        <p className="body">All required personal fields are filled.</p>
      )}
      <div className="actions">
        <Link className="button button-secondary" to="/personal">
          Back
        </Link>
        <Link className="button button-primary" to="/">
          Finish demo
        </Link>
      </div>
    </main>
  )
}
