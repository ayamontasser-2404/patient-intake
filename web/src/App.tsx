import { Navigate, Route, Routes, useNavigate } from "react-router"
import { useState } from "react"
import type { Answers, FieldId } from "./intake.ts"
import { PersonalInfo } from "./pages/PersonalInfo.tsx"
import { Review } from "./pages/Review.tsx"
import { Welcome } from "./pages/Welcome.tsx"

export function App() {
  const [answers, setAnswers] = useState<Answers>({})
  const navigate = useNavigate()

  function handleChange(id: FieldId, value: string) {
    setAnswers((current) => ({ ...current, [id]: value }))
  }

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route
        path="/personal"
        element={
          <PersonalInfo
            answers={answers}
            onChange={handleChange}
            onContinue={() => navigate("/review")}
          />
        }
      />
      <Route path="/review" element={<Review answers={answers} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
