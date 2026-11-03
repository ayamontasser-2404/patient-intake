import "./App.css";

export function App() {
  return (
    <div className="page">
      <header className="notice">
        <p>Demo only. Synthetic data. Not for real patients.</p>
      </header>
      <main className="content">
        <p className="eyebrow">Interview portfolio MVP</p>
        <h1>Smart Patient Intake</h1>
        <p className="lede">A demo workflow for structured patient intake and AI-assisted document review.</p>
        <p>
          This local demonstration uses fictional information only. It is not a medical device, electronic health
          record, or production system.
        </p>
      </main>
      <footer>
        <p>Patient intake and staff review are not available on this screen yet.</p>
      </footer>
    </div>
  );
}
