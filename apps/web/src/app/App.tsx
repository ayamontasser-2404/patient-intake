export function App() {
  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="shell">
        <header className="site-header">
          <p className="eyebrow">Portfolio demo</p>
          <h1>Smart Patient Intake</h1>
        </header>
        <main id="main">
          <p className="lead">
            A demo workflow for structured patient intake and AI-assisted document review.
          </p>
          <aside className="notice" role="note">
            <p>
              <strong>Synthetic data only.</strong> This is a local demonstration. It is not a
              medical device, an electronic health record, or a production system. Do not enter real
              patient information.
            </p>
          </aside>
          <section className="status" aria-labelledby="status-heading">
            <h2 id="status-heading">Application status</h2>
            <p>
              This screen confirms that the web application starts. The intake form, document
              review, and staff dashboard are not available yet.
            </p>
          </section>
        </main>
        <footer className="site-footer">
          <p>Local demo · unauthenticated · synthetic data only</p>
        </footer>
      </div>
    </div>
  );
}
