import { Link } from "react-router"

export function Welcome() {
  return (
    <main className="page">
      <p className="banner">Fictional demo. Do not enter a real patient’s data.</p>
      <h1 className="display">Patient intake</h1>
      <p className="body">
        Tell the clinic who you are before the visit. This first version asks
        only for your name, date of birth, and phone. You can stop after review.
      </p>
      <div className="actions">
        <Link className="button button-primary" to="/personal">
          Start intake
        </Link>
      </div>
    </main>
  )
}
