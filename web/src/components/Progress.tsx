type ProgressProps = {
  step: 1 | 2
}

export function Progress({ step }: ProgressProps) {
  return (
    <div className="progress">
      <p className="hint">Step {step} of 2</p>
      <ol>
        <li data-state={step === 1 ? "current" : "done"}>
          <span className="visually-hidden">Personal information</span>
        </li>
        <li data-state={step === 2 ? "current" : "upcoming"}>
          <span className="visually-hidden">Review</span>
        </li>
      </ol>
    </div>
  )
}
