import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"
import { expect, test } from "vitest"
import { App } from "./App.tsx"

function renderApp(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

test("welcome starts intake", async () => {
  const user = userEvent.setup()
  renderApp("/")
  await user.click(screen.getByRole("link", { name: "Start intake" }))
  expect(
    screen.getByRole("heading", { name: "Personal information" }),
  ).toBeInTheDocument()
})

test("personal form shows missing names on continue", async () => {
  const user = userEvent.setup()
  renderApp("/personal")
  await user.click(screen.getByRole("button", { name: "Continue" }))
  expect(screen.getByText("First name is required.")).toBeInTheDocument()
})

test("filled personal details appear on review", async () => {
  const user = userEvent.setup()
  renderApp("/personal")
  await user.type(screen.getByLabelText(/First name/), "Maya")
  await user.type(screen.getByLabelText(/Last name/), "Chen")
  await user.type(screen.getByLabelText(/Date of birth/), "1988-04-12", {
    initialSelectionStart: 0,
    initialSelectionEnd: 10,
  })
  await user.type(screen.getByLabelText(/Mobile phone/), "+49 30 0000 0000")
  await user.click(screen.getByRole("button", { name: "Continue" }))
  expect(screen.getByRole("heading", { name: "Review" })).toBeInTheDocument()
  expect(screen.getByText("Maya")).toBeInTheDocument()
  expect(screen.getByText("Chen")).toBeInTheDocument()
})
